import {
  useSidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Brand as BrandType } from "@/types/blocks/base";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

export default function ({ brand }: { brand: BrandType }) {
  const { open } = useSidebar();
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <Link href={brand?.url as any} className="flex items-center gap-2">
            {brand?.logo && (
              <Image
                src={brand?.logo?.src as any}
                alt={brand?.title as string}
                width={28}
                height={28}
                className="rounded-full w-8 h-8"
              />
            )}
            {open && (
              <span className="text-base font-semibold flex-1">
                {brand?.title}
              </span>
            )}
            {false && <SidebarTrigger className="-ml-1" />}
          </Link>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
}
