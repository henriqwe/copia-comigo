export type Clienttype = {
  Id: string
  Pessoa: {
    PessoaJuridica: boolean
    DadosDaApi: {
      email: string
      address: {
        city: string
        city_ibge: string
        details: string
        neighborhood: string
        number: string
        state: string
        state_ibge: string
        street: string
        zip: string
      }
      phone: string
      emails: {
        email: string
      }[]
      telefones: {
        categorias: string[]
        id: string
        responsavel: string
        telefone: string
        whatsapp: string
      }[]
      enderecos: {
        bairro: string
        cidade: string
        complemento: string
        estado: string
        logradouro: string
        numero: string
        pontoDeReferencia: string
      }[]
    }
    Nome: string
    Documentos: {
      Nome: string
    }[]
  }
  FormaDePagamento_Id?: string
  DiaDeFaturamento_Id?: string
}
