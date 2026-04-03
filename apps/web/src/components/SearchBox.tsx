'use client';

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect, useTransition } from "react"

export function SearchBox() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [year, setYear] = useState(searchParams.get('y') || '')
  const [, startTransition] = useTransition()

  useEffect(() => {
    const delay = setTimeout(() => {
      startTransition(() => {
        const params = new URLSearchParams()
        if (query) params.set('q', query)
        if (year) params.set('y', year)
        
        const queryString = params.toString()
        router.push(queryString ? `/?${queryString}` : '/')
      })
    }, 500)

    return () => clearTimeout(delay)
  }, [query, year, router])

  return (
    <div className="w-full mb-12 flex flex-col md:flex-row gap-4 items-stretch">
      <div className="relative flex-grow">
        <Input 
          type="search" 
          placeholder="Search titles..." 
          className="pl-12 h-14 text-lg font-bold border-4"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Search className="absolute left-4 top-4 h-6 w-6 text-black" strokeWidth={3} />
      </div>
      
      <div className="relative">
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="h-14 px-6 text-lg font-black bg-white border-4 border-black appearance-none cursor-pointer hover:bg-secondary transition-colors focus:outline-none min-w-[140px] uppercase tracking-tighter"
        >
          <option value="">ALL YEARS</option>
          <option value="A">Year A</option>
          <option value="B">Year B</option>
          <option value="C">Year C</option>
          <option value="ABC">Special (ABC)</option>
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </div>
    </div>
  )
}
