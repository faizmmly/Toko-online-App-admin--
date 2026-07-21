"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BannerColumn = {
  id: string
  label: string
  createdAt: string
}

export const columns: ColumnDef<BannerColumn>[] = [
  {
    accessorKey: "label",
    header: "Label",
    cell: ({row}) => (
      <span className="font-semibold text-slate-800">{row.original.label}</span>
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