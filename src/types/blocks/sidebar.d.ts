import { Brand, Nav, Social, Account, Library } from "@/types/blocks/base";

export interface Sidebar {
  disabled?: boolean;
  brand?: Brand;
  nav?: Nav;
  library?: Library;
  social?: Social;
  account?: Account;
  bottomNav?: Nav;
  collapsible?: "offcanvas" | "icon";
  variant?: "sidebar" | "floating" | "inset";
}
