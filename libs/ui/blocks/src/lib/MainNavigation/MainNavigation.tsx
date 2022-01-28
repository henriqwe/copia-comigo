import { useRouter } from 'next/router'

import * as blocks from '@comigo/ui-blocks'

export function MainNavigation({theme}:{theme:string}) {
  const router = useRouter()
  const company = router.asPath.split('/')[1]
  let imageUrl = '/imagens/logo'

  if ('undefined' != typeof screen) {
    switch (company) {
      case 'assistencia':
        imageUrl = imageUrl + 'Assistencia'
        if (screen.width < 768) {
          imageUrl = imageUrl + 'Curta'
        }
        if (theme === 'dark') {
          imageUrl = imageUrl + 'Dark'
        }
        break
      case 'maxline':
        imageUrl = imageUrl + 'Maxline'
        if (screen.width < 768) {
          imageUrl = imageUrl + 'Curta'
        }
        if (theme === 'dark') {
          imageUrl = imageUrl + 'Dark'
        }
        break
      default:
        imageUrl = imageUrl + 'Rastreamento'
        if (screen.width < 768) {
          imageUrl = imageUrl + 'Curta'
        }
        if (theme === 'dark') {
          imageUrl = imageUrl + 'Dark'
        }
    }
    imageUrl = imageUrl + '.png'
    // FIXME resolver tipagem do objeto do company
    return (
      <blocks.SideBar
        mainMenuItens={blocks.MainMenuItens[company]}
        imageUrl={imageUrl}
      />
    )
  }
  return <></>
}
