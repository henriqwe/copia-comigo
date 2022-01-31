import {MenuItemLevel3} from '../../MenuItemLevel3'

import { useRouter } from 'next/router'

type SubItemProps = {
  item3: {
    title: string
    url: string
    icon: React.ReactChild
  }
}

export function Level3({ item3: { title, icon, url } }: SubItemProps) {
  const router = useRouter()
  const active = router.asPath.includes(url)

  return (
    <MenuItemLevel3
      icon={icon}
      title={title}
      url={url}
      active={active}
    />
  )
}
