import { useTypedClientMutation } from '&erp/graphql/generated/zeus/apollo'

type UpdateInstallationKitProps = {
  Id: string
  Ativo: boolean
  deleted_at?: Date
}

export async function updateInstallationKit({
  Id,
  Ativo,
  deleted_at = null
}: UpdateInstallationKitProps) {
  useTypedClientMutation({
    update_producao_KitsDeInstalacao_by_pk: [
      {
        pk_columns: { Id },
        _set: {
          Ativo,
          deleted_at
        }
      },
      { Id: true }
    ]
  })
}
