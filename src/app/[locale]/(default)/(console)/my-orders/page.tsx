import { getOrdersByPaidEmail, getOrdersByUserUuid } from "@/models/order";
import { getUserEmail, getUserUuid } from "@/services/user";

import { TableColumn } from "@/types/blocks/table";
import TableSlot from "@/components/console/slots/table";
import { Table as TableSlotType } from "@/types/slots/table";
import { getTranslations } from "next-intl/server";
import moment from "moment";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getStripeBilling } from "@/services/order";

export default async function () {
  const t = await getTranslations();

  const user_uuid = await getUserUuid();
  const user_email = await getUserEmail();

  const callbackUrl = `${process.env.NEXT_PUBLIC_WEB_URL}/my-orders`;
  if (!user_uuid) {
    redirect(`/auth/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  }

  let orders = await getOrdersByUserUuid(user_uuid);
  if (!orders || orders.length === 0) {
    orders = await getOrdersByPaidEmail(user_email);
  }

  const columns: TableColumn[] = [
    { name: "order_no", title: t("my_orders.table.order_no") },
    { name: "paid_email", title: t("my_orders.table.email") },
    { name: "product_name", title: t("my_orders.table.product_name") },
    {
      name: "amount",
      title: t("my_orders.table.amount"),
      callback: (item: any) =>
        `${item.currency.toUpperCase() === "CNY" ? "¥" : "$"} ${
          item.amount / 100
        }`,
    },
    {
      name: "interval",
      title: t("my_orders.table.interval"),
      callback: async (item: any) => {
        if (item.interval === "month") {
          return t("my_orders.table.interval_month");
        }

        if (item.interval === "year") {
          return t("my_orders.table.interval_year");
        }

        return t("my_orders.table.interval_one_time");
      },
    },
    {
      name: "paid_at",
      title: t("my_orders.table.paid_at"),
      callback: (item: any) =>
        moment(item.paid_at).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      callback: async (item: any) => {
        if (
          !item.stripe_session_id ||
          !item.stripe_session_id.startsWith("cs_")
        ) {
          return "";
        }

        let sub_id = item.sub_id;
        if (!sub_id && item.paid_detail) {
          try {
            const paid_detail = JSON.parse(item.paid_detail);
            sub_id = paid_detail.subscription;
          } catch (e) {
            console.log("parse paid_detail failed: ", e);
          }
        }
        if (sub_id) {
          const billing = await getStripeBilling(sub_id);

          return (
            <Link href={billing.url} target="_blank">
              {t("my_orders.table.manage_billing")}
            </Link>
          );
        }

        return "";
      },
    },
  ];

  const table: TableSlotType = {
    title: t("my_orders.title"),
    toolbar: {
      items: [
        {
          title: t("my_orders.read_docs"),
          icon: "RiBookLine",
          url: "https://docs.shipany.ai",
          target: "_blank",
          variant: "default",
        },
      ],
    },
    columns: columns,
    data: orders,
    empty_message: t("my_orders.no_orders"),
  };

  return <TableSlot {...table} />;
}
