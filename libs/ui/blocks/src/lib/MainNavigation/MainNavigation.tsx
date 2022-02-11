import * as blocks from '@comigo/ui-blocks'

type MainNavigationProps = {
  MainMenuItems: any
  rotas: any
  imageUrl: string
}

export function MainNavigation({
  MainMenuItems,
  rotas,
  imageUrl
}: MainNavigationProps) {
  return (
    <blocks.SideBar
      MainMenuItems={MainMenuItems}
      imageUrl={imageUrl}
      rotas={rotas}
    />
  )
}
