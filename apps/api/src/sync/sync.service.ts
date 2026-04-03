import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as fs from 'fs/promises';
import * as path from 'path';
import slugify from 'slugify';

@Injectable()
export class SyncService {
  private readonly logger = new Logger(SyncService.name);

  constructor(private prisma: PrismaService) {}

  async syncHomilies() {
    this.logger.log('Starting homilies synchronization...');
    
    // Path: newcreation/apps/api/../../homilies -> newcreation/homilies
    const homiliesDir = path.resolve(__dirname, '../../../..', 'content', 'homilies');
    
    try {
      await fs.access(homiliesDir);
    } catch {
      this.logger.error(`Homilies directory not found at ${homiliesDir}`);
      return;
    }

    const files = await fs.readdir(homiliesDir);
    let successCount = 0;
    let failCount = 0;

    for (const file of files) {
      if (!file.endsWith('.md')) continue;

      try {
        // Expected filename pattern: "Date - Title - Year.md"
        // The bible passage will be merged inside the title by the user.
        // The Year is mapped to liturgicalYear (A, B, C, ABC)
        
        // Expected filename pattern: "YYYY-MM-DD - Title - Year.md"
        
        // Remove .md extension
        const nameWithoutExt = file.slice(0, -3);
        // Use " - " as separator as requested
        const parts = nameWithoutExt.split(' - ').map(p => p.trim());
        
        if (parts.length < 3) {
          throw new Error(`Filename format mismatch. Expected "Date - Title - Year.md" (space-separated), got "${file}"`);
        }
        
        const dateStr = parts[0]; // "YYYY-MM-DD"
        const yearStr = parts.pop()!; // "Year" (Last part)
        let titleStr = parts.slice(1).join(' - '); // "Title" (Everything in between)
        
        // Extract Bible Passage for structured field (match with spaces first)
        const bibleRegex = /\b(Genesis|Exodus|Leviticus|Numbers|Deuteronomy|Joshua|Judges|Ruth|1\s?Samuel|2\s?Samuel|1\s?Kings|2\s?Kings|1\s?Chronicles|2\s?Chronicles|Ezra|Nehemiah|Esther|Job|Psalms|Proverbs|Ecclesiastes|Song\s?of\s?Solomon|Isaiah|Jeremiah|Lamentations|Ezekiel|Daniel|Hosea|Joel|Amos|Obadiah|Jonah|Micah|Nahum|Habakkuk|Zephaniah|Haggai|Zechariah|Malachi|Matthew|Mark|Luke|John|Acts|Romans|1\s?Corinthians|2\s?Corinthians|Galatians|Ephesians|Philippians|Colossians|1\s?Thessalonians|2\s?Thessalonians|1\s?Timothy|2\s?Timothy|Titus|Philemon|Hebrews|James|1\s?Peter|2\s?Peter|1\s?John|2\s?John|3\s?John|Jude|Revelation)\s+(\d+)\s+(\d+(?:-\d+)?)\b/gi;
        const passageMatch = titleStr.match(bibleRegex);
        
        // Format Bible passages in title: "Matthew 24 37-44" -> "Matthew 24:37-44"
        titleStr = titleStr.replace(bibleRegex, '$1 $2:$3');
        
        // Use the first match as the structured field, but ensure it uses the colon format
        const biblePassage = passageMatch ? passageMatch[0].replace(/\s+(\d+(?:-\d+)?)$/, ':$1') : null;

        // Extract and map Liturgical Season
        const seasons = [
          'Advent', 'Lent', 'Easter', 'Ordinary Time', 'OT', 'Pentecost', 'Christmas', 
          'Ascension', 'Trinity', 'Corpus Christi', 'Epiphany', 'Annunciation', 
          'Presentation', 'Mary', 'Holy Family', 'Holy Saturday', 'Palm Sunday', 
          'Maundy Thursday', 'Good Friday'
        ];
        
        let liturgicalSeason = null;
        for (const s of seasons) {
           const regex = new RegExp(`\\b${s}\\b`, 'i');
           if (regex.test(titleStr)) {
             liturgicalSeason = s === 'OT' ? 'Ordinary Time' : s;
             break;
           }
        }

        // Parse the date directly from ISO format
        const datePublished = new Date(dateStr);
        
        if (isNaN(datePublished.getTime())) {
          throw new Error(`Invalid date format in filename: ${dateStr}`);
        }

        const content = await fs.readFile(path.join(homiliesDir, file), 'utf-8');
        
        // Slug from formatted title + date to ensure uniqueness
        const slug = slugify(titleStr, { lower: true, strict: true }) + '-' + dateStr;

        await this.prisma.homily.upsert({
          where: { originalFile: file },
          update: {
            title: titleStr,
            datePublished,
            liturgicalYear: yearStr,
            liturgicalSeason,
            biblePassage,
            content,
            slug,
          },
          create: {
            title: titleStr,
            datePublished,
            liturgicalYear: yearStr,
            liturgicalSeason,
            biblePassage,
            content,
            slug,
            originalFile: file,
          },
        });
        
        successCount++;
      } catch (error) {
        if (error instanceof Error) {
           this.logger.warn(`Failed to process ${file}: ${error.message}`);
        }
        failCount++;
      }
    }

    this.logger.log(`Synchronization complete. Processed ${successCount} files successfully, ${failCount} failures.`);
  }
}
