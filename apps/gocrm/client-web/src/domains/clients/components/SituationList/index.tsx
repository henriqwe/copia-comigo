import * as common from '@comigo/ui-common'

type SituationListProps = {
  listName: string
  itens: {
    title: string
    complete: boolean
  }[]
}

export function SituationList({ listName, itens }: SituationListProps) {
  return (
    <div className="mb-2">
      <p className="font-bold">{listName}:</p>
      {itens.map((item, index) => (
        <div className="flex" key={index}>
          {item.complete ? (
            <common.icons.AuthorizationIcon />
          ) : (
            <common.icons.CloseIcon className="w-5 h-5 text-danger" />
          )}
          <p>{item.title}</p>
        </div>
      ))}
    </div>
  )
}
