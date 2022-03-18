export type MenuItem = {
  slug: string;
  name: string;
  subMenu?: Menu;
};

export type Menu = MenuItem[];
