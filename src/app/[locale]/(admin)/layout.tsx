import DashboardLayout from "@/components/dashboard/layout";
import Empty from "@/components/blocks/empty";
import { ReactNode } from "react";
import { Sidebar } from "@/types/blocks/sidebar";
import { getUserInfo } from "@/services/user";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const userInfo = await getUserInfo();
  if (!userInfo || !userInfo.email) {
    redirect("/auth/signin");
  }

  const adminEmails = process.env.ADMIN_EMAILS?.split(",");
  if (!adminEmails?.includes(userInfo?.email)) {
    return <Empty message="No access" />;
  }

  const sidebar: Sidebar = {
    brand: {
      title: "TierListMaker",
      logo: {
        src: "/logo.svg",
        alt: "TierListMaker",
      },
      url: "/admin",
    },
    // nav: {
    //   items: [
    //     {
    //       title: "Dashboard",
    //       url: "/admin",
    //       icon: "RiDashboardLine",
    //     },
    //   ],
    // },
    variant: "sidebar", // sidebar, floating, inset
    collapsible: "icon", // offcanvas, icon
    nav: {
      title: "Menu",
      items: [
        {
          title: "Users",
          url: "/admin/users",
          icon: "RiUserLine",
        },
        {
          title: "Orders",
          icon: "RiOrderPlayLine",
          url: "/admin/orders",
        },
        {
          title: "CMS",
          icon: "RiArticleLine",
          is_expand: true,
          children: [
            {
              title: "Posts",
              url: "/admin/posts",
              icon: "RiArticleLine",
            },
            {
              title: "Categories",
              url: "/admin/categories",
              icon: "RiFolderLine",
            },
          ],
        },
        {
          title: "Feedbacks",
          url: "/admin/feedbacks",
          icon: "RiMessage2Line",
        },
      ],
    },
    bottomNav: {
      items: [
        {
          title: "Documents",
          url: "https://docs.TierListMaker.ai",
          target: "_blank",
          icon: "RiFileTextLine",
        },
        {
          title: "Blocks",
          url: "https://TierListMaker.ai/blocks",
          target: "_blank",
          icon: "RiDashboardLine",
        },
        {
          title: "Showcases",
          url: "https://TierListMaker.ai/showcase",
          target: "_blank",
          icon: "RiAppsLine",
        },
      ],
    },
    social: {
      items: [
        {
          title: "Home",
          url: "/",
          target: "_blank",
          icon: "RiHomeLine",
        },
        {
          title: "Github",
          url: "https://github.com/TierListMakerai/TierListMaker-template-one",
          target: "_blank",
          icon: "RiGithubLine",
        },
        {
          title: "Discord",
          url: "https://discord.gg/HQNnrzjZQS",
          target: "_blank",
          icon: "RiDiscordLine",
        },
        {
          title: "X",
          url: "https://x.com/TierListMakerai",
          target: "_blank",
          icon: "RiTwitterLine",
        },
      ],
    },
    account: {
      items: [
        {
          title: "Home",
          url: "/",
          icon: "RiHomeLine",
          target: "_blank",
        },
        {
          title: "Recharge",
          url: "/pricing",
          icon: "RiMoneyDollarBoxLine",
          target: "_blank",
        },
      ],
    },
  };

  return <DashboardLayout sidebar={sidebar}>{children}</DashboardLayout>;
}
