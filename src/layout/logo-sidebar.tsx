import { ChevronsUpDown, Plus } from 'lucide-react'
import { CiMedicalClipboard } from "react-icons/ci";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'


function LogoSidebar() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
                <CiMedicalClipboard className='size-4' />
              </div>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-semibold'>
                  Sistema Médico
                </span>
                <span className='truncate text-xs'>Clínica @</span>
              </div>
              <ChevronsUpDown className='ml-auto' />
            </SidebarMenuButton>
          
          
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

export default LogoSidebar