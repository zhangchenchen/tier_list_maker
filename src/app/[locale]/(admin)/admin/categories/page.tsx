import { TableColumn } from "@/types/blocks/table";
import TableSlot from "@/components/dashboard/slots/table";
import { Table as TableSlotType } from "@/types/slots/table";
import { getCategories } from "@/models/category";
import moment from "moment";
import Dropdown from "@/components/blocks/table/dropdown";
import { NavItem } from "@/types/blocks/base";

export default async function CategoriesPage() {
  const categories = await getCategories({
    page: 1,
    limit: 50,
  });

  const columns: TableColumn[] = [
    {
      title: "Name",
      name: "name",
      callback: (row) => {
        return row.name;
      },
    },
    {
      title: "Title",
      name: "title",
      callback: (row) => row.title,
    },
    {
      name: "description",
      title: "Description",
      callback: (row) => row.description,
    },
    {
      name: "sort",
      title: "Sort",
      callback: (row) => row.sort,
    },
    {
      name: "status",
      title: "Status",
      callback: (row) => row.status,
    },
    {
      name: "created_at",
      title: "Created At",
      callback: (row) => moment(row.created_at).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      callback: (item) => {
        const items: NavItem[] = [
          {
            title: "Edit",
            icon: "RiEditLine",
            url: `/admin/categories/${item.uuid}/edit`,
          },
          {
            title: "View",
            icon: "RiEyeLine",
            target: "_blank",
            url: `/posts?category=${encodeURIComponent(item.name)}`,
          },
        ];

        return <Dropdown items={items} />;
      },
    },
  ];

  const table: TableSlotType = {
    title: "Categories",
    toolbar: {
      items: [
        {
          title: "Add Category",
          icon: "RiAddLine",
          url: "/admin/categories/add",
        },
      ],
    },
    columns,
    data: categories,
  };

  return <TableSlot {...table} />;
}
