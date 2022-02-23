import { useTypedClientMutation } from '&erp/graphql/generated/zeus/apollo'

type UpdateServiceOrdersProductProps = {
  Id: string
  Identificavel_Id: string,
  TipoDeIdentificavel_Id: string
}

export async function updateServiceOrdersProduct({
  Id,
  Identificavel_Id,
  TipoDeIdentificavel_Id
}: UpdateServiceOrdersProductProps) {
  useTypedClientMutation({
    update_operacional_OrdemDeServico_Produtos_by_pk: [
      {
        pk_columns: { Id },
        _set: {
          Identificavel_Id,
          TipoDeIdentificavel_Id
        }
      },
      { Id: true }
    ]
  })
}
