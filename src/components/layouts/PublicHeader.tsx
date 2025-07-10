import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import SearchBox from "@/components/post/SearchBox"

export default function PublicHeader() {
  return (
    <div>
      <header className="border-b bg-blue-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className="text-xl font-bold">
                  <Link href="/">
                    Blog
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="flex items-center gap-4">
            <SearchBox />
            <Button variant="outline" asChild>
              <Link href="/login">
                Login
              </Link>
            </Button>
            <Button asChild>
              <Link href="/register">
                Register
              </Link>
            </Button>
          </div>
        </div>
      </header>
    </div>
  )
}
