import * as blocks from '@comigo/ui-blocks'
import { useRouter } from 'next/router'
import { useState } from 'react'

type ItemPrincipalProps = {
  item: {
    title: string
    url: string
    icon: React.ReactChild
  }
  children?: React.ReactChild[]
}

export function Level1({
  item: { icon, title, url },
  children
}: ItemPrincipalProps) {
  const router = useRouter()
  const [open, setOpen] = useState(router.asPath.includes(url))
  let active = false

  if (router.asPath === '/' && title === 'Início') {
    active = true
  }

  if (router.asPath !== '/' && title !== 'Início') {
    active = router.asPath.includes(url)
  }

  return (
    <blocks.MenuItemLevel1
      icon={icon}
      title={title}
      url={url}
      active={active}
      open={open}
      setOpen={setOpen}
    >
      {children}
    </blocks.MenuItemLevel1>
  )
}
