import { fetchHomilies, Homily } from "@/lib/api"
import { SearchBox } from "@/components/SearchBox"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { cn, getYearColor, getSeasonColor, getPassageColor } from "@/lib/utils"
import { format } from "date-fns"
import Link from "next/link"

export const dynamic = 'force-dynamic';

export default async function Home({
  searchParams,
}: {
  searchParams: { q?: string; p?: string; y?: string }
}) {
  const query = searchParams.q || "";
  const page = searchParams.p ? parseInt(searchParams.p, 10) : 1;
  const year = searchParams.y || "";

  let homilies: Homily[] = [];
  try {
    const response = await fetchHomilies(query, page, year);
    homilies = response.data;
  } catch {
    console.error("Failed to fetch API");
  }

  return (
    <main className="min-h-screen container max-w-4xl py-12">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-display font-black uppercase tracking-tighter mb-4 inline-block border-b-8 border-black pb-2">
          NewCreation
        </h1>
        <p className="text-xl font-bold uppercase tracking-widest text-primary">
          James Alison&apos;s Homilies
        </p>
      </header>

      <SearchBox />

      <section className="space-y-6">
        {homilies.length === 0 ? (
          <div className="border-4 border-black border-dashed p-12 text-center bg-secondary">
            <h2 className="text-3xl font-display font-black mb-2">Nothing found</h2>
            <p className="font-bold text-muted-foreground">Try adjusting your search criteria.</p>
          </div>
        ) : (
          homilies.map((homily) => (
            <Link key={homily.id} href={`/homilies/${homily.slug}`} className="block group">
              <Card className="hover:-translate-y-2 hover:-translate-x-2 transition-transform duration-200 group-hover:shadow-brutal-lg border-4">
                <CardHeader>
                  <div className="flex flex-wrap gap-2 justify-between items-start mb-4">
                    <div className="flex flex-wrap gap-2">
                      <span className={cn(
                        "text-white px-3 py-1 font-black text-xs uppercase tracking-widest border-2 border-black",
                        getYearColor(homily.liturgicalYear)
                      )}>
                        {homily.liturgicalYear || "GENERAL"}
                      </span>
                      {homily.liturgicalSeason && (
                        <span className={cn(
                          "text-white px-3 py-1 font-black text-xs uppercase tracking-widest border-2 border-black",
                          getSeasonColor(homily.liturgicalSeason)
                        )}>
                          {homily.liturgicalSeason}
                        </span>
                      )}
                      {homily.biblePassage && (
                        <span className={cn(
                          "text-white px-3 py-1 font-black text-xs uppercase tracking-widest border-2 border-black",
                          getPassageColor(homily.biblePassage)
                        )}>
                          {homily.biblePassage}
                        </span>
                      )}
                    </div>
                    <span className="font-bold text-sm uppercase tracking-tight text-muted-foreground">
                      Published at {format(new Date(homily.datePublished), "MMM dd, yyyy")}
                    </span>
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors text-3xl font-display font-black leading-tight">
                    {homily.biblePassage 
                      ? homily.title.replace(new RegExp(`\\s*${homily.biblePassage.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}\\s*`, 'gi'), '').trim()
                      : homily.title}
                  </CardTitle>
                </CardHeader>
              </Card>
            </Link>
          ))
        )}
      </section>
    </main>
  );
}
