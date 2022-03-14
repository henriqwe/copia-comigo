export type InstallationKitsType = {
  Id: string
  CodigoReferencia: number
  Item: {
    Id: string
    Produto: {
      Nome: string
    }
  }
  Rastreador: {
    Item: {
      Id: string
    }
    Chip: {
      NumeroDaLinha: string
    }
    Equipamento: {
      Imei: string
    }
  }
  KitDeInsumo: {
    Id: string
    TiposDeKitDeInsumo: {
      Nome: string
    }
    Itens: {
      Id: string
      Quantidade: number
      Item: {
        Id: string
        Produto: {
          Nome: string
        }
        Grupo: {
          Nome: string
        }
        Familia: {
          Nome: string
        }
        Fabricante: {
          Nome: string
        }
        Modelo?: {
          Nome: string
        }
      }
    }[]
  }
}
