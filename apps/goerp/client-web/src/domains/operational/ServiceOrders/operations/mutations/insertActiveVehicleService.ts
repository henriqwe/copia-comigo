import { useTypedClientMutation } from '&erp/graphql/generated/zeus/apollo'

type InsertActiveVehicleServiceProps = {
  PrecoDeAdesao_Id: string
  PrecoDeRecorrencia_Id: string
  Servico_Id: string
  VeiculoAtivo_Id: string
  Beneficio: boolean
}


export async function insertActiveVehicleService({
  PrecoDeAdesao_Id,
  PrecoDeRecorrencia_Id,
  Servico_Id,
  VeiculoAtivo_Id,
  Beneficio
}: InsertActiveVehicleServiceProps) {
  useTypedClientMutation({
    insert_clientes_VeiculosAtivos_Servicos_one: [
      {
        object: {
          PrecoDeAdesao_Id,
          PrecoDeRecorrencia_Id,
          Servico_Id,
          VeiculoAtivo_Id,
          Beneficio,
          DataDeAtivacao: new Date(),
          Ativo: true
        }
      },
      {
        Id: true
      }
    ]
  })
}
