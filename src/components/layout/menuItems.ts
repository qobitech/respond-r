import { url } from "enums/Route"

interface IMenuItems {
  title: string
  url: string
  cName: string
  icon?: string
}
export const MenuItems: Array<IMenuItems> = [
  {
    title: "Home",
    url: url.LANDING_PAGE,
    cName: "nav-links",
    icon: "fa fa-home",
  },
  {
    title: "Login",
    url: url.LOGIN,
    cName: "nav-links",
    icon: "fa fa-user",
  },
  // {
  //     title: 'How To',
  //     url: url.INSTRUCTIONS,
  //     cName: 'nav-links',
  //     icon: 'fas fa-directions'
  // },
]
