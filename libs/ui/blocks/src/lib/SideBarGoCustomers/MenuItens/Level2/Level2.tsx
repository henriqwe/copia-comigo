import {MenuItemLevel2} from '../../MenuItemLevel2'

import { useRouter } from 'next/router'
import { Dispatch, ReactChild, ReactNode, SetStateAction, useState } from 'react'

type SubItemProps = {
  subitem: {
    title: string
    url: string
    icon: ReactChild
  }
  children: ReactNode
  openMenu:boolean
  setOpenMenu:Dispatch<SetStateAction<boolean>>

}

export function Level2({
  subitem: { title, icon, url },
  children,
  openMenu,
  setOpenMenu
}: SubItemProps) {
  const router = useRouter()
  const [open, setOpen] = useState(router.asPath.includes(url))
  const active = router.asPath.includes(url)
  return (
    <MenuItemLevel2
      icon={icon}
      title={title}
      url={url}
      active={active}
      open={open}
      setOpen={setOpen}
      openMenu={openMenu}
      setOpenMenu={setOpenMenu}
    >
      {children}
    </MenuItemLevel2>
  )
}
