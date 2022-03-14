export type VehicleType = {
  Id: string
  Placa?: string
  NumeroDoChassi?: string
  Apelido?: string
  DadosDaApi?: [
    [
      {
        UF: string[]
        CMT: string[]
        COR: string[]
        PBT: string[]
        MARCA: string[]
        PLACA: string[]
        CHASSI: string[]
        MODELO: string[]
        PORTAS: string[]
        TRACAO: string[]
        MODELO2: string[]
        POTENCIA: string[]
        QTD_PASS: string[]
        ANO_MODELO: string[]
        CARROCERIA: string[]
        CAIXACAMBIO: string[]
        COMBUSTIVEL: string[]
        TIPOVEICULO: string[]
        NUMERO_EIXOS: string[]
        NUMERO_MOTOR: string[]
        PLACAMERCOSUL: string[]
        TERCEIRO_EIXO: string[]
        ANO_FABRICACAO: string[]
        ESPECIE_VEICULO: string[]
        TIPO_CARROCERIA: string[]
        CHASSI_REMARCADO: string[]
        CATEGORIA_VEICULO: string[]
        NUMERO_CILINDRADAS: string[]
        IDENTIFICADOR_CHASSI: {
          PAIS: string[]
          CHASSI_LEITURA: string[]
          REGIAO_GEOGRAFICA: string[]
        }[]

        MES_ANO_EMPLACAMENTO: string[]
        EIXO_TRASEIRO_DIFERENCIAL: string[]
        ULTIMA_OCORRENCIA_RESTRICAO: {
          ULT_HIST_REST01: string[]
          ULT_HIST_REST02: string[]
          ULT_HIST_REST03: string[]
          ULT_HIST_REST04: string[]
        }[]
      }
    ],
    [
      {
        DADO: string[]
        TIPO: string[]
        TEMPO: string[]
        HORARIO: string[]
        MENSAGEM: string[]
        NUMERO_RESPOSTA: string[]
      }
    ]
  ]
  VeiculosAtivos: {
    PossuiGNV: boolean
  }[]
}
