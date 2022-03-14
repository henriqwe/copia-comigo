import * as service from '&crm/domains/commercial/Services'
export function Filters() {
  const { setFilters, servicesData } = service.useService()
  const serviceTypes = []
  const filters = [
    {
      title: 'Tipo do serviço',
      children: servicesData
        ?.filter((service) => {
          if (!serviceTypes.includes(service.Tipo.Valor)) {
            serviceTypes.push(service.Tipo.Valor)
            return true
          }
        })
        .map((service) => {
          return {
            title: service.Tipo.Comentario,
            handler: (reset = false) => {
              if (reset) {
                setFilters((old) => {
                  return {
                    currentPage: 1,
                    limit: old.limit,
                    offset: 0,
                    where:
                      old.where.Tipo.Comentario._in.filter(
                        (value: string) => value !== service.Tipo.Comentario
                      ).length === 0
                        ? {
                            ...old,
                            Tipo: undefined
                          }
                        : {
                            ...old,
                            Tipo: {
                              Comentario: {
                                _in: old.where.Tipo.Comentario._in.filter(
                                  (value: string) =>
                                    value !== service.Tipo.Comentario
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
                  where: {
                    ...old.where,
                    Tipo: {
                      Comentario: {
                        _in: [
                          ...(old.where.Tipo
                            ? old.where.Tipo.Comentario._in
                            : []),
                          service.Tipo.Comentario
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
  return filters
}
