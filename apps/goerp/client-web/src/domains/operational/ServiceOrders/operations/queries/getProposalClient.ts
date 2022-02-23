import { useTypedClientQuery } from "&erp/graphql/generated/zeus/apollo"

export async function getProposalClient(Id: string) {
  const { data } = await useTypedClientQuery({
    identidades_Clientes_by_pk: [
      {
        Id
      },
      {
        Id: true,
        Pessoa: {
          Nome: true,
          PessoaJuridica: true,
          Identificador: true,
          DadosDaApi: [{}, true]
        }
      }
    ]
  })

  return data.identidades_Clientes_by_pk
}
