"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CategoryColumn = {
  id: string
  name: string
  bannerLabel: string
  createdAt: string
}

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "name",
    header: "Nama Kategori",
    cell: ({row}) => (
      <span className="font-semibold text-slate-800">{row.original.name}</span>
    )
  },
  {
    accessorKey: "banner",
    header: "Banner",
    cell: ({row}) => (
      <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200/60">
        {row.original.bannerLabel}
        </span>
    )
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({row}) => (
      <span className="text-xs text-slate-500">{row.original.createdAt}</span>
    )
  },
  {
    id: "actions",
    cell: ({row}) => <CellAction data={row.original}/>
  }
]