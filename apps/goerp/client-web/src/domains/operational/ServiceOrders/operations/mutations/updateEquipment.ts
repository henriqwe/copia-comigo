import { useTypedClientMutation } from '&erp/graphql/generated/zeus/apollo'

type UpdateEquipmentProps = {
  Id: string
  Ativo: boolean
}

export async function updateEquipment({ Id, Ativo }: UpdateEquipmentProps) {
  useTypedClientMutation({
    update_producao_Equipamentos_by_pk: [
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
