import * as common from '@comigo/ui-common'

export type LogoWithLinkType = {
  url: string
  imageUrl: string
}

export function LogoWithLink({ url, imageUrl }: LogoWithLinkType) {
  return (
    <common.Link to={url} className="flex items-center pt-4 pl-5 intro-x">
      <common.Logo imageUrl={imageUrl} />
    </common.Link>
  )
}
