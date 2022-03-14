import { useTypedClientQuery } from '&crm/graphql/generated/zeus/apollo'
import { ActiveVehicleDataType } from '&crm/domains/Proposals/types/activeVehicle'

export const getActiveVehicleById: (
  Veiculo_Id: string,
  ativo?: boolean
) => Promise<ActiveVehicleDataType[]> = async (
  Veiculo_Id: string,
  ativo = true
) => {
  const { data } = await useTypedClientQuery({
    clientes_VeiculosAtivos: [
      {
        where: {
          deleted_at: { _is_null: true },
          Veiculo_Id: { _eq: Veiculo_Id }
          // Situacao: { Valor: { _eq: 'ativo' } }
        }
      },
      {
        Id: true,
        Cliente_Id: true,
        Franquia_Id: true,
        OS_Id: true,
        Situacao: {
          Valor: true
        },
        Combos:[
          { where: { deleted_at: { _is_null: true }, Ativo: { _eq: ativo } }},
          {
            Id: true,
            Ativo: true,
            ComboPreco_Id: true,
            Combo_Id: true
          }
        ],
        Planos:[
          { where: { deleted_at: { _is_null: true }, Ativo: { _eq: ativo } }},
          {
            Id: true,
            Ativo: true,
            PlanoPreco_Id: true,
            Plano_Id: true,
            VeiculoAtivoCombo_Id: true
          }
        ],
        Produtos: [
          { where: { deleted_at: { _is_null: true }, Ativo: { _eq: ativo } } },
          {
            Id: true,
            Ativo: true,
            Produto_Id: true,
            PrecoDeAdesao_Id: true,
            PrecoDeRecorrencia_Id: true,
            Identificador: true,
            TipoItem_Id: true,
            VeiculoAtivoCombo_Id: true,
            VeiculoAtivoPlano_Id: true
          }
        ],
        Servicos: [
          { where: { deleted_at: { _is_null: true }, Ativo: { _eq: ativo } } },
          {
            Id: true,
            Beneficio: true,
            Ativo: true,
            Servico_Id: true,
            PrecoDeAdesao_Id: true,
            PrecoDeRecorrencia_Id: true,
            VeiculoAtivoCombo_Id: true,
            VeiculoAtivoPlano_Id: true
          }
        ]
      }
    ]
  })
  return data.clientes_VeiculosAtivos
}
