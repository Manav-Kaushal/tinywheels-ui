import Loader from "@components/Loader";
import React from "react";
import { useTable } from "react-table";

interface TableProps {
  columns: any[];
  data: any[];
  loading?: boolean;
  noDataMessage?: string;
}

const Table: React.FC<TableProps> = ({
  columns,
  data,
  loading,
  noDataMessage,
}) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <table className="relative" {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} className="font-medium">
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className="relative" {...getTableBodyProps()}>
        {loading && (
          <div className="absolute top-0 left-0 z-10 flex items-center justify-center w-full h-full bg-black bg-opacity-10">
            <Loader />
          </div>
        )}
        {data?.length > 0 &&
          rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
      </tbody>
      {data?.length === 0 && (
        <tbody
          className="absolute w-full py-4 text-center text-neutral-500"
          {...getTableBodyProps()}
        >
          {noDataMessage || "No Data Found"}
        </tbody>
      )}
    </table>
  );
};

export default Table;
