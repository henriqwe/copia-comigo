import {
  operacional_OrdemDeServico_Situacoes_enum,
  operacional_OrdemDeServico_Tipo_enum,
  order_by
} from '&erp/graphql/generated/zeus'
import {
  useTypedClientMutation,
  useTypedClientQuery
} from '&erp/graphql/generated/zeus/apollo'

type GerarOSProps = {
  vehicle: {
    Id: string
    PossuiGNV: boolean
    Cliente_Id: string
    OS_Id?: string
    Situacao_Id: string
    Veiculo_Id: string
    Produtos: {
      PrecoDeAdesao_Id?: string
      PrecoDeRecorrencia_Id?: string
      Produto_Id: string
      Identificador?: string
      TipoItem_Id?: string
    }[]
    Situacao: {
      Comentario: string
      Valor: string
    }
    Franquia_Id?: string
    Veiculo: {
      Id: string
      Apelido?: string
      Placa?: string
      NumeroDoChassi?: string
    }
  }
}

export async function gerarOSDesinstalacao({ vehicle }: GerarOSProps) {
  try {
    const {
      data: { Configuracoes_by_pk: configData }
    } = await useTypedClientQuery({
      Configuracoes_by_pk: [
        {
          Slug: 'prestadorPrecos'
        },
        {
          Valor: [{}, true]
        }
      ]
    })

    const services = await Promise.all(
      vehicle.Produtos.map(async (vehicleProduct) => {
        const product = await getProductById(vehicleProduct.Produto_Id)

        if (product.ServicoDeDesinstalacao !== null) {
          return {
            Servico_Id: product.ServicoDeDesinstalacao.Id,
            PrecoDeAdesao_Id:
              product.ServicoDeDesinstalacao.PrestadoresDeServicos.filter(
                (provider) => provider.Prestador_Id === configData.Valor[0]
              )[0]?.Precos.filter(
                (price) => price.TipoDePreco.Valor === 'adesao'
              )[0]?.Id,
            PrecoDeRecorrencia_Id:
              product.ServicoDeDesinstalacao.PrestadoresDeServicos.filter(
                (provider) => provider.Prestador_Id === configData.Valor[0]
              )[0]?.Precos.filter(
                (price) => price.TipoDePreco.Valor === 'recorrencia'
              )[0]?.Id,
            Beneficio: false
          }
        }
      })
    )

    // const filteredServices: {
    //   Servico_Id: string
    //   PrecoDeAdesao_Id: string
    //   PrecoDeRecorrencia_Id: string
    // }[] = []

    // services
    //   .filter((service) => service !== undefined)
    //   .map((service) => {
    //     const duplicatedPosition = filteredServices.findIndex(
    //       (filteredService) =>
    //         service?.Servico_Id === filteredService.Servico_Id
    //     )

    //     if (!(duplicatedPosition > -1)) {
    //       filteredServices.push({
    //         Servico_Id: service?.Servico_Id as string,
    //         PrecoDeAdesao_Id: service?.PrecoDeAdesao_Id,
    //         PrecoDeRecorrencia_Id: service?.PrecoDeRecorrencia_Id
    //       })
    //     }
    //   })

    return await useTypedClientMutation({
      insert_operacional_OrdemDeServico_one: [
        {
          object: {
            PossuiGNV: vehicle.PossuiGNV,
            Tipo_Id: operacional_OrdemDeServico_Tipo_enum.desinstalacao,
            Proposta_Id: null,
            Veiculo_Id: vehicle.Veiculo_Id,
            Servicos: {
              data: services
            },
            Situacao_Id: operacional_OrdemDeServico_Situacoes_enum.aberta
          }
        },
        {
          Id: true
        }
      ]
    })
      .then(() => {
        return 'success'
      })
      .catch((err) => {
        console.log(err)
        return 'fail'
      })
  } catch (err) {
    console.log(err)
    return err
  }
}

async function getProductById(Id: string) {
  const {
    data: { comercial_Produtos_by_pk }
  } = await useTypedClientQuery({
    comercial_Produtos_by_pk: [
      { Id },
      {
        ServicoDeDesinstalacao: {
          Id: true,
          PrestadoresDeServicos: [
            {
              where: {
                deleted_at: { _is_null: true },
                Prestador_Id: {
                  _eq: '6fde7f19-6697-4076-befc-b9b73f03b3f5'
                }
              }
            },
            {
              Prestador_Id: true,
              Precos: [
                {
                  where: { deleted_at: { _is_null: true } },
                  order_by: [{ created_at: order_by.desc }]
                },
                {
                  Id: true,
                  TipoDePreco: { Valor: true }
                }
              ]
            }
          ]
        }
      }
    ]
  })
  return comercial_Produtos_by_pk
}
