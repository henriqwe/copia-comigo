import { useTypedClientMutation } from '&erp/graphql/generated/zeus/apollo'

type UpdateInputKitProps = {
  Id: string
  Ativo: boolean
}

export async function updateInputKit({ Id, Ativo }: UpdateInputKitProps) {
  useTypedClientMutation({
    update_producao_KitsDeInsumo_by_pk: [
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
