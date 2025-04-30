import { Home, Video, CreditCard, Settings, PlusCircle } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Menu items
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "My Videos",
    url: "/dashboard/my-videos",
    icon: Video,
  },
  {
    title: "Billing",
    url: "/dashboard/billing",
    icon: CreditCard,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    <Sidebar className="bg-background border-r">
      <SidebarHeader className="p-4 border-b">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold">ReelMeIn</h1>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-4">
        <div className="mb-6">
          <Button className="w-full" size="lg" asChild>
            <Link href="/dashboard/create-ad" className="flex items-center gap-2">
              <PlusCircle className="h-5 w-5" />
              <span>Create Ad</span>
            </Link>
          </Button>
        </div>
        <SidebarGroup className="space-y-6">
          <SidebarGroupLabel className="text-sm font-medium text-muted-foreground">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="w-full">
                    <Link 
                      href={item.url} 
                      className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="text-sm font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
} 