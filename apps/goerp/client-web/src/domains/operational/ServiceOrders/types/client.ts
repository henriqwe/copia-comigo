export type ClientType = {
  Id: string
  Pessoa: {
    Nome: string
    PessoaJuridica: boolean
    Identificador: string
    DadosDaApi: {
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
  }
}