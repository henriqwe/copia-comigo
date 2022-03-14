import * as service from '&erp/domains/operational/ServiceOrders'

export function Filters() {
  const { setFilters, serviceOrdersData } = service.useServiceOrder()
  const typeValues = []
  const situationValues = []
  const collaboratorValues = []
  const filtersArray = [
    {
      title: 'Situações',
      children: serviceOrdersData
        ?.filter((serviceOrder) => {
          if (!situationValues.includes(serviceOrder.Situacao.Valor)) {
            situationValues.push(serviceOrder.Situacao.Valor)
            return true
          }
        })
        .map((serviceOrder) => {
          return {
            title: serviceOrder.Situacao.Comentario,
            handler: (reset = false) => {
              if (reset) {
                setFilters((old) => {
                  return {
                    currentPage: 1,
                    limit: old.limit,
                    offset: 0,
                    where:
                      old.where.Situacao_Id._in.filter(
                        (value: string) => value !== serviceOrder.Situacao.Valor
                      ).length === 0
                        ? { ...old.where, Situacao_Id: undefined }
                        : {
                            ...old.where,
                            Situacao_Id: {
                              _in: old.where.Situacao_Id._in.filter(
                                (value: string) =>
                                  value !== serviceOrder.Situacao.Valor
                              )
                            }
                          }
                  }
                })
                return
              }
              setFilters((old) => {
                return {
                  currentPage: 1,
                  limit: old.limit,
                  offset: 0,
                  where: {
                    ...old.where,
                    Situacao_Id: {
                      _in: [
                        ...(old.where.Situacao_Id
                          ? old.where.Situacao_Id._in
                          : []),
                        serviceOrder.Situacao.Valor
                      ]
                    }
                  }
                }
              })
            }
          }
        })
    },
    {
      title: 'Tipo da OS',
      children: serviceOrdersData
        ?.filter((serviceOrder) => {
          if (!typeValues.includes(serviceOrder.Tipo.Valor)) {
            typeValues.push(serviceOrder.Tipo.Valor)
            return true
          }
        })
        .map((serviceOrder) => {
          return {
            title: serviceOrder.Tipo.Comentario,
            handler: (reset = false) => {
              if (reset) {
                setFilters((old) => {
                  return {
                    currentPage: 1,
                    limit: old.limit,
                    offset: 0,
                    where:
                      old.where.Tipo_Id._in.filter(
                        (value: string) => value !== serviceOrder.Tipo.Valor
                      ).length === 0
                        ? { ...old.where, Tipo_Id: undefined }
                        : {
                            ...old.where,
                            Tipo_Id: {
                              _in: old.where.Tipo_Id._in.filter(
                                (value: string) =>
                                  value !== serviceOrder.Tipo.Valor
                              )
                            }
                          }
                  }
                })
                return
              }
              setFilters((old) => {
                return {
                  currentPage: 1,
                  limit: old.limit,
                  offset: 0,
                  where: {
                    ...old.where,
                    Tipo_Id: {
                      _in: [
                        ...(old.where.Tipo_Id ? old.where.Tipo_Id._in : []),
                        serviceOrder.Tipo.Valor
                      ]
                    }
                  }
                }
              })
            }
          }
        })
    },
    {
      title: 'Colaborador da OS',
      children: serviceOrdersData
        ?.filter((serviceOrder) => {
          if (serviceOrder.Agendamentos.length > 0) {
            if (
              !collaboratorValues.includes(
                serviceOrder.Agendamentos[0].Colaborador.Pessoa.Nome
              )
            ) {
              collaboratorValues.push(
                serviceOrder.Agendamentos[0].Colaborador.Pessoa.Nome
              )
              return true
            }
          }
        })
        .map((serviceOrder) => {
          return {
            title: serviceOrder.Agendamentos?.[0]?.Colaborador.Pessoa.Nome,
            handler: (reset = false) => {
              if (reset) {
                setFilters((old) => {
                  return {
                    currentPage: 1,
                    limit: old.limit,

                    offset: 0,
                    where:
                      old.where.Agendamentos.Colaborador_Id._in.filter(
                        (value: string) =>
                          value !== serviceOrder.Agendamentos[0].Colaborador.Id
                      ).length === 0
                        ? { ...old.where, Agendamentos: undefined }
                        : {
                            ...old.where,
                            Agendamentos: {
                              Colaborador_Id: {
                                _in: old.where.Agendamentos.Colaborador_Id._in.filter(
                                  (value: string) =>
                                    value !==
                                    serviceOrder.Agendamentos[0].Colaborador.Id
                                )
                              }
                            }
                          }
                  }
                })
                return
              }

              setFilters((old) => {
                return {
                  currentPage: 1,
                  limit: old.limit,
                  offset: 0,
                  where:
                    // serviceOrder.Agendamentos.length === 0
                    //   ? {
                    //       ...old.where,
                    //       _not: { Agendamentos: {} }
                    //     }
                    //   :
                    {
                      ...old.where,
                      Agendamentos: {
                        Colaborador_Id: {
                          _in: [
                            ...(old.where.Agendamentos
                              ? old.where.Agendamentos.Colaborador_Id._in
                              : []),
                            serviceOrder.Agendamentos[0].Colaborador.Id
                          ]
                        }
                      }
                    }
                }
              })
            }
          }
        })
    }
  ]
  return filtersArray
}
