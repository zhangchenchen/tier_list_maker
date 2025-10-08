import { i18n } from "@/lib/source";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import Image from "next/image";

export function baseOptions(locale: string): BaseLayoutProps {
  return {
    links: [],
    nav: {
      title: (
        <>
          <Image
            src="/logo.svg"
            alt="Logo"
            width={28}
            height={28}
            className=""
          />
          <span className="text-lg text-primary font-bold">ShipAny</span>
        </>
      ),
      transparentMode: "top",
    },
    i18n,
  };
}
