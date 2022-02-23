import { useTypedClientMutation } from '&erp/graphql/generated/zeus/apollo'

type UpdateIdentifierProps = {
  Id: string
  Ativo: boolean
}

export async function updateIdentifier({ Id, Ativo }: UpdateIdentifierProps) {
  useTypedClientMutation({
    update_producao_Identificadores_by_pk: [
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
