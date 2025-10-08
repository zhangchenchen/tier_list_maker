"use client";

import Icon from "@/components/icon";
import { Link } from "@/i18n/navigation";
import { NavItem } from "@/types/blocks/base";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function ({
  className,
  items,
  ...props
}: {
  className?: string;
  items: NavItem[];
}) {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      {items.map((item, index) => (
        <Link
          key={index}
          href={item.url as any}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            item.is_active || pathname.includes(item.url as any)
              ? "bg-muted/50 text-primary hover:bg-muted hover:text-primary"
              : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
        >
          {item.icon && <Icon name={item.icon} className="w-4 h-4" />}
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
