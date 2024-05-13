'use client'

// import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command'

export default function Home() {
  const [input, setInput] = useState<string>('')
  const [searchResults, setSearchResults] = useState<{
    results: string[]
    duration: number
  }>()

  useEffect(() => {
    const fetchData = async () => {
      if (!input) return setSearchResults(undefined)

      const res = await fetch(`/api/search?q=${input.toUpperCase()}`)
      const data = (await res.json()) as { results: string[]; duration: number }
      setSearchResults(data)
    }
    fetchData()
  }, [input])

  return (
    <main className="h-screen w-screen grainy">
      <div className="flex flex-col justify-center items-center gap-6 pt-32 duration-500 animate-in fade-in-5 slide-in-from-bottom-2.5">
        <h1 className="text-5xl tracking-tight font-bold">CountrySearch⚡</h1>
        <p className="text-zinc-600 text-lg max-w-prose text-center">
          A high-performance API built with Hono, Next.js and Cloudfare Workers.
          <br /> Type a query below and get your results in miliseconds.
        </p>
        <div className="max-w-md w-full">
          <Command>
            <CommandInput
              value={input}
              onValueChange={setInput}
              placeholder="Search countries..."
              className="placeholder:text-zinc-500"
            />
            <CommandList>
              {searchResults?.results.length === 0 ? (
                <CommandEmpty className="text-zinc-500 text-xs">
                  No results found.
                </CommandEmpty>
              ) : null}
              {searchResults?.results ? (
                <CommandGroup heading="Results">
                  {searchResults?.results.map((res) => (
                    <CommandItem
                      key={res}
                      onSelect={(e) => setInput(e)}
                      value={res}
                      className="text-black"
                    >
                      {res}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ) : null}
              {searchResults?.results ? (
                <>
                  <div className="h-px w-full bg-zinc-200"></div>
                  <p className="p-2 text-xs text-zinc-500">
                    Found {searchResults?.results.length} result(s) in{' '}
                    {searchResults?.duration.toFixed(0)}ms.
                  </p>
                </>
              ) : null}
            </CommandList>
          </Command>
        </div>
      </div>
    </main>
  )
}
