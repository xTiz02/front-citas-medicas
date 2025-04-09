import { LinkProps } from "react-router-dom"


  
  
  interface BaseNavItem {
    title: string
    badge?: string
    icon?: React.ElementType
  }
  
  type NavLink = BaseNavItem & {
    url: LinkProps['to']
    items?: never
  }
  
  type NavCollapsible = BaseNavItem & {
    items: (BaseNavItem & { url: LinkProps['to'] })[]
    url?: never
  }
  
  type NavItem = NavCollapsible | NavLink
  
  interface NavGroup {
    title: string
    items: NavItem[]
  }


interface Patient {
    id: string
    name: string
    age: number
    gender: string
    phone: string
    email: string
    address: string
    status: string
    dateOfBirth: string
    city : string,
    state : string,
    zipCode : string,
    lastConsultation: string
    primaryPhysician?: string
    medicalConditions?: string
    allergies?: string
    insuranceProvider?: string
    policyNumber?: string
  }
  

  
  export type {NavGroup, NavItem, NavCollapsible, NavLink, Patient}