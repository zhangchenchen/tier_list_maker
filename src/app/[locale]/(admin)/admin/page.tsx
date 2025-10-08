import DataCards from "@/components/blocks/data-cards";
import DataCharts from "@/components/blocks/data-charts";
import Header from "@/components/dashboard/header";
import { getOrderCountByDate, getPaidOrdersTotal } from "@/models/order";
import { getUserCountByDate, getUsersTotal } from "@/models/user";
import { getFeedbacksTotal } from "@/models/feedback";
import { getPostsTotal } from "@/models/post";
import { DataCard } from "@/types/blocks/base";

export default async function () {
  const totalPaidOrders = await getPaidOrdersTotal();
  const totalUsers = await getUsersTotal();
  const totalFeedbacks = await getFeedbacksTotal();
  const totalPosts = await getPostsTotal();

  const dataCards: DataCard[] = [
    {
      title: "Total Users",
      label: "",
      value: (totalUsers || 0).toString(),
      description: "Total users registered in the system",
    },
    {
      title: "Paid Orders",
      label: "",
      value: (totalPaidOrders || 0).toString(),
      description: "User Paid Orders in total",
    },
    {
      title: "System Posts",
      label: "",
      value: (totalPosts || 0).toString(),
      description: "Posts in total",
    },
    {
      title: "User Feedbacks",
      label: "",
      value: (totalFeedbacks || 0).toString(),
      description: "Feedbacks in total",
    },
  ];

  // Get data for the last 30 days
  const startTime = new Date();
  startTime.setDate(startTime.getDate() - 90);
  const orders = await getOrderCountByDate(startTime.toISOString(), "paid");
  const users = await getUserCountByDate(startTime.toISOString());

  // Merge the data into a single array
  const allDates = new Set([
    ...(orders ? Array.from(orders.keys()) : []),
    ...(users ? Array.from(users.keys()) : []),
  ]);

  const data = Array.from(allDates)
    .sort()
    .map((date) => ({
      date,
      users: users?.get(date) || 0,
      orders: orders?.get(date) || 0,
    }));

  const fields = [
    { key: "users", label: "Users", color: "var(--primary)" },
    { key: "orders", label: "Orders", color: "var(--secondary)" },
  ];

  return (
    <div className="flex flex-col gap-4">
      <Header />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <DataCards dataCards={dataCards} />
            <div className="px-4 lg:px-6">
              <DataCharts
                data={data}
                fields={fields}
                title="Users and Orders Overview"
                description="Daily users and orders data"
                defaultTimeRange="90d"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
