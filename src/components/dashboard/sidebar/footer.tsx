"use client";

import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";

import Icon from "@/components/icon";
import { Link } from "@/i18n/navigation";
import { Social as SocialType } from "@/types/blocks/base";
import ThemeToggle from "@/components/theme/toggle";
import { Separator } from "@/components/ui/separator";

export default function ({ social }: { social: SocialType }) {
  const { open } = useSidebar();

  const handleTabChange = (value: string) => {
    console.log(value);
  };

  return (
    <>
      {open ? (
        <div className="w-full flex items-center justify-center mx-auto gap-x-4 px-4 py-4 border-t border-gray-200">
          {social?.items?.map((item, idx: number) => (
            <div className="cursor-pointer hover:text-primary" key={idx}>
              <Link
                href={item.url as any}
                target={item.target || "_self"}
                className="cursor-pointer"
              >
                {item.icon && <Icon name={item.icon} className="text-xl" />}
              </Link>
            </div>
          ))}
          <Separator orientation="vertical" className="h-4" />
          <ThemeToggle />
        </div>
      ) : null}
    </>
  );
}
