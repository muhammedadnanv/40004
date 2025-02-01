import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { MobileNav } from "./MobileNav";

export function MainNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <MobileNav />
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink 
                className="hover:text-primary transition-colors"
                href="/"
              >
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Programs</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-4 w-[400px] lg:w-[500px]">
                  <NavigationMenuLink href="/programs/frontend">Frontend Development</NavigationMenuLink>
                  <NavigationMenuLink href="/programs/lowcode">Low-Code Development</NavigationMenuLink>
                  <NavigationMenuLink href="/programs/nocode">No-Code Development</NavigationMenuLink>
                  <NavigationMenuLink href="/programs/fullstack">Full Stack Development</NavigationMenuLink>
                  <NavigationMenuLink href="/programs/manychat">ManyChat Automation</NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink 
                className="hover:text-primary transition-colors"
                href="/certification"
              >
                Certification
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink 
                className="hover:text-primary transition-colors"
                href="/partnerships"
              >
                Partnerships
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink 
                className="hover:text-primary transition-colors"
                href="/cms"
              >
                CMS
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}