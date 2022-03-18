import {
  ChevronDownIcon,
  ChevronRightIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/outline";
import Link from "next/link";
import React, { FC, useMemo, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { menu } from "@/data";
import { useRouter } from "next/router";
import { Menu, MenuItem } from "@/types";

type Props = {};
const NavBar: FC<Props> = () => {
  const { darkMode, setDarkMode } = useTheme();
  return (
    <nav className="sticky top-0 left-0 right-0 z-30 h-14 w-full flex flex-row gap-8 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 items-center px-4 md:px-8 border-b border-gray-100 dark:border-gray-800">
      <Link href="/">
        <a className="text-xl font-medium">devisawesome</a>
      </Link>

      <ul className="flex-1 flex flex-row gap-6 items-center">
        {menu.map((menuItem) => (
          <MenuItem item={menuItem} key={menuItem.slug} />
        ))}
      </ul>

      <div className="flex items-center gap-4 justify-end">
        <IconButton
          Icon={darkMode ? MoonIcon : SunIcon}
          name="Toggle Dark Mode"
          onClick={() => {
            setDarkMode(!darkMode);
          }}
        />
      </div>
    </nav>
  );
};

export default NavBar;

const MenuItem = ({ item }: { item: MenuItem }) => {
  const [showSubMenu, setShowSubMenu] = useState(false);
  const haveSubMenu = useMemo(
    () => item.subMenu && item.subMenu.length > 0,
    [item]
  );
  const router = useRouter();

  return (
    <li
      className="relative"
      onMouseEnter={() => setShowSubMenu(true)}
      onMouseLeave={() => setShowSubMenu(false)}
    >
      <Link href={item.slug}>
        <a
          className={`py-2  flex items-center gap-2 ${
            router.asPath === item.slug
              ? "text-gray-900 dark:text-gray-100"
              : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          }`}
        >
          {item.name}
          {haveSubMenu && <ChevronDownIcon className="w-4 h-4" />}
        </a>
      </Link>

      {haveSubMenu && showSubMenu && (
        <div className="absolute top-full left-0 z-10">
          <SubMenu subMenu={item.subMenu} />
        </div>
      )}
    </li>
  );
};

const SubMenu = ({ subMenu }: { subMenu: Menu }) => {
  return (
    <ul className="bg-white dark:bg-gray-800 shadow-xl min-w-[180px] max-w-[320px] text-left py-2 z-20">
      {subMenu.map((subMenuItem) => (
        <SubMenuItem item={subMenuItem} key={subMenuItem.name} />
      ))}
    </ul>
  );
};

const SubMenuItem = ({ item }: { item: MenuItem }) => {
  const [showSubMenu, setShowSubMenu] = useState(false);

  const haveSubMenu = useMemo(
    () => item.subMenu && item.subMenu.length > 0,
    [item]
  );
  return (
    <li
      className="relative"
      onMouseEnter={() => setShowSubMenu(true)}
      onMouseLeave={() => setShowSubMenu(false)}
    >
      <Link href={item.slug}>
        <a className="py-2 px-4 flex justify-between items-center hover:opacity-100 opacity-70 truncate hover:bg-gray-100 dark:hover:bg-gray-600 gap-4">
          <p className="flex-1 truncate">{item.name}</p>
          {haveSubMenu && <ChevronRightIcon className="w-4 h-4" />}
        </a>
      </Link>

      {haveSubMenu && showSubMenu && (
        <div className="absolute left-full -top-3">
          <SubMenu subMenu={item.subMenu} />
        </div>
      )}
    </li>
  );
};

const IconButton = ({
  Icon,
  name,
  onClick,
}: {
  Icon: (props: React.ComponentProps<"svg">) => JSX.Element;
  name?: string;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      title={name}
      className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      <Icon className="w-6 h-6" />
    </button>
  );
};
