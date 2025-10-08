import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { TableColumn } from "@/types/blocks/table";
import TableItemImage from "./image";
import TableItemLabel from "./label";
import TableItemTime from "./time";
import Copy from "./copy";

export default function TableComponent({
  columns,
  data,
  emptyMessage,
}: {
  columns?: TableColumn[];
  data?: any[];
  emptyMessage?: string;
}) {
  if (!columns) {
    columns = [];
  }

  return (
    <Table className="w-full">
      <TableHeader className="">
        <TableRow className="rounded-md">
          {columns &&
            columns.map((item: TableColumn, idx: number) => {
              return (
                <TableHead key={idx} className={item.className}>
                  {item.title}
                </TableHead>
              );
            })}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data && data.length > 0 ? (
          data.map((item: any, idx: number) => (
            <TableRow key={idx} className="h-16">
              {columns &&
                columns.map((column: TableColumn, iidx: number) => {
                  const value = item[column.name as keyof typeof item];

                  const content = column.callback
                    ? column.callback(item)
                    : value;

                  let cellContent = content;

                  if (column.type === "image") {
                    cellContent = (
                      <TableItemImage
                        value={value}
                        options={column.options}
                        className={column.className}
                      />
                    );
                  } else if (column.type === "time") {
                    cellContent = (
                      <TableItemTime
                        value={value}
                        options={column.options}
                        className={column.className}
                      />
                    );
                  } else if (column.type === "label") {
                    cellContent = (
                      <TableItemLabel
                        value={value}
                        options={column.options}
                        className={column.className}
                      />
                    );
                  } else if (column.type === "copy" && value) {
                    cellContent = <Copy text={value}>{content}</Copy>;
                  }

                  return (
                    <TableCell key={iidx} className={column.className}>
                      {cellContent}
                    </TableCell>
                  );
                })}
            </TableRow>
          ))
        ) : (
          <TableRow className="">
            <TableCell colSpan={columns.length}>
              <div className="flex w-full justify-center items-center py-8 text-muted-foreground">
                <p>{emptyMessage}</p>
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
