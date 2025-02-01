import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavigationMenu, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <nav className="flex flex-col gap-4">
          <NavigationMenu>
            <NavigationMenuLink 
              className="block px-2 py-1 text-lg hover:text-primary"
              onClick={() => setIsOpen(false)}
              href="/"
            >
              Home
            </NavigationMenuLink>
            <NavigationMenuLink 
              className="block px-2 py-1 text-lg hover:text-primary"
              onClick={() => setIsOpen(false)}
              href="/programs"
            >
              Programs
            </NavigationMenuLink>
            <NavigationMenuLink 
              className="block px-2 py-1 text-lg hover:text-primary"
              onClick={() => setIsOpen(false)}
              href="/certification"
            >
              Certification
            </NavigationMenuLink>
            <NavigationMenuLink 
              className="block px-2 py-1 text-lg hover:text-primary"
              onClick={() => setIsOpen(false)}
              href="/partnerships"
            >
              Partnerships
            </NavigationMenuLink>
          </NavigationMenu>
        </nav>
      </SheetContent>
    </Sheet>
  );
}