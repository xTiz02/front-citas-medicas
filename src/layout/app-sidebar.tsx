import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
  } from '@/components/ui/sidebar'
import LogoSidebar from './logo-sidebar'
import { NavGroup } from '@/model/types'
import { NavLinkGroup } from './nav-link-group'
  
  export function AppSidebar( {navGroups} : {navGroups:NavGroup[]} ) {
    return (
      <Sidebar collapsible='icon' variant='floating'>
        <SidebarHeader>
          <LogoSidebar  />
        </SidebarHeader>
        <SidebarContent>
          {navGroups.map((props) => (
            <NavLinkGroup key={props.title} {...props} />
          ))}
        </SidebarContent>
        <SidebarFooter>
          {/* <NavUser user={sidebarData.user} /> */}
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    )
  }