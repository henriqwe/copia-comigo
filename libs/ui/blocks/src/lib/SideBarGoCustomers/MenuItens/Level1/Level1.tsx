import {MenuItemLevel1} from '../../MenuItemLevel1'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useState } from 'react'

type ItemPrincipalProps = {
  item: {
    title: string
    url: string
    icon: React.ReactChild
  }
  children?: React.ReactChild[]
  openMenu:boolean,
  setOpenMenu:Dispatch<SetStateAction<boolean>>

}

export function Level1({
  item: { icon, title, url },
  children,
  openMenu,
  setOpenMenu
}: ItemPrincipalProps) {
  const router = useRouter()
  const [open, setOpen] = useState(router.asPath.includes(url))
  let active = false
  if (router.asPath.split('/').length === 2 && title === 'Início') {
    active = true
  }

  if (router.asPath.split('/').length !== 2 && title !== 'Início') {
    active = router.asPath.includes(url)
  }

  return (
    <MenuItemLevel1
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
    </MenuItemLevel1>
  )
}
