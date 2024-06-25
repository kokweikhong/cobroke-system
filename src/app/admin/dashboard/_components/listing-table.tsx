"use client";

import { SelectListing } from "@/types/listings";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";
import { FC, useMemo } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "sonner";
import { ClipboardIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
            <Link
              href={`/admin/match-listing/${row.original.id}`}
              className="bg-primary text-white text-sm px-2 py-1 rounded-md hover:bg-primary/90"
            >
              Match
            </Link>
          );
        },
      }),
      columnHelper.accessor("id", {
        header: "Listing ID",
        cell: (info) => (
          <div className="flex items-center space-x-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Link
                    href={`/admin/update-listing/${info.getValue()}`}
                    className="hover:underline hover:text-primary"
                  >
                    {`${info.getValue().slice(0, 5)}`}
                    <span className="text-xs">[...]</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Click me to edit listing</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <CopyToClipboard
              text={info.getValue()}
              onCopy={() => toast("Copied to clipboard")}
            >
              <button className="group flex items-center space-x-1 justify-evenly focus:outline-none">
                <ClipboardIcon className="w-4 h-4 ml-1 group-hover:text-primary" />
              </button>
            </CopyToClipboard>
          </div>
        ),
      }),
      columnHelper.accessor("projectName", {
        header: "Project",
      }),
      columnHelper.accessor("listingType", {
        header: "Type",
        cell: (info) => <span className="uppercase">{info.getValue()}</span>,
      }),
      columnHelper.accessor("price", {
        header: "Price",
        cell: (info) => (
          <span>{`RM ${parseFloat(info.getValue()).toLocaleString()}`}</span>
        ),
      }),
      columnHelper.accessor("isActive", {
        header: "Active",
        cell: (info) => (
          <span>
            {info.getValue() ? (
              <span className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span className="text-primary">Complete</span>
              </span>
            ) : (
              <span className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                <span className="text-red-500">Incomplete</span>
              </span>
            )}
          </span>
        ),
      }),
      columnHelper.accessor("listingCategory", {
        header: "Listing Category",
        cell: (info) => <span className="capitalize">{info.getValue()}</span>,
      }),
      columnHelper.accessor("isAvailable", {
        header: "Availability",
        cell: (info) => (
          <Switch
            className="h-4 w-8 [&>span]:h-3 [&>span]:w-3"
            checked={info.getValue()}
            onChange={(value) => {
              console.log(value);
            }}
          />
        ),
      }),
    ];
  }, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="">
      <div className="bg-white mt-4 flow-root h-96 overflow-auto">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full border-separate border-spacing-0">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="whitespace-nowrap sticky top-0 z-10 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-500 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-6 lg:pl-8"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListingTable;
