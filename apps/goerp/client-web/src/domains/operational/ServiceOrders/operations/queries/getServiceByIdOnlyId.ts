import { useTypedClientQuery } from '&erp/graphql/generated/zeus/apollo'

export async function getServiceByIdOnlyId(serviceId: string) {
  const { data } = await useTypedClientQuery({
    comercial_Servicos_by_pk: [
      {
        Id: serviceId
      },
      {
        Id: true,
        Nome: true,
        GeraOS: true
      }
    ]
  })

  return {
    service: data.comercial_Servicos_by_pk
  }
}
