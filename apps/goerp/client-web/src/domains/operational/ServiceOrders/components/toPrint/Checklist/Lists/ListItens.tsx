import * as common from '@comigo/ui-common'

export function ListItens({
  title,
  subtitle
}: {
  title: string
  subtitle: string
}) {
  return (
    <div className={`flex items-center space-x-2 text-xs`}>
      <div>
        <common.icons.AuthorizationIcon />
      </div>
      {!(subtitle == '') && (
        <>
          <span>{subtitle}</span>
          <span> - </span>
        </>
      )}

      <span>{title}</span>
    </div>
  )
}
