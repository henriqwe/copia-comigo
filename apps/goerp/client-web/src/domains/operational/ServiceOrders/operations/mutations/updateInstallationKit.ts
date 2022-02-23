import { useTypedClientMutation } from '&erp/graphql/generated/zeus/apollo'

type UpdateInstallationKitProps = {
  Id: string
  Ativo: boolean
}

export async function updateInstallationKit({
  Id,
  Ativo
}: UpdateInstallationKitProps) {
  useTypedClientMutation({
    update_producao_KitsDeInstalacao_by_pk: [
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
