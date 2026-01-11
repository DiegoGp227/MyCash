"use client";

import * as React from "react";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Transactions } from "../types/types.home";

const defaultData: Transactions[] = [
  {
    date: "02/02/2024",
    description: "Supermarket purchase",
    category: "Food",
    subCategory: "Groceries",
    type: "Expense",
    amount: "45.90",
  },
  {
    date: "05/02/2024",
    description: "Monthly salary",
    category: "Income",
    subCategory: "Salary",
    type: "Income",
    amount: "1200.00",
  },
  {
    date: "07/02/2024",
    description: "Uber ride",
    category: "Transport",
    subCategory: "Taxi",
    type: "Expense",
    amount: "12.50",
  },
  {
    date: "10/02/2024",
    description: "Internet bill",
    category: "Services",
    subCategory: "Internet",
    type: "Expense",
    amount: "38.00",
  },
  {
    date: "12/02/2024",
    description: "Coffee with friends",
    category: "Food",
    subCategory: "Coffee",
    type: "Expense",
    amount: "6.20",
  },
  {
    date: "15/02/2024",
    description: "Freelance project",
    category: "Income",
    subCategory: "Freelance",
    type: "Income",
    amount: "350.00",
  },
];


const columnHelper = createColumnHelper<Transactions>();

const columns = [
  columnHelper.accessor("date", {
    header: "Date",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("description", {
    header: "Description",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("category", {
    header: "Category",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("subCategory", {
    header: "Sub Category",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("type", {
    header: "Type",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("amount", {
    header: "Amount",
    cell: (info) => info.getValue(),
    // footer: () => "Total",
  }),
];

export function TransactionsTable() {
  const [data, _setData] = React.useState(() => [...defaultData]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full">
      <table className="w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="pb-4 px-6 text-left text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider border-b-2 border-gray-900 dark:border-primary-purple/50 hover:text-primary-purple dark:hover:text-primary-purple-light hover:bg-gray-100 dark:hover:bg-primary-purple/10 transition-all duration-200 cursor-pointer"
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
            <tr
              key={row.id}
              className="group border-b border-gray-100 dark:border-gray-800/50 last:border-0 hover:bg-primary-purple/10 dark:hover:bg-primary-purple/25 hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-primary-purple/30 transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="py-4 px-6 text-sm text-gray-900 dark:text-gray-100 group-hover:text-primary-purple dark:group-hover:text-white group-hover:font-medium transition-all duration-200"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="pt-4 px-6 text-left text-sm font-semibold text-gray-900 dark:text-white border-t-2 border-gray-200 dark:border-primary-purple/50"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
}
