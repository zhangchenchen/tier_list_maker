"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Nav as NavType } from "@/types/blocks/base";
import { Link } from "@/i18n/navigation";
import Icon from "@/components/icon";
import { usePathname, useRouter } from "@/i18n/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronRight } from "lucide-react";

export default function Nav({ nav }: { nav: NavType }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2 mt-4">
        <SidebarMenu>
          {nav.items?.map((item) => (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.is_expand}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={`${
                      item.is_active || pathname.endsWith(item.url as string)
                        ? "bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/90 hover:text-sidebar-accent-foreground active:bg-sidebar-accent/90 active:text-sidebar-accent-foreground min-w-8 duration-200 ease-linear"
                        : ""
                    }`}
                    onClick={() => {
                      if (item.url) {
                        router.push(item.url as any);
                      }
                    }}
                  >
                    {item.icon && <Icon name={item.icon} />}
                    <span>{item.title}</span>
                    {item.children && (
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    )}
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                {item.children && (
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.children?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.name || subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            className={`${
                              subItem.is_active ||
                              pathname.endsWith(subItem.url as string)
                                ? "bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/90 hover:text-sidebar-accent-foreground active:bg-sidebar-accent/90 active:text-sidebar-accent-foreground min-w-8 duration-200 ease-linear"
                                : ""
                            }`}
                          >
                            <Link href={subItem.url as any}>
                              <span className="px-2">{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                )}
              </SidebarMenuItem>
            </Collapsible>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
