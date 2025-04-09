import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "./app-sidebar"
import Header from "./header"
import ThemeSwitch from "@/components/otros/theme-switch"
import ProfileDropdown from "@/components/otros/profile-dropdown"
import {sidebarData} from '@/data/sidebar-data';
import Main from "./main"

export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <SidebarProvider>
      <AppSidebar navGroups={sidebarData}/>
      <div className="flex flex-col w-full">
        <Header>
          <div className='ml-auto flex items-center gap-6 '>
            <ThemeSwitch />
            <ProfileDropdown />
          </div>
        </Header>
        <Main>
          {children}
        </Main>
      </div>
    </SidebarProvider>
  )
}
