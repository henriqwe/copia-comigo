import { QueryType } from '&crm/domains/Proposals/types/query'
import { useTypedClientMutation } from '&crm/graphql/generated/zeus/apollo'
import { clientes_VeiculosAtivos_Situacao_enum, propostas_Propostas_Situacoes_enum } from '&crm/graphql/generated/zeus'
import { Benefits } from '../types/benefits'

export async function acceptProposal(query: QueryType) {
  await useTypedClientMutation({
    update_propostas_Propostas_by_pk: [
      {
        pk_columns: { Id: query.id },
        _set: {
          Situacao_Id: propostas_Propostas_Situacoes_enum.aceito,
          DataAceito: new Date(),
          updated_at: new Date()
        }
      },
      {
        Id: true
      }
    ]
  })
}


export async function updateActiveVehicleBenefit(
  query: QueryType,
  variables: {
    Id: string
    PortfolioPreco_Id: string
    PrecoDeAdesao_Id: string
    PrecoDeRecorrencia_Id: string
  }
) {
  await useTypedClientMutation({
    update_clientes_VeiculosAtivos_Beneficios_by_pk: [
      {
        pk_columns: { Id: variables.Id },
        _set: {
          PortfolioPreco_Id: variables.PortfolioPreco_Id,
          PrecoDeAdesao_Id: variables.PrecoDeAdesao_Id,
          PrecoDeRecorrencia_Id: variables.PrecoDeRecorrencia_Id
        }
      },
      {
        Id: true
      }
    ]
  })
}

export async function createActiveVehicleBenefit(variables: {
  Portfolio_Id: string
  PortfolioPreco_Id: string
  PrecoDeAdesao_Id: string
  PrecoDeRecorrencia_Id: string
  TipoPortfolio: string
  VeiculoAtivo_Id: string
}) {
  await useTypedClientMutation({
    insert_clientes_VeiculosAtivos_Beneficios_one: [
      {
        object: {
          Ativo: true,
          Portfolio_Id: variables.Portfolio_Id,
          PortfolioPreco_Id: variables.PortfolioPreco_Id,
          PrecoDeAdesao_Id: variables.PrecoDeAdesao_Id,
          PrecoDeRecorrencia_Id: variables.PrecoDeRecorrencia_Id,
          TipoPortfolio: variables.TipoPortfolio,
          VeiculoAtivo_Id: variables.VeiculoAtivo_Id
        }
      },
      {
        Id: true
      }
    ]
  })
}

export async function createActiveVehicleProduct(variables: {
  VeiculoAtivo_Id: string
  Produto_Id: string
  PrecoDeAdesao_Id: string
  PrecoDeRecorrencia_Id: string
  TipoItem_Id?: string,
  Identificador?: string
}) {
  await useTypedClientMutation({
    insert_clientes_VeiculosAtivos_Produtos_one: [
      {
        object: {
          Ativo: true,
          VeiculoAtivo_Id: variables.VeiculoAtivo_Id,
          PrecoDeAdesao_Id: variables.PrecoDeAdesao_Id,
          PrecoDeRecorrencia_Id: variables.PrecoDeRecorrencia_Id,
          Produto_Id: variables.Produto_Id,
          TipoItem_Id: variables.TipoItem_Id,
          Identificador: variables.Identificador
        }
      },
      {
        Id: true
      }
    ]
  })
}

export async function createActiveVehicleService(variables: {
  VeiculoAtivo_Id: string
  PrecoDeAdesao_Id: string
  PrecoDeRecorrencia_Id: string
  Servico_Id: string
}) {
  await useTypedClientMutation({
    insert_clientes_VeiculosAtivos_Servicos_one: [
      {
        object: {
          Ativo: true,
          VeiculoAtivo_Id: variables.VeiculoAtivo_Id,
          PrecoDeAdesao_Id: variables.PrecoDeAdesao_Id,
          PrecoDeRecorrencia_Id: variables.PrecoDeRecorrencia_Id,
          Servico_Id: variables.Servico_Id
        }
      },
      {
        Id: true
      }
    ]
  })
}

export async function changeVehicleSituation(variables: {
  Id: string
  Situacao_Id: clientes_VeiculosAtivos_Situacao_enum
}) {
  await useTypedClientMutation({
    update_clientes_VeiculosAtivos_by_pk: [
      {
        pk_columns: {
          Id: variables.Id
        },
        _set: {
          Situacao_Id: variables.Situacao_Id
        }
      },
      { Id: true }
    ]
  })
}

export async function changeVehicleOwnership(variables: {
  Id: string
  Veiculo_Id: string
  Cliente_Id: string
  Franquia_Id: string
  OS_Id: string
  Beneficios: Benefits[]
  Produtos: {
    Ativo: boolean
    Produto_Id: string
    PrecoDeAdesao_Id: string
    PrecoDeRecorrencia_Id: string
  }[]
  Servicos: {
    Ativo: boolean
    Servico_Id: string
    PrecoDeAdesao_Id: string
    PrecoDeRecorrencia_Id: string
  }[]
}) {
  await useTypedClientMutation({
    update_clientes_VeiculosAtivos_by_pk: [
      {
        pk_columns: {
          Id: variables.Id
        },
        _set: {
          Situacao_Id: clientes_VeiculosAtivos_Situacao_enum.inativo
        }
      },
      { Id: true }
    ],
    insert_clientes_VeiculosAtivos_one: [
      {
        object: {
          Situacao_Id: clientes_VeiculosAtivos_Situacao_enum.ativo,
          Veiculo_Id: variables.Veiculo_Id,
          Cliente_Id: variables.Cliente_Id,
          Franquia_Id: variables.Franquia_Id,
          OS_Id: variables.OS_Id,
          Beneficios: {
            data: variables.Beneficios
          },
          Produtos: {
            data: variables.Produtos
          },
          Servicos: {
            data: variables.Servicos
          }
        }
      },
      {
        Id: true
      }
    ]
  })
}

export async function createActiveVehicle(variables: {
  Veiculo_Id: string
  Cliente_Id: string
  Franquia_Id: string
  Beneficios: Benefits[]
}) {
  await useTypedClientMutation({
    insert_clientes_VeiculosAtivos_one: [
      {
        object: {
          Situacao_Id: clientes_VeiculosAtivos_Situacao_enum.ativo,
          Veiculo_Id: variables.Veiculo_Id,
          Cliente_Id: variables.Cliente_Id,
          Franquia_Id: variables.Franquia_Id,
          OS_Id: null,
          Beneficios: {
            data: variables.Beneficios
          },
          Produtos: {
            data: []
          },
          Servicos: {
            data: []
          }
        }
      },
      {
        Id: true
      }
    ]
  })
}

export async function disableActiveVehicleBenefit(Id: string) {
  await useTypedClientMutation({
    update_clientes_VeiculosAtivos_Beneficios_by_pk: [
      {
        pk_columns: { Id: Id },
        _set: {
          Ativo: false,
          updated_at: new Date()
        }
      },
      {
        Id: true
      }
    ]
  })
}
