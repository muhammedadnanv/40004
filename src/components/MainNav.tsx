import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";

export function MainNav() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink to="/">Home</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Programs</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-4 w-[400px]">
              <NavigationMenuLink to="/programs/frontend">Frontend Development</NavigationMenuLink>
              <NavigationMenuLink to="/programs/lowcode">Low-Code Development</NavigationMenuLink>
              <NavigationMenuLink to="/programs/nocode">No-Code Development</NavigationMenuLink>
              <NavigationMenuLink to="/programs/fullstack">Full Stack Development</NavigationMenuLink>
              <NavigationMenuLink to="/programs/manychat">ManyChat Automation</NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink to="/certification">Certification</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink to="/partnerships">Partnerships</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink to="/cms">CMS</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}