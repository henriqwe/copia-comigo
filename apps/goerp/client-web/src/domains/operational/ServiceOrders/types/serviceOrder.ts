import { Benefits } from './benefits'
import { Products } from './products'
import { Services } from './services'

export type ServiceOrderData = {
  Id: string
  Tipo: {
    Valor: string
    Comentario: string
  }
  Situacao: {
    Valor: string
    Comentario: string
  }
  Agendamentos: {
    Id: string
    Agendamento: Date
    FimDoServico?: Date
    InicioDoServico?: Date
    Colaborador_Id: string
    Situacao: {
      Valor: string
      Comentario: string
    }
    Itens?: {
      Id: string
      Produto?: {
        Id: string
      }
      RetiradoDoEstoque: boolean
      Item: {
        Id: string
        Chips: {
          Id: string
        }[]
        Equipamentos: {
          Id: string
        }[]
        Identificadores: {
          Id: string
        }[]
        Rastreadores: {
          Id: string
        }[]
        KitsDeInsumo: {
          Id: string
        }[]
        KitsDeInstalacao: {
          Id: string
        }[]
      }
    }[]
  }[]

  CodigoIdentificador: number
  Proposta?: {
    Id: string
    Cliente_Id?: string
  }

  Beneficios: Benefits[]
  Servicos: Services[]
  Produtos: Products[]
  Veiculo_Id: string
}
