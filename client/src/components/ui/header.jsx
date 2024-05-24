
import { Button } from "@/components/ui/button"

import { SheetTrigger, SheetTitle, SheetHeader, SheetContent, Sheet } from "@/components/ui/sheet"

import { Search } from "./search"
import { UserDropMenu } from "./user"
import { NavLinks } from "./navlinks"

export default function Header ({title}) {
    return (
      <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6">
      <Sheet>
          <SheetTrigger asChild>
          <Button className="lg:hidden" size="icon" variant="ghost">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader >
              <SheetTitle>{title}</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-2">
             <NavLinks></NavLinks>
            </div>
          </SheetContent>
      </Sheet>
        <div className="flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
      <Search></Search>
        <UserDropMenu></UserDropMenu>
        </div>
      </header>


    )
}

  



function MenuIcon(props) {
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
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}


