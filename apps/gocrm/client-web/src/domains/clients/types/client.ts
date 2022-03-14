import { ActiveVehicleType } from './vehicle'

export type ClientType = {
  Id: string
  FormaDePagamento_Id?: string
  DiaDeFaturamento_Id?: string
  Pessoa: {
    Nome: string
    Id: string
    Identificador: string
    Profissao?: string,
    DataCriacao?: Date,
    DataNascimento?: Date,
    Sexo?: string,
    DadosDaApi: {
      name: string
      nome: string
      razaoSocial: string
      emails: {
        categorias: string[]
        email: string
        id: string
        responsavel: string
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
        categorias: string[]
        cep: string
        cidade: string
        complemento: string
        estado: string
        id: string
        logradouro: string
        numero: string
        pontoDeReferencia: string
      }[]
    }
    PessoaJuridica: boolean
    Documentos: {
      Nome: string
    }[]
  }
  VeiculosAtivos: ActiveVehicleType[]
}
