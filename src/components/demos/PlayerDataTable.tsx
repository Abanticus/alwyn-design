import { Fragment, useEffect, useRef, useState } from "react"
import { Check, ChevronDown, ChevronRight, ChevronUp, Copy } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const PROVIDERS = [
  { id: "av",  label: "Aston Villa",     color: "#660033" },
  { id: "dv",  label: "DVMS",            color: "#eab308" },
  { id: "fb",  label: "Firstbeat",       color: "#ef4444" },
  { id: "sb",  label: "Statsbomb",       color: "#6366f1" },
  { id: "tm",  label: "Transfermarkt",   color: "#3b82f6" },
  { id: "sd",  label: "Soccerdonna",     color: "#ec4899" },
  { id: "sc",  label: "SkillCorner",     color: "#22c55e" },
  { id: "ss",  label: "Second Spectrum", color: "#14b8a6" },
  { id: "sp",  label: "Stats Perform",   color: "#a855f7" },
  { id: "of",  label: "OpenField",       color: "#f97316" },
]

type Player = {
  id: string
  name: string
  dob: string
  age: number
  position: string
  flag: string
  nationality: string
  providers: string[]
  unlinked?: string[]
}

const PLAYERS: Player[] = [
  { id: "2f9a6d84-b137-5c8e-d492-1a7e3f6b9c25", name: "Emiliano Martínez", dob: "02/09/1992", age: 32, position: "Goalkeeper",        flag: "ar",     nationality: "Argentina",  providers: ["av","dv","fb","sb","tm","sc","ss","sp","of"] },
  { id: "a3c81e52-f204-4b77-9d38-62a0e5f1d847", name: "Ollie Watkins",      dob: "30/12/1995", age: 29, position: "Centre Forward",    flag: "gb-eng", nationality: "England",    providers: ["av","dv","fb","sb","tm","sd","sc","ss","sp","of"] },
  { id: "7b4d29c3-e516-48a1-bc90-3f8a7d2e6054", name: "John McGinn",        dob: "18/10/1994", age: 30, position: "Central Midfield",  flag: "gb-sct", nationality: "Scotland",   providers: ["av","dv","fb","sb","tm","sc","sp"] },
  { id: "d9f73b16-2a85-4c3e-8710-9e4b6c1a5f32", name: "Ezri Konsa",         dob: "23/10/1997", age: 27, position: "Centre Back",       flag: "gb-eng", nationality: "England",    providers: ["av","dv","fb","sb","tm","sc","ss","sp","of"] },
  { id: "e7c920b4-3f61-4d85-a293-6b4d1e7f5c38", name: "Pau Torres",         dob: "16/01/1997", age: 28, position: "Centre Back",       flag: "es",     nationality: "Spain",      providers: ["av","dv","sb","tm","sd","sp","of"] },
  { id: "b2d84c61-9e37-4f52-a180-5c7b3d9e2f04", name: "Kadan Young",         dob: "14/03/2007", age: 18, position: "Right Back",        flag: "gb-eng", nationality: "England",    providers: ["av"] },
  { id: "c1b47e83-6920-4d58-b374-2f5a9c0e7d31", name: "Boubacar Kamara",    dob: "23/11/1999", age: 25, position: "Defensive Midfield",flag: "fr",     nationality: "France",     providers: ["av","dv","sb","tm","sc","sp"] },
  { id: "4d9e2a57-b803-4c71-f295-8e1b7d3a6f42", name: "Amadou Onana",       dob: "16/08/2001", age: 23, position: "Defensive Midfield",flag: "be",     nationality: "Belgium",    providers: ["av","dv","fb","sb","tm","sc","sp","of"] },
  { id: "9a3f6c82-e147-4d20-b093-5c8b1e4d7f36", name: "Youri Tielemans",    dob: "07/05/1997", age: 28, position: "Central Midfield",  flag: "be",     nationality: "Belgium",    providers: ["av","dv","sb","tm","sc","ss","sp"] },
  { id: "f3a17c90-2d84-4e61-b539-7c1d5e8a2f04", name: "Lamare Bogarde",     dob: "05/01/2002", age: 23, position: "Centre Back",       flag: "nl",     nationality: "Netherlands",providers: ["tm"] },
  { id: "a9e4c7b2-1f35-4d92-8e60-3b7f2a5d1c84", name: "Lamare Bogarde",     dob: "05/01/2002", age: 23, position: "Centre Back",       flag: "nl",     nationality: "Netherlands",providers: ["sp"] },
]

// Each dot: w-3 (12px) + gap-1 (4px) between + p-3 (12px) cell padding each side
const MAX_PROVIDER_DOTS = Math.max(...PLAYERS.map((p) =>
  p.providers.includes("av")
    ? PROVIDERS.filter((pr) => pr.id !== "av" && p.providers.includes(pr.id)).length + (p.unlinked?.length ?? 0)
    : 0
))
const PROVIDER_COL_MIN = MAX_PROVIDER_DOTS > 0 ? MAX_PROVIDER_DOTS * 16 + 20 : 80

function stripAccents(s: string) {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "")
}

function getProviderName(name: string, providerId: string): string {
  const parts = name.trim().split(" ")
  const first = parts[0]
  const last = parts[parts.length - 1]
  const initial = first[0]
  switch (providerId) {
    case "tm": return `${stripAccents(last)}, ${stripAccents(first)}`
    case "fb": return `${initial}. ${stripAccents(last)}`
    case "sc": return `${initial}. ${last}`
    case "sp": return `${initial}. ${last}`
    case "ss": return stripAccents(name)
    case "of": return stripAccents(name)
    case "dv": return stripAccents(name)
    default:   return name
  }
}

function getSourceId(playerId: string, providerId: string): string {
  const hex = playerId.replace(/-/g, "")
  const offset = (PROVIDERS.findIndex((p) => p.id === providerId) * 6) % 24
  const num = parseInt(hex.slice(offset, offset + 8), 16)
  switch (providerId) {
    case "av": return playerId.split("-")[0]
    case "sp": return `sr:player:${(num % 9000000) + 1000000}`
    case "sc": return `sc-${(num % 900000) + 100000}`
    case "ss": return `ss-${(num % 90000) + 10000}`
    default:   return String((num % 9000000) + 1000000)
  }
}

function NestedRow({ player, pid, copiedId, copyValue }: {
  player: Player
  pid: string
  copiedId: string | null
  copyValue: (key: string, value: string, e: React.MouseEvent) => void
}) {
  const [hovered, setHovered] = useState(false)
  const provider = PROVIDERS.find((p) => p.id === pid)!
  const sourceId = getSourceId(player.id, pid)
  const key = `${player.id}-${pid}`
  const copied = copiedId === key
  const showCopy = hovered && !copied

  return (
    <TableRow className="border-0 bg-muted/20 hover:bg-muted/20">
      <TableCell />
      <TableCell />
      <TableCell>
        <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
          <button
            onClick={(e) => copyValue(key, sourceId, e)}
            className="group/sid flex min-w-0 w-full items-center gap-1.5 text-left"
          >
            <span className="relative inline-flex h-3 w-3 shrink-0 items-center justify-center">
              <span className={`absolute inset-0 flex items-center justify-center transition-opacity ${copied || showCopy ? "opacity-0" : ""}`}>
                <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: provider.color }} />
              </span>
              <Copy className={`absolute inset-0 m-auto size-3 text-muted-foreground transition-opacity ${copied ? "opacity-0" : "opacity-0 group-hover/sid:opacity-100"}`} />
              <Check className={`absolute inset-0 m-auto size-3 text-green-500 transition-opacity ${copied ? "opacity-100" : "opacity-0"}`} />
            </span>
            <span className="truncate font-mono text-xs text-muted-foreground/60 group-hover/sid:text-foreground transition-colors">{sourceId}</span>
          </button>
        </div>
      </TableCell>
      <TableCell>
        <span className="truncate font-mono text-xs text-muted-foreground">{provider.label}</span>
      </TableCell>
      <TableCell>
        <span className="block truncate font-mono text-xs text-muted-foreground">{getProviderName(player.name, pid)}</span>
      </TableCell>
      <TableCell className="font-mono text-xs text-muted-foreground"><span className="block truncate">{player.dob}</span></TableCell>
      <TableCell className="font-mono tabular-nums text-right text-xs text-muted-foreground pr-5">{player.age}</TableCell>
      <TableCell className="font-mono text-xs text-muted-foreground">
        <span className="block truncate">{player.position}</span>
      </TableCell>
      <TableCell>
        <span className="flex min-w-0 items-center gap-1.5 font-mono text-xs text-muted-foreground">
          <span className={`fi fi-${player.flag} shrink-0 text-sm`} />
          <span className="truncate">{player.nationality}</span>
        </span>
      </TableCell>
    </TableRow>
  )
}

function ProviderDot({ color }: { color?: string }) {
  return (
    <span
      className="inline-block h-2 w-2 rounded-full bg-border"
      style={color ? { backgroundColor: color } : undefined}
    />
  )
}

function UnlinkedRow({ pid }: { pid: string }) {
  const provider = PROVIDERS.find((p) => p.id === pid)!
  return (
    <TableRow className="border-0 bg-muted/10 hover:bg-muted/10">
      <TableCell /><TableCell />
      <TableCell>
        <div className="flex min-w-0 items-center gap-1.5">
          <span className="inline-flex h-3 w-3 shrink-0 items-center justify-center">
            <ProviderDot color={provider.color} />
          </span>
          <span className="font-mono text-xs text-muted-foreground/40">—</span>
        </div>
      </TableCell>
      <TableCell>
        <span className="truncate font-mono text-xs text-muted-foreground/40">{provider.label}</span>
      </TableCell>
      <TableCell /><TableCell /><TableCell /><TableCell /><TableCell />
    </TableRow>
  )
}

function ProviderOnlyRow({ player, pid }: { player: Player; pid: string }) {
  const provider = PROVIDERS.find((p) => p.id === pid)!
  const sourceId = getSourceId(player.id, pid)
  return (
    <TableRow className="border-0 bg-muted/10 hover:bg-muted/10">
      <TableCell /><TableCell />
      <TableCell>
        <div className="flex min-w-0 items-center gap-1.5">
          <span className="inline-flex h-3 w-3 shrink-0 items-center justify-center">
            <ProviderDot color={provider.color} />
          </span>
          <span className="truncate font-mono text-xs text-muted-foreground/50">{sourceId}</span>
        </div>
      </TableCell>
      <TableCell>
        <span className="truncate font-mono text-xs text-muted-foreground/50">{provider.label}</span>
      </TableCell>
      <TableCell /><TableCell /><TableCell /><TableCell /><TableCell />
    </TableRow>
  )
}

export function PlayerDataTable() {
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [expanded, setExpanded] = useState<Set<string>>(new Set())
  const [sortKey, setSortKey] = useState<keyof Player | "providers" | null>(null)
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc")
  // col order: checkbox, expand, player-id, links, name, dob, age, position, nationality
  const [colWidths, setColWidths] = useState<number[]>([40, 32, 200, PROVIDER_COL_MIN, 150, 120, 75, 150, 130])
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const copyValue = (key: string, value: string, e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(value)
    setCopiedId(key)
    setTimeout(() => setCopiedId(null), 1500)
  }
  const theadRef = useRef<HTMLTableSectionElement>(null)
  const resizingRef = useRef<{ colIndex: number; startX: number; startWidth: number } | null>(null)
  const colMinWidthsRef = useRef<number[]>([])

  useEffect(() => {
    if (!theadRef.current) return
    const ths = Array.from(theadRef.current.querySelectorAll("th"))
    colMinWidthsRef.current = ths.map((th) => {
      const span = th.querySelector("span")
      return span ? span.getBoundingClientRect().width + 24 : 40
    })
    // Provider column minimum is driven by the widest dot row, not the header label
    colMinWidthsRef.current[3] = PROVIDER_COL_MIN
  }, [])

  const startResize = (e: React.MouseEvent, colIndex: number) => {
    e.preventDefault()
    e.stopPropagation()
    let hasDragged = false
    resizingRef.current = { colIndex, startX: e.clientX, startWidth: colWidths[colIndex] }

    const onMouseMove = (ev: MouseEvent) => {
      if (!resizingRef.current) return
      hasDragged = true
      const { colIndex: ci, startX, startWidth } = resizingRef.current
      const delta = ev.clientX - startX
      setColWidths((prev) => {
        const next = [...prev]
        next[ci] = Math.max(colMinWidthsRef.current[ci] ?? 60, startWidth + delta)
        return next
      })
    }

    const onMouseUp = () => {
      resizingRef.current = null
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseup", onMouseUp)
      if (hasDragged) {
        const blockClick = (ev: MouseEvent) => {
          ev.stopPropagation()
          document.removeEventListener("click", blockClick, true)
        }
        document.addEventListener("click", blockClick, true)
      }
    }

    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mouseup", onMouseUp)
  }

  const toggleSort = (key: keyof Player | "providers") => {
    if (sortKey !== key) {
      setSortKey(key)
      setSortDir("asc")
    } else if (sortDir === "asc") {
      setSortDir("desc")
    } else {
      setSortKey(null)
    }
  }

  const providerCount = (p: Player) =>
    p.providers.filter(id => id !== "av").length + (p.unlinked?.length ?? 0)

  const filtered = sortKey
    ? [...PLAYERS].sort((a, b) => {
        const cmp = sortKey === "providers"
          ? providerCount(a) - providerCount(b)
          : (() => {
              const av = a[sortKey as keyof Player]
              const bv = b[sortKey as keyof Player]
              return typeof av === "number" && typeof bv === "number"
                ? av - bv
                : String(av).localeCompare(String(bv))
            })()
        return sortDir === "asc" ? cmp : -cmp
      })
    : PLAYERS

  const allSelected = filtered.length > 0 && filtered.every((p) => selected.has(p.id))

  const toggleAll = () => {
    if (allSelected) {
      setSelected((prev) => {
        const next = new Set(prev)
        filtered.forEach((p) => next.delete(p.id))
        return next
      })
    } else {
      setSelected((prev) => {
        const next = new Set(prev)
        filtered.forEach((p) => next.add(p.id))
        return next
      })
    }
  }

  const toggleRow = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const toggleExpand = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <div className="bg-background text-foreground">

      {/* Legend */}
      {/* <div className="flex flex-wrap items-center gap-x-4 gap-y-1 px-4 py-2">
        {PROVIDERS.map((p) => (
          <span key={p.id} className="flex items-center gap-1.5 font-mono text-[10px]">
            <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: p.color }} />
            {p.label}
          </span>
        ))}
      </div> */}

      {/* Table */}
      <div className="overflow-x-auto overflow-hidden">
        <Table style={{ tableLayout: "fixed" }}>
          <colgroup>
            {colWidths.map((w, i) => (
              <col key={i} style={{ width: w }} />
            ))}
          </colgroup>
          <TableHeader ref={theadRef}>
            <TableRow className="group hover:bg-transparent">
              <TableHead className="w-10">
                <Checkbox checked={allSelected} onCheckedChange={toggleAll} />
              </TableHead>
              <TableHead className="w-8" />
              <TableHead
                key="id"
                className="relative cursor-pointer select-none text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => toggleSort("id")}
              >
                <span className="inline-flex items-center gap-1">
                  Player ID
                  {sortKey === "id" && sortDir === "asc"  ? <ChevronUp className="size-3 text-primary" /> :
                   sortKey === "id" && sortDir === "desc" ? <ChevronDown className="size-3 text-primary" /> :
                   <ChevronUp className="size-3 invisible" />}
                </span>
                <div
                  className="absolute right-0 top-0 h-full w-3 cursor-col-resize select-none opacity-0 group-hover:opacity-100 after:absolute after:right-1 after:top-1/2 after:h-4 after:w-px after:-translate-y-1/2 after:bg-border"
                  onMouseDown={(e) => startResize(e, 2)}
                  onClick={(e) => e.stopPropagation()}
                />
              </TableHead>
              <TableHead
                key="links"
                className="relative cursor-pointer select-none text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => toggleSort("providers")}
              >
                <span className="inline-flex items-center gap-1">
                  Provider
                  {sortKey === "providers" && sortDir === "asc"  ? <ChevronUp className="size-3 text-primary" /> :
                   sortKey === "providers" && sortDir === "desc" ? <ChevronDown className="size-3 text-primary" /> :
                   <ChevronUp className="size-3 invisible" />}
                </span>
                <div
                  className="absolute right-0 top-0 h-full w-3 cursor-col-resize select-none opacity-0 group-hover:opacity-100 after:absolute after:right-1 after:top-1/2 after:h-4 after:w-px after:-translate-y-1/2 after:bg-border"
                  onMouseDown={(e) => startResize(e, 3)}
                  onClick={(e) => e.stopPropagation()}
                />
              </TableHead>
              {(["name","dob","age","position","nationality"] as (keyof Player)[]).map((col, i) => (
                <TableHead
                  key={col}
                  className={`relative cursor-pointer select-none text-muted-foreground transition-colors hover:text-foreground ${col === "age" ? "text-right pr-5" : ""}`}
                  onClick={() => toggleSort(col)}
                >
                  <span className={`inline-flex items-center gap-1${col === "age" ? " w-full justify-end" : ""}`}>
                    {col === "age" && (
                      sortKey === col && sortDir === "asc"  ? <ChevronUp className="size-3 text-primary" /> :
                      sortKey === col && sortDir === "desc" ? <ChevronDown className="size-3 text-primary" /> :
                      <ChevronUp className="size-3 invisible" />
                    )}
                    {col === "dob" ? "Date of Birth" : col.charAt(0).toUpperCase() + col.slice(1)}
                    {col !== "age" && (
                      sortKey === col && sortDir === "asc"  ? <ChevronUp className="size-3 text-primary" /> :
                      sortKey === col && sortDir === "desc" ? <ChevronDown className="size-3 text-primary" /> :
                      <ChevronUp className="size-3 invisible" />
                    )}
                  </span>
                  <div
                    className="absolute right-0 top-0 h-full w-3 cursor-col-resize select-none opacity-0 group-hover:opacity-100 after:absolute after:right-1 after:top-1/2 after:h-4 after:w-px after:-translate-y-1/2 after:bg-border"
                    onMouseDown={(e) => startResize(e, i + 4)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((player) => {
              const isExpanded = expanded.has(player.id)
              return (
                <Fragment key={player.id}>
                  <TableRow className={`border-0 ${selected.has(player.id) ? "bg-muted/40" : ""}`}>

                    <TableCell>
                      <Checkbox
                        checked={selected.has(player.id)}
                        onCheckedChange={() => toggleRow(player.id)}
                      />
                    </TableCell>

                    <TableCell>
                      {player.providers.includes("av") &&
                        (player.providers.filter(p => p !== "av").length > 0 || (player.unlinked ?? []).length > 0) && (
                        <button
                          onClick={() => toggleExpand(player.id)}
                          className="text-muted-foreground hover:text-foreground"
                          style={{ display: "block", transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.15s ease" }}
                        >
                          <ChevronRight className="size-4" />
                        </button>
                      )}
                    </TableCell>

                    <TableCell>
                      {player.providers.includes("av") ? (
                        <button
                          onClick={(e) => copyValue(`${player.id}-av`, player.id, e)}
                          className="group/uuid flex min-w-0 w-full items-center gap-1.5 text-left"
                        >
                          <span className="relative inline-flex h-3 w-3 shrink-0 items-center justify-center">
                            <span className={`absolute inset-0 flex items-center justify-center transition-opacity ${copiedId === `${player.id}-av` ? "opacity-0" : "group-hover/uuid:opacity-0"}`}>
                              <ProviderDot color={PROVIDERS.find((p) => p.id === "av")!.color} />
                            </span>
                            <Copy className={`absolute inset-0 m-auto size-3 text-muted-foreground transition-opacity ${copiedId === `${player.id}-av` ? "opacity-0" : "opacity-0 group-hover/uuid:opacity-100"}`} />
                            <Check className={`absolute inset-0 m-auto size-3 text-green-500 transition-opacity ${copiedId === `${player.id}-av` ? "opacity-100" : "opacity-0"}`} />
                          </span>
                          <span className="truncate font-mono text-xs text-muted-foreground group-hover/uuid:text-foreground transition-colors">{player.id}</span>
                        </button>
                      ) : (() => {
                        const srcPid = player.providers[0]
                        const srcProvider = PROVIDERS.find((p) => p.id === srcPid)!
                        const srcId = getSourceId(player.id, srcPid)
                        const copyKey = `${player.id}-${srcPid}-unregistered`
                        const copied = copiedId === copyKey
                        return (
                          <button
                            onClick={(e) => copyValue(copyKey, srcId, e)}
                            className="group/sid flex min-w-0 w-full items-center gap-1.5 text-left"
                          >
                            <span className="relative inline-flex h-3 w-3 shrink-0 items-center justify-center">
                              <span className={`absolute inset-0 flex items-center justify-center transition-opacity ${copied ? "opacity-0" : "group-hover/sid:opacity-0"}`}>
                                <ProviderDot color={srcProvider.color} />
                              </span>
                              <Copy className={`absolute inset-0 m-auto size-3 text-muted-foreground transition-opacity ${copied ? "opacity-0" : "opacity-0 group-hover/sid:opacity-100"}`} />
                              <Check className={`absolute inset-0 m-auto size-3 text-green-500 transition-opacity ${copied ? "opacity-100" : "opacity-0"}`} />
                            </span>
                            <span className="truncate font-mono text-xs text-muted-foreground group-hover/sid:text-foreground transition-colors">{srcId}</span>
                          </button>
                        )
                      })()}
                    </TableCell>

                    <TableCell>
                      <div className="flex gap-1 items-center">
                        {player.providers.includes("av") ? (
                          <>
                            {PROVIDERS.filter((p) => p.id !== "av" && player.providers.includes(p.id)).length === 0 &&
                              (player.unlinked ?? []).length === 0 && (
                                <span className="truncate font-mono text-xs text-muted-foreground/50">Aston Villa</span>
                              )}
                            {PROVIDERS.filter((p) => p.id !== "av" && player.providers.includes(p.id)).map((p) => (
                              <button
                                key={p.id}
                                onClick={(e) => copyValue(`${player.id}-${p.id}`, getSourceId(player.id, p.id), e)}
                                className="group/dot relative inline-flex h-3 w-3 items-center justify-center"
                                title={p.label}
                              >
                                <span className={`absolute inset-0 flex items-center justify-center transition-opacity ${copiedId === `${player.id}-${p.id}` ? "opacity-0" : "group-hover/dot:opacity-0"}`}>
                                  <ProviderDot color={p.color} />
                                </span>
                                <Copy className={`absolute inset-0 m-auto size-3 text-muted-foreground transition-opacity ${copiedId === `${player.id}-${p.id}` ? "opacity-0" : "opacity-0 group-hover/dot:opacity-100"}`} />
                                <Check className={`absolute inset-0 m-auto size-3 text-green-500 transition-opacity ${copiedId === `${player.id}-${p.id}` ? "opacity-100" : "opacity-0"}`} />
                              </button>
                            ))}
                            {(player.unlinked ?? []).map((pid) => {
                              const p = PROVIDERS.find((pr) => pr.id === pid)!
                              return (
                                <span key={pid} className="inline-flex h-3 w-3 items-center justify-center" title={`${p.label} — not linked`}>
                                  <ProviderDot color={p.color} />
                                </span>
                              )
                            })}
                          </>
                        ) : (
                          <span className="truncate font-mono text-xs text-muted-foreground/50">
                            {PROVIDERS.find((p) => p.id === player.providers[0])?.label}
                          </span>
                        )}
                      </div>
                    </TableCell>

                    <TableCell>
                      <span className="block truncate text-sm font-medium">{player.name}</span>
                    </TableCell>

                    <TableCell className="font-mono text-xs text-muted-foreground"><span className="block truncate">{player.dob}</span></TableCell>
                    <TableCell className="font-mono tabular-nums text-right text-xs text-muted-foreground pr-5">{player.age}</TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      <span className="block truncate">{player.position}</span>
                    </TableCell>

                    <TableCell>
                      <span className="flex min-w-0 items-center gap-1.5 font-mono text-xs text-muted-foreground">
                        <span className={`fi fi-${player.flag} shrink-0 text-sm`} />
                        <span className="truncate">{player.nationality}</span>
                      </span>
                    </TableCell>

                  </TableRow>

                  {isExpanded && player.providers.filter((pid) => pid !== "av").map((pid) => (
                    player.providers.includes("av")
                      ? <NestedRow key={`${player.id}-${pid}`} player={player} pid={pid} copiedId={copiedId} copyValue={copyValue} />
                      : <ProviderOnlyRow key={`${player.id}-${pid}`} player={player} pid={pid} />
                  ))}
                  {isExpanded && (player.unlinked ?? []).map((pid) => (
                    <UnlinkedRow key={`${player.id}-${pid}-unlinked`} pid={pid} />
                  ))}
                </Fragment>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default PlayerDataTable
