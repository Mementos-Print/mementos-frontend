export interface SidebarProps{
    name: string,
    icon: React.ReactNode,
    to: string,
    onClick:()=> void
}
export interface AvailableEventProps{
    name: string,
    type: string,
    image: string
}
export interface LibraryProps{
    name: string,
    date_created: string,
    image: string
}