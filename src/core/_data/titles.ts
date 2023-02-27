import {
  AcademicCapIcon,
  CollectionIcon,
  ColorSwatchIcon,
  CreditCardIcon,
  UserIcon,
} from "@heroicons/react/solid";
import { RoleType, THead } from "core/utils/enums";

export const navigation = [
  {
    name: "Inboxes",
    href: "#",
    children: [
      { name: "Technical Support", href: "#" },
      { name: "Sales", href: "#" },
      { name: "General", href: "#" },
    ],
  },
  { name: "Reporting", href: "#", children: [] },
  { name: "Settings", href: "#", children: [] },
];

export const userNavigation = [
  { name: "Your Profile", href: "/profile" },
  { name: "Sign out", href: "/login" },
];

export const sidebarNavigation = [
  {
    name: "Items",
    href: "/lessons",
    icon: AcademicCapIcon,
    permissions: [RoleType.Admin],
    current: false,
  },
  {
    name: "Subscriptions",
    href: "/subscription-type",
    icon: CreditCardIcon,
    permissions: [RoleType.Admin],
    current: false,
  },
  {
    name: "Categories",
    href: "/categories",
    icon: CollectionIcon,
    permissions: [RoleType.Admin],
    current: false,
  },
  {
    name: "Tags",
    href: "/tags",
    icon: ColorSwatchIcon,
    permissions: [RoleType.Admin],
    current: false,
  },
  {
    name: "Technologies",
    href: "/technologies",
    icon: ColorSwatchIcon,
    permissions: [RoleType.Admin],
    current: false,
  },
  {
    name: "Users",
    href: "/users",
    icon: UserIcon,
    permissions: [RoleType.Admin],
    current: false,
  },
];

export const CategoryTableNames = ["Title", "position", "Show", THead.edit];
export const TagTableNames = ["Title", THead.edit];
export const TechnologyTableNames = ["Title", THead.edit];

export const UserTableNames = ["Title", "Email", "Role", THead.edit];
export const LessonTableNames = [
  "Title",
  "Categories",
  "Tags",
  "Technologies",
  "Price",
  THead.edit,
];

export const SubscriptionTypeTableNames = [
  "Title",
  "Months",
  "Downloads per day",
  "Price",
  THead.edit,
];
