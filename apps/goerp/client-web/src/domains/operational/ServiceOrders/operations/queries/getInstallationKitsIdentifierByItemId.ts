import { order_by } from '&erp/graphql/generated/zeus'
import { useTypedClientQuery } from '&erp/graphql/generated/zeus/apollo'
import { InstallationKitsType } from '../../types/installationKit'

export async function getInstallationKitsIdentifierByItemId(
  InstallationKitId?: string,
  Id?: string,
  Ativo = false
): Promise<InstallationKitsType[]> {
  const { data } = await useTypedClientQuery(
    {
      producao_KitsDeInstalacao: [
        {
          where: {
            deleted_at: { _is_null: true },
            Item_Id: Id ? { _eq: Id } : { _is_null: false },
            Ativo: { _eq: Ativo },
            Id: InstallationKitId
              ? { _eq: InstallationKitId }
              : { _is_null: false }
          },
          order_by: [{ created_at: order_by.desc }]
        },
        {
          Id: true,
          CodigoReferencia: true,
          Ativo: true,
          Item: {
            Id: true,
            Produto: {
              Nome: true
            }
          },
          Rastreador: {
            Item: {
              Id: true
            },
            Chip: {
              NumeroDaLinha: true
            },
            Equipamento: {
              Imei: true
            }
          },
          KitDeInsumo: {
            Id: true,
            TiposDeKitDeInsumo: {
              Nome: true
            },
            Itens: [
              { where: { deleted_at: { _is_null: true } } },
              {
                Id: true,
                Quantidade: true,
                Item: {
                  Id: true,
                  Produto: {
                    Nome: true
                  },
                  Grupo: {
                    Nome: true
                  },
                  Familia: {
                    Nome: true
                  },
                  Fabricante: {
                    Nome: true
                  },
                  Modelo: {
                    Nome: true
                  }
                }
              }
            ]
          }
        }
      ]
    },
    {},
    { fetchPolicy: 'no-cache', notifyOnNetworkStatusChange: true }
  )

  return data.producao_KitsDeInstalacao
}
