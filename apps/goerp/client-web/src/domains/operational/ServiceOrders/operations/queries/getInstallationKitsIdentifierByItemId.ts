import { order_by } from "&erp/graphql/generated/zeus"
import { useTypedClientQuery } from "&erp/graphql/generated/zeus/apollo"

export async function getInstallationKitsIdentifierByItemId(
  InstallationKitId?: string,
  Id?: string,
  Ativo = false
) {
  const { data } = await useTypedClientQuery({
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
        Item: {
          Id: true,
          Produto: {
            Nome: true
          }
        },
        Rastreador: {
          Chip: {
            NumeroDaLinha: true
          },
          Equipamento: {
            Imei: true
          }
        }
      }
    ]
  })

  return data.producao_KitsDeInstalacao
}