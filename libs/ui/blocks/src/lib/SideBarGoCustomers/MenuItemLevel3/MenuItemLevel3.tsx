import * as common from '@comigo/ui-common'
import { ReactChild } from 'react'

type ItemNivel3 = {
  title: string
  url: string
  icon: ReactChild
  active?: boolean
}

export function MenuItemLevel3({ title, url, icon, active }: ItemNivel3) {
  return (
    <li>
      <common.Link
        to={url}
        className={`side-menu ${active && 'side-menu--active'}`}
      >
        <div className="side-menu__icon">{icon}</div>
        <div className="side-menu__title"> {title} </div>
      </common.Link>
    </li>
  )
}
