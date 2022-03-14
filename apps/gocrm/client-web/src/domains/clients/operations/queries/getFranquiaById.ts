import { useTypedClientQuery } from "&crm/graphql/generated/zeus/apollo"

export async function getFranquiaById(Id: string) {
  const { data } = await useTypedClientQuery({
    comercial_PrestadoresDeServicos_by_pk: [
      {
        Id
      },
      {
        Id: true,
        Nome: true
      }
    ]
  })

  return data.comercial_PrestadoresDeServicos_by_pk
}