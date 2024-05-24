"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from 'clsx';
import { Settings } from "lucide-react";




const links = [
  { 
    name: 'Home', 
    href: '/dashboard', 
    icon: HomeIcon 
  },
  { 
    name: 'Analisis', 
    href: '/dashboard/analytics', 
    icon: LineChartIcon 
  },
  {
    name: "Configuracion",
    href:"/dashboard/settings",
    icon: Settings
  }
];

export function NavLinks () {
    const pathname = usePathname();
    return (
        <>
        {links.map((link) => {
            const LinkIcon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={clsx(
                  'flex items-center gap-3 rounded-lg px-3 py-2 transition-all',
                  {
                    'text-gray-500 hover:text-gray-900': pathname !== link.href,
                    'bg-gray-100 text-gray-900 hover:text-gray-900': pathname === link.href,
                  },
                )}
              >
                <LinkIcon className="h-4 w-4" />
                {link.name}
              </Link>
            );
          })}
        </>
    )
}

function HomeIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    )
  }

  
  
  function LineChartIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 3v18h18" />
        <path d="m19 9-5 5-4-4-3 3" />
      </svg>
    )
  }
  

  