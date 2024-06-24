"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SelectListing } from "@/types/listings";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";
import { FC, useMemo } from "react";

type ListingTableProps = {
  data: SelectListing[];
};

const columnHelper = createColumnHelper<SelectListing>();

const ListingTable: FC<ListingTableProps> = ({ data }) => {
  const columns = useMemo(() => {
    return [
      columnHelper.display({
        header: "Match",
        cell({ row }) {
          return (
            <Link href={`/admin/match-listing/${row.original.id}`}>Match</Link>
          );
        },
      }),
      columnHelper.accessor("id", {
        header: "Listing ID",
        cell({ row }) {
          return <span>{row.original.id.slice(0, 5)}</span>;
        },
      }),
      columnHelper.accessor("projectName", {
        header: "Project",
      }),
      columnHelper.accessor("listingType", {
        header: "Type",
      }),
      columnHelper.accessor("price", {
        header: "Price",
      }),
      columnHelper.accessor("isActive", {
        header: "Active",
      }),
      columnHelper.accessor("listingCategory", {
        header: "Listing Category",
      }),
      columnHelper.accessor("isAvailable", {
        header: "Availability",
      }),
    ];
  }, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="mt-8 flow-root">
      <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle">
          <Table className="min-w-full border-separate border-spacing-0">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="whitespace-nowrap sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 backdrop-blur backdrop-filter"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="whitespace-nowrap">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ListingTable;
