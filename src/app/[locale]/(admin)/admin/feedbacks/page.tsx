import { TableColumn } from "@/types/blocks/table";
import TableSlot from "@/components/dashboard/slots/table";
import { Table as TableSlotType } from "@/types/slots/table";
import { getFeedbacks } from "@/models/feedback";
import moment from "moment";

export default async function () {
  const feedbacks = await getFeedbacks(1, 50);

  const columns: TableColumn[] = [
    {
      title: "User",
      name: "user",
      callback: (row) => {
        if (!row.user || !row.user.avatar_url) {
          return "-";
        }

        return (
          <div className="flex items-center gap-2">
            <img
              src={row.user?.avatar_url || ""}
              className="w-8 h-8 rounded-full"
            />
            <span>{row.user?.nickname}</span>
          </div>
        );
      },
    },
    {
      name: "content",
      title: "Content",
      callback: (row) => row.content,
    },
    {
      name: "rating",
      title: "Rating",
      callback: (row) => row.rating,
    },
    {
      name: "created_at",
      title: "Created At",
      callback: (row) => moment(row.created_at).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      name: "actions",
      title: "Actions",
      callback: (row) => (
        <a href={`/admin/users?user_uuid=${row.user_uuid}`} target="_blank">
          View user
        </a>
      ),
    },
  ];

  const table: TableSlotType = {
    title: "Feedbacks",
    columns,
    data: feedbacks,
  };

  return <TableSlot {...table} />;
}
