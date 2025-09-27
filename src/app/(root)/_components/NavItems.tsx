"use client";

import React from 'react'
import {NAV_ITEMS} from "@/lib/constants";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {usePathname} from "next/navigation";

const NavItems = () => {

  const pathName = usePathname();

  const isActive = (path: string) => {
    if(path === "/") return pathName === "/";
    return pathName.startsWith(path);
  }



  return (
    <ul className="flex flex-col sm:flex-row p-2 gap-3 sm:gap-10 font-medium">
      {NAV_ITEMS.map(({href,label}, index) => (
        <li key={index}>
          <Link href={href} className={cn("hover:text-yellow-500 transition-colors", isActive(href) ? "text-gray-100" : "")}>
            {label}
          </Link>
        </li>
      ))}
    </ul>
  )
}
export default NavItems
