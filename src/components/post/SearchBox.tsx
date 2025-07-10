"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

export default function SearchBox() {
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
    }, 500)

    return () => clearTimeout(timer)
  }, [search])

  useEffect(() => {
    if (debouncedSearch) {
      router.push(`/?query=${encodeURIComponent(debouncedSearch.trim())}`)
    } else {
      router.push("/")
    }
  }, [debouncedSearch, router])

  return (
    <>
      <Input
        placeholder="Search"
        className="w-[200px] lg:w-[300px]"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </>
  )
}
