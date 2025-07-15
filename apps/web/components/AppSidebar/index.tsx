import {
  Bird,
  Cat,
  ChevronDown,
  Clock,
  CreditCard,
  Dog,
  Fish,
  Gift,
  Heart,
  Home,
  LogOut,
  MapPin,
  Phone,
  Rabbit,
  Scissors,
  Search,
  Settings,
  ShoppingCart,
  Star,
  Stethoscope,
  Truck,
  User,
} from "lucide-react"
import type * as React from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"

// Navigation data for the pet shop
const navigationData = {
  main: [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "Shop",
      url: "/shop",
      icon: ShoppingCart,
      badge: "New",
      items: [
        { title: "All Products", url: "/shop/all" },
        { title: "Best Sellers", url: "/shop/bestsellers" },
        { title: "Sale Items", url: "/shop/sale" },
        { title: "New Arrivals", url: "/shop/new" },
      ],
    },
  ],
  petCategories: [
    {
      title: "Dogs",
      url: "/pets/dogs",
      icon: Dog,
      items: [
        { title: "Dog Food", url: "/pets/dogs/food" },
        { title: "Toys & Treats", url: "/pets/dogs/toys" },
        { title: "Collars & Leashes", url: "/pets/dogs/accessories" },
        { title: "Beds & Furniture", url: "/pets/dogs/furniture" },
        { title: "Health & Grooming", url: "/pets/dogs/health" },
      ],
    },
    {
      title: "Cats",
      url: "/pets/cats",
      icon: Cat,
      items: [
        { title: "Cat Food", url: "/pets/cats/food" },
        { title: "Litter & Boxes", url: "/pets/cats/litter" },
        { title: "Toys & Scratchers", url: "/pets/cats/toys" },
        { title: "Beds & Trees", url: "/pets/cats/furniture" },
        { title: "Health & Grooming", url: "/pets/cats/health" },
      ],
    },
    {
      title: "Fish & Aquatic",
      url: "/pets/fish",
      icon: Fish,
      items: [
        { title: "Fish Food", url: "/pets/fish/food" },
        { title: "Aquariums", url: "/pets/fish/tanks" },
        { title: "Filters & Pumps", url: "/pets/fish/equipment" },
        { title: "Decorations", url: "/pets/fish/decor" },
      ],
    },
    {
      title: "Birds",
      url: "/pets/birds",
      icon: Bird,
      items: [
        { title: "Bird Food", url: "/pets/birds/food" },
        { title: "Cages", url: "/pets/birds/cages" },
        { title: "Toys & Perches", url: "/pets/birds/toys" },
        { title: "Health Care", url: "/pets/birds/health" },
      ],
    },
    {
      title: "Small Pets",
      url: "/pets/small",
      icon: Rabbit,
      items: [
        { title: "Food & Treats", url: "/pets/small/food" },
        { title: "Cages & Habitats", url: "/pets/small/habitats" },
        { title: "Bedding", url: "/pets/small/bedding" },
        { title: "Toys & Accessories", url: "/pets/small/accessories" },
      ],
    },
  ],
  services: [
    {
      title: "Pet Grooming",
      url: "/services/grooming",
      icon: Scissors,
    },
    {
      title: "Veterinary Care",
      url: "/services/vet",
      icon: Stethoscope,
    },
    {
      title: "Pet Training",
      url: "/services/training",
      icon: Star,
    },
    {
      title: "Pet Boarding",
      url: "/services/boarding",
      icon: Home,
    },
  ],
  account: [
    {
      title: "Wishlist",
      url: "/wishlist",
      icon: Heart,
      badge: "3",
    },
    {
      title: "Orders",
      url: "/orders",
      icon: Truck,
    },
    {
      title: "Rewards",
      url: "/rewards",
      icon: Gift,
    },
    {
      title: "Payment Methods",
      url: "/payment",
      icon: CreditCard,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-orange-500 text-white">
                  <Dog className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">PawPerfect</span>
                  <span className="truncate text-xs text-muted-foreground">Pet Shop</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <form>
          <SidebarGroup className="py-0">
            <SidebarGroupContent className="relative">
              <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
              <SidebarInput placeholder="Search products..." className="pl-8" />
            </SidebarGroupContent>
          </SidebarGroup>
        </form>
      </SidebarHeader>

      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationData.main.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto">
                          {item.badge}
                        </Badge>
                      )}
                    </a>
                  </SidebarMenuButton>
                  {item.items?.length ? (
                    <SidebarMenuSub>
                      {item.items.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <a href={subItem.url}>{subItem.title}</a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  ) : null}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Pet Categories */}
        <SidebarGroup>
          <SidebarGroupLabel>Shop by Pet</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationData.petCategories.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                  {item.items?.length ? (
                    <SidebarMenuSub>
                      {item.items.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <a href={subItem.url}>{subItem.title}</a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  ) : null}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Services */}
        <SidebarGroup>
          <SidebarGroupLabel>Services</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationData.services.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Account */}
        <SidebarGroup>
          <SidebarGroupLabel>My Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationData.account.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto">
                          {item.badge}
                        </Badge>
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Store Info */}
        <SidebarGroup>
          <SidebarGroupLabel>Store Info</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/contact">
                    <Phone />
                    <span>(555) 123-PETS</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/location">
                    <MapPin />
                    <span>Find Our Store</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/hours">
                    <Clock />
                    <span>Store Hours</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback className="rounded-lg">JD</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">John Doe</span>
                    <span className="truncate text-xs text-muted-foreground">john@example.com</span>
                  </div>
                  <ChevronDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}