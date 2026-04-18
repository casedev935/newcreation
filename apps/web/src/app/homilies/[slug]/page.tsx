import { fetchHomily, Homily } from "@/lib/api"
import { Breadcrumb } from "@/components/Breadcrumb"
import { cn, getYearColor, getSeasonColor, getPassageColor } from "@/lib/utils"
import { notFound } from "next/navigation"
import { format } from "date-fns"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Youtube } from "lucide-react"

export const dynamic = 'force-dynamic';

export default async function HomilyPage({ params }: { params: { slug: string } }) {
  let homily: Homily;
  try {
    homily = await fetchHomily(params.slug);
  } catch {
    return notFound();
  }

  return (
    <main className="min-h-screen container max-w-4xl py-12">
      <Breadcrumb title={homily.title} />
      
      <article className="border-4 border-black bg-white shadow-brutal p-8 md:p-12">
        <header className="mb-10 pb-6 border-b-4 border-black text-center">
            <div className="flex flex-wrap gap-4 justify-center mb-10">
              <span className={cn(
                "inline-block text-white font-black uppercase tracking-widest px-4 py-1 border-2 border-black transform -rotate-1 shadow-brutal-sm",
                getYearColor(homily.liturgicalYear)
              )}>
                Year {homily.liturgicalYear || "GENERAL"}
              </span>
              {homily.liturgicalSeason && (
                <span className={cn(
                  "inline-block text-white font-black uppercase tracking-widest px-4 py-1 border-2 border-black transform rotate-1 shadow-brutal-sm",
                  getSeasonColor(homily.liturgicalSeason)
                )}>
                  {homily.liturgicalSeason}
                </span>
              )}
              {homily.biblePassage && (
                <span className={cn(
                  "inline-block text-white font-black uppercase tracking-widest px-4 py-1 border-2 border-black transform -rotate-1 shadow-brutal-sm",
                  getPassageColor(homily.biblePassage)
                )}>
                  {homily.biblePassage}
                </span>
              )}
              {homily.videoLink && (
                <a
                  href={homily.videoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white font-black uppercase tracking-widest px-4 py-1 border-2 border-black transform rotate-1 shadow-brutal-sm bg-[#FF0000] hover:scale-105 transition-transform"
                >
                  <Youtube size={18} fill="currentColor" />
                  Watch on YouTube
                </a>
              )}
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-black leading-tight mb-6">
              {homily.biblePassage 
                ? homily.title.replace(new RegExp(`\\s*${homily.biblePassage.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}\\s*`, 'gi'), '').trim()
                : homily.title}
            </h1>
           <time className="text-lg font-bold text-muted-foreground uppercase tracking-widest">
             {format(new Date(homily.datePublished), "MMMM do, yyyy")}
           </time>
        </header>

        <section className="prose prose-lg max-w-none prose-headings:font-display prose-headings:font-black prose-p:font-medium">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              pre: ({ ...props }) => (
                <pre className="whitespace-pre-wrap break-words border-4 border-black p-6 bg-[#F3F4F6] font-mono text-black text-base leading-relaxed my-8 shadow-brutal-sm [&>code]:bg-transparent [&>code]:p-0 [&>code]:border-0 [&>code]:text-black [&>code]:shadow-none" {...props} />
              ),
              code: ({ children, ...props }) => {
                return (
                  <code className="font-mono font-bold bg-[#E5E7EB] px-1.5 py-0.5 border-2 border-black text-black" {...props}>
                    {children}
                  </code>
                );
              }
            }}
          >
            {homily.content || ""}
          </ReactMarkdown>
        </section>
      </article>
    </main>
  );
}
