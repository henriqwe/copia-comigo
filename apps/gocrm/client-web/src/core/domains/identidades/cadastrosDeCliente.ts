import {
  useTypedClientMutation,
  $,
  useTypedClientQuery
} from '&crm/graphql/generated/zeus/apollo'

export async function insereClienteEPessoa(
  identificador: string,
  tipo: string,
  dadosDaApi: {
    nome?: string
    name?: string
    sexo?: string
    dataNascimento?: Date
    outros?: {
      ocupacao: string
    }
    primary_activity?: {
      description: string
    }
    founded?: Date
  }
) {
  const cliente = await useTypedClientMutation(
    {
      insert_identidades_Clientes_one: [
        {
          object: {
            Pessoa: {
              data: {
                Nome: $`Nome`,
                Identificador: $`Identificador`,
                PessoaJuridica: $`PessoaJuridica`,
                DadosDaApi: $`DadosDaApi`,
                Sexo: $`Sexo`,
                Profissao: $`Profissao`,
                DataCriacao: $`DataCriacao`,
                DataNascimento: $`DataNascimento`
              }
            }
          }
        },
        {
          Id: true
        }
      ]
    },
    {
      Identificador: identificador,
      PessoaJuridica: tipo,
      DadosDaApi: dadosDaApi,
      Nome: dadosDaApi.nome ? dadosDaApi.nome : dadosDaApi.name,
      Sexo: dadosDaApi.sexo
        ? dadosDaApi.sexo === '2'
          ? 'Masculino'
          : 'Feminino'
        : null,
      Profissao: dadosDaApi.outros
        ? dadosDaApi.outros.ocupacao
        : dadosDaApi.primary_activity.description,
      DataCriacao: dadosDaApi.founded ? dadosDaApi.founded : null,
      DataNascimento: dadosDaApi.dataNascimento
        ? dadosDaApi.dataNascimento
        : null
    }
  )
  return cliente
}

export async function insereCliente(Pessoa_Id: string) {
  const cliente = await useTypedClientMutation(
    {
      insert_identidades_Clientes_one: [
        {
          object: {
            Pessoa_Id: $`Pessoa_Id`
          }
        },
        {
          Id: true
        }
      ]
    },
    {
      Pessoa_Id: Pessoa_Id
    }
  )
  return cliente
}

export async function BuscarPessoaExistente(Identificador: string) {
  const { data } = await useTypedClientQuery({
    identidades_Pessoas: [
      { where: { Identificador: { _eq: Identificador } } },
      {
        Id: true
      }
    ]
  })
  return data
}
