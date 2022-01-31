import * as blocks from '@comigo/ui-blocks'

type MainNavigationProps = {
  mainMenuItens: any
  rotas: any
  imageUrl: string
}

export function MainNavigation({ mainMenuItens, rotas, imageUrl }: MainNavigationProps) {

  if ('undefined' != typeof screen) {
    // FIXME resolver tipagem do objeto do company
    return (
      <blocks.SideBar
        mainMenuItens={mainMenuItens}
        imageUrl={imageUrl}
        rotas={rotas}
      />
    )
  }
  return <div />
}
