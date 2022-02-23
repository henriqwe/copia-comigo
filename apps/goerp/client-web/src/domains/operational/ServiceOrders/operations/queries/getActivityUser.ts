import { useTypedClientQuery } from "&erp/graphql/generated/zeus/apollo"

export async function getActivityUser(Id: string) {
  const { data } = await useTypedClientQuery({
    autenticacao_Usuarios_by_pk: [
      {
        Id
      },
      {
        Id: true,
        Cliente: {
          Pessoa: {
            Nome: true
          }
        },
        Colaborador: {
          Pessoa: {
            Nome: true
          }
        }
      }
    ]
  })

  return data.autenticacao_Usuarios_by_pk
}
