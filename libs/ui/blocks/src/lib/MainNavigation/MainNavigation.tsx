import * as blocks from '@comigo/ui-blocks'

type MainNavigationProps={
  mainMenuItens:any
  rotas: any
}

export function MainNavigation({ mainMenuItens,rotas}:MainNavigationProps) {

  if ('undefined' != typeof screen) {
    // FIXME resolver tipagem do objeto do company
    return (
      <blocks.SideBar
        mainMenuItens={mainMenuItens}
        imageUrl={'/imagens/logo.png'}
        rotas={rotas}
      />
    )
  }
  return <></>
}
