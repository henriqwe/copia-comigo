import { QueryType } from '&crm/domains/Proposals/types/query'
import { useTypedClientMutation } from '&crm/graphql/generated/zeus/apollo'
import {
  clientes_VeiculosAtivos_Situacao_enum,
  propostas_Propostas_Situacoes_enum
} from '&crm/graphql/generated/zeus'

type ComboType = {
  Ativo: boolean
  ComboPreco_Id: string
  Combo_Id: string
  DataDeAtivacao: Date
  Planos?: {
    data: {
      DataDeAtivacao: Date
      PlanoPreco_Id: string
      Plano_Id: string
      VeiculoAtivo_Id: string
      Ativo: boolean
      Produtos: {
        data: ActiveVehicleProductType[]
      }
      Servicos: {
        data: ActiveVehicleServiceType[]
      }
    }[]
  }
  Produtos?: { data: ActiveVehicleProductType[] }
  Servicos?: { data: ActiveVehicleServiceType[] }
}

type PlanType = {
  Ativo: boolean
  Plano_Id: string
  PlanoPreco_Id: string
  DataDeAtivacao: Date
  Produtos?: {
    data: ActiveVehicleProductType[]
  }
  Servicos?: { data: ActiveVehicleServiceType[] }
}
type ActiveVehicleProductType = {
  PrecoDeAdesao_Id: string
  PrecoDeRecorrencia_Id: string
  Produto_Id: string
  VeiculoAtivo_Id?: string
  Quantidade: number
  DataDeAtivacao: Date
  Ativo: boolean
}

type ActiveVehicleServiceType = {
  PrecoDeAdesao_Id: string
  PrecoDeRecorrencia_Id: string
  Servico_Id: string
  VeiculoAtivo_Id?: string
  DataDeAtivacao: Date
  Beneficio: boolean
  Ativo: boolean
}

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

export async function updateActiveVehicleCombo(variables: {
  Id: string
  ComboPreco_Id: string
}) {
  await useTypedClientMutation({
    update_clientes_VeiculosAtivos_Combos_by_pk: [
      {
        pk_columns: { Id: variables.Id },
        _set: {
          ComboPreco_Id: variables.ComboPreco_Id
        }
      },
      {
        Id: true
      }
    ]
  })
}

export async function updateActiveVehiclePlan(variables: {
  Id: string
  PlanoPreco_Id: string
}) {
  await useTypedClientMutation({
    update_clientes_VeiculosAtivos_Planos_by_pk: [
      {
        pk_columns: { Id: variables.Id },
        _set: {
          PlanoPreco_Id: variables.PlanoPreco_Id
        }
      },
      {
        Id: true
      }
    ]
  })
}

export async function updateActiveVehicleServicePrice(variables: {
  Id: string
  PrecoDeAdesao_Id: string
  PrecoDeRecorrencia_Id: string
}) {
  await useTypedClientMutation({
    update_clientes_VeiculosAtivos_Servicos_by_pk: [
      {
        pk_columns: { Id: variables.Id },
        _set: {
          PrecoDeAdesao_Id: variables.PrecoDeAdesao_Id,
          PrecoDeRecorrencia_Id: variables.PrecoDeRecorrencia_Id,
        }
      },
      {
        Id: true
      }
    ]
  })
}

export async function activateActiveVehicleCombo(variables: {
  Id: string
  ComboPreco_Id: string
}) {
  await useTypedClientMutation({
    update_clientes_VeiculosAtivos_Combos_by_pk: [
      {
        pk_columns: { Id: variables.Id },
        _set: {
          ComboPreco_Id: variables.ComboPreco_Id,
          DataDeAtivacao: new Date()
        }
      },
      {
        Id: true
      }
    ]
  })
}

export async function activateActiveVehiclePlan(variables: {
  Id: string
  PlanoPreco_Id: string
}) {
  await useTypedClientMutation({
    update_clientes_VeiculosAtivos_Planos_by_pk: [
      {
        pk_columns: { Id: variables.Id },
        _set: {
          PlanoPreco_Id: variables.PlanoPreco_Id,
          DataDeAtivacao: new Date()
        }
      },
      {
        Id: true
      }
    ]
  })
}

export async function createActiveVehicleCombo(variables: {
  Combo_Id: string
  ComboPreco_Id: string
  Planos: PlanType[]
  Produtos: ActiveVehicleProductType[]
  Servicos: ActiveVehicleServiceType[]
  VeiculoAtivo_Id: string
}) {
  await useTypedClientMutation({
    insert_clientes_VeiculosAtivos_Combos_one: [
      {
        object: {
          Ativo: true,
          Combo_Id: variables,
          ComboPreco_Id: variables,
          Planos: { data: variables.Planos },
          Produtos: { data: variables.Produtos },
          Servicos: { data: variables.Servicos },
          VeiculoAtivo_Id: variables.VeiculoAtivo_Id,
          DataDeAtivacao: new Date()
        }
      },
      {
        Id: true
      }
    ]
  })
}

export async function createActiveVehiclePlan(variables: {
  Plano_Id: string
  PlanoPreco_Id: string
  VeiculoAtivo_Id: string
  Produtos: ActiveVehicleProductType[]
  Servicos: ActiveVehicleServiceType[]
}) {
  await useTypedClientMutation({
    insert_clientes_VeiculosAtivos_Planos_one: [
      {
        object: {
          Ativo: true,
          Plano_Id: variables.Plano_Id,
          PlanoPreco_Id: variables.PlanoPreco_Id,
          VeiculoAtivo_Id: variables.VeiculoAtivo_Id,
          DataDeAtivacao: new Date(),
          Produtos: { data: variables.Produtos },
          Servicos: { data: variables.Servicos }
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
  TipoItem_Id?: string
  Identificador?: string
  Quantidade: number
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
          DataDeAtivacao: new Date(),
          Identificador: variables.Identificador,
          Quantidade: variables.Quantidade
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
  Beneficio: boolean
}) {
  await useTypedClientMutation({
    insert_clientes_VeiculosAtivos_Servicos_one: [
      {
        object: {
          Ativo: true,
          VeiculoAtivo_Id: variables.VeiculoAtivo_Id,
          PrecoDeAdesao_Id: variables.PrecoDeAdesao_Id,
          PrecoDeRecorrencia_Id: variables.PrecoDeRecorrencia_Id,
          Beneficio: variables.Beneficio,
          DataDeAtivacao: new Date(),
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
  vehicleUUID: string
  Id: string
  Veiculo_Id: string
  Cliente_Id: string
  Franquia_Id: string
  OS_Id: string
  Combos: ComboType[]
  Planos: PlanType[]
  Produtos: ActiveVehicleProductType[]
  Servicos: ActiveVehicleServiceType[]
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
          Id: variables.vehicleUUID,
          Situacao_Id: clientes_VeiculosAtivos_Situacao_enum.ativo,
          Veiculo_Id: variables.Veiculo_Id,
          Cliente_Id: variables.Cliente_Id,
          Franquia_Id: variables.Franquia_Id,
          OS_Id: variables.OS_Id,
          Combos: {
            data: variables.Combos
          },
          Planos: {
            data: variables.Planos
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
  Id: string
  Veiculo_Id: string
  Cliente_Id: string
  Franquia_Id: string
  PossuiGNV: boolean
  Combos: ComboType[]
  Planos: PlanType[]
  Produtos: ActiveVehicleProductType[]
  Servicos: ActiveVehicleServiceType[]
}) {
  await useTypedClientMutation({
    insert_clientes_VeiculosAtivos_one: [
      {
        object: {
          Id: variables.Id,
          PossuiGNV: variables.PossuiGNV,
          Situacao_Id: clientes_VeiculosAtivos_Situacao_enum.ativo,
          Veiculo_Id: variables.Veiculo_Id,
          Cliente_Id: variables.Cliente_Id,
          Franquia_Id: variables.Franquia_Id,
          OS_Id: null,
          Combos: {
            data: variables.Combos
          },
          Planos: {
            data: variables.Planos
          },
          Servicos: {
            data: variables.Servicos
          },
          Produtos: {
            data: variables.Produtos
          }
        }
      },
      {
        Id: true
      }
    ]
  })
}
