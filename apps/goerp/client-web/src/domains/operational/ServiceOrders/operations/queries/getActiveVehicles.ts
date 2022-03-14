import { useTypedClientQuery } from '&erp/graphql/generated/zeus/apollo'

export async function getActiveVehicles(
  Cliente_Id: string,
  Veiculo_Id: string
) {
  const { data } = await useTypedClientQuery({
    clientes_VeiculosAtivos: [
      {
        where: {
          deleted_at: { _is_null: true },
          Cliente_Id: { _eq: Cliente_Id },
          Veiculo_Id: { _eq: Veiculo_Id }
        }
      },
      {
        Id: true,
        Situacao: { Valor: true },
        Combos:[
          { where: { deleted_at: { _is_null: true } }},
          {
            Id: true,
            Combo_Id: true
          }
        ],
        Planos:[
          { where: { deleted_at: { _is_null: true }}},
          {
            Id: true,
            Plano_Id: true
          }
        ],
        Produtos: [
          { where: { deleted_at: { _is_null: true } } },
          {
            Id: true,
            Identificador: true,
            TipoItem_Id: true
          }
        ],
        Servicos: [
          { where: { deleted_at: { _is_null: true } } },
          {
            Id: true,
            Servico_Id: true,
            Beneficio: true,
            VeiculoAtivoCombo_Id: true,
            VeiculoAtivoPlano_Id: true
          }
        ]
      }
    ]
  })

  return data.clientes_VeiculosAtivos
}
