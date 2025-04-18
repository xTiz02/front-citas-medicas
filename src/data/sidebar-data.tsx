import { NavGroup } from '@/model/types'
import { MdDashboard } from "react-icons/md";

  
export const sidebarData: NavGroup[] = [
      {
        title: 'General',
        items: [
          {
            title: 'Dashboard',
            url: '/',
            icon: MdDashboard,
          },
          {
            title: 'Calendario ',
            url: '/calendario',
            icon: MdDashboard,
          },
          {
            title: 'Pacientes',
            icon: MdDashboard,
            items: [
              {
                title: 'Filtrar',
                url: '/paciente/filtrar',
              },
              {
                title: 'Nuevo',
                url: '/paciente/registrar',
              }
            ],
          },
          // {
          //   title: 'Consultas',
          //   url: '/chats',
          //   badge: '3',
          //   icon: MdDashboard,
          // },
          {
            title: 'Consultas',
            url: '/users',
            icon: MdDashboard,
          },
        ],
      },
      // {
      //   title: 'Gestión',
      //   items: [
      //     {
      //       title: 'Horarios',
      //       url: '/users',
      //       icon: MdDashboard
      //     },
      //     {
      //       title: 'Historial Médico',
      //       icon: MdDashboard,
      //       items: [
      //         {
      //           title: 'Ver',
      //           url: '/sign-in',
      //         },
      //         {
      //           title: 'Nuevo',
      //           url: '/sign-in-2',
      //         },
              
      //       ],
      //     },
          
      //   ],
      // },
      {
        title: 'Otros',
        items: [
          // {
          //   title: 'Settings',
          //   icon: MdDashboard,
          //   items: [
          //     {
          //       title: 'Profile',
          //       url: '/settings',
          //       icon: MdDashboard,
          //     },
          //     {
          //       title: 'Account',
          //       url: '/settings/account',
          //       icon: MdDashboard,
          //     },
          //     {
          //       title: 'Appearance',
          //       url: '/settings/appearance',
          //       icon: MdDashboard,
          //     },
          //     {
          //       title: 'Notifications',
          //       url: '/settings/notifications',
          //       icon: MdDashboard,
          //     },
          //     {
          //       title: 'Display',
          //       url: '/settings/display',
          //       icon: MdDashboard,
          //     },
          //   ],
          // },
          {
            title: 'Usuarios',
            url: '/usuarios',
            icon: MdDashboard,
          },
          {
            title: 'Médicos',
            url: '/medicos',
            icon: MdDashboard,
          },
          {
            title: 'Auditoria',
            url: '/examenes',
            icon: MdDashboard,
          },
          
        ],
      },
    ]