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
    
    // Clear existing records as requested
    await this.prisma.homily.deleteMany({});
    this.logger.log('Database cleared.');

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
        const fullContent = await fs.readFile(path.join(homiliesDir, file), 'utf-8');
        
        // Split metadata and homily sections
        const sections = fullContent.split('# homily');
        if (sections.length < 2) {
          throw new Error(`Invalid format in ${file}. Missing "# homily" section.`);
        }
        
        const metadataSection = sections[0];
        const content = sections.slice(1).join('# homily').trim();
        
        // Parse metadata using regex
        const metadata: Record<string, string> = {};
        const metadataLines = metadataSection.split('\n');
        for (const line of metadataLines) {
          const match = line.match(/-\s*\*\*(.*?)\*\*:\s*(.*)/);
          if (match) {
            metadata[match[1]] = match[2].trim();
          }
        }

        const title = metadata['title'] || file.replace('.md', '');
        const liturgicalYear = metadata['liturgicalYear'] || null;
        const liturgicalSeason = metadata['liturgicalSeason'] || null;
        const videoLink = metadata['videoLink'] || null;
        
        // Bible passage extraction (optional/blank as requested)
        const biblePassage = null;
        
        // Slug from title
        const slug = slugify(title, { lower: true, strict: true }) + '-' + file.replace('.md', '');

        await this.prisma.homily.create({
          data: {
            title,
            liturgicalYear,
            liturgicalSeason,
            biblePassage,
            videoLink,
            content,
            slug,
            originalFile: file,
            datePublished: null,
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
