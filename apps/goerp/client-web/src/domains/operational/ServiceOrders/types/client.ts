export type ClientType = {
  Id: string
  Pessoa: {
    Nome: string
    PessoaJuridica: boolean
    Identificador: string
    DadosDaApi: {
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
        cep: string
        numero: string
        pontoDeReferencia: string
      }[]
    }
  }
}
