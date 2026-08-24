import { SidebarProvider, SidebarTrigger, Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"
import { LayoutDashboard, Layers, BarChart3, Folder, Users, Database, FileText, Settings, HelpCircle, Search } from "lucide-react"
import Link from "next/link"

export default function AdminLayout({ children }) {
  return (
    <SidebarProvider className="dark bg-zinc-950 text-zinc-50 min-h-screen flex w-full">
      <Sidebar className="border-r border-zinc-800 bg-zinc-900 text-zinc-300">
        <SidebarHeader className="p-4 font-bold text-lg text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-white text-black flex items-center justify-center font-black text-xs">A</div>
            <span>Acme Inc.</span>
          </div>
        </SidebarHeader>

        <SidebarContent className="px-2">
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="bg-zinc-800 text-white font-medium">
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton><Layers className="h-4 w-4" /><span>Lifecycle</span></SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton><BarChart3 className="h-4 w-4" /><span>Analytics</span></SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton><Folder className="h-4 w-4" /><span>Projects</span></SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton><Users className="h-4 w-4" /><span>Team</span></SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel className="text-zinc-500 font-medium">Documents</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton><Database className="h-4 w-4" /><span>Data Library</span></SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton><FileText className="h-4 w-4" /><span>Reports</span></SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="p-4 border-t border-zinc-800 space-y-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton><Settings className="h-4 w-4" /><span>Settings</span></SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton><HelpCircle className="h-4 w-4" /><span>Get Help</span></SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <div className="pt-2 flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-zinc-700 flex items-center justify-center text-xs font-bold">S</div>
            <div className="text-xs">
              <p className="font-semibold text-white">shadcn</p>
              <p className="text-zinc-500">m@example.com</p>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>

      <div className="flex-1 flex flex-col min-w-0 bg-zinc-950 text-zinc-100">
        <header className="h-14 border-b border-zinc-800 px-4 flex items-center justify-between">
          <SidebarTrigger />
          <Link href="/" className="text-xs text-zinc-400 hover:text-white">← На сайт</Link>
        </header>
        <main className="p-6 flex-1 overflow-y-auto">{children}</main>
      </div>
    </SidebarProvider>
  )
}