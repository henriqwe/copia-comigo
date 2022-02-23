import { useTypedClientMutation } from '&erp/graphql/generated/zeus/apollo'

type UpdateTrackerProps = {
  Id: string
  Ativo: boolean
}

export async function updateTracker({ Id, Ativo }: UpdateTrackerProps) {
  useTypedClientMutation({
    update_producao_Rastreadores_by_pk: [
      {
        pk_columns: { Id },
        _set: {
          Ativo
        }
      },
      { Id: true }
    ]
  })
}
