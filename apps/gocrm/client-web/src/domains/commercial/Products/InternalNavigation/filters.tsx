import * as products from '&crm/domains/commercial/Products'
export function Filters() {
  const { setFilters, productsData } = products.useProduct()
  const productsTypes = []
  const filters = [
    {
      title: 'Tipo do produto',
      children: productsData
        ?.filter((product) => {
          if (!productsTypes.includes(product.Tipo.Valor)) {
            productsTypes.push(product.Tipo.Valor)
            return true
          }
        })
        .map((product) => {
          return {
            title: product.Tipo.Comentario,
            handler: (reset = false) => {
              if (reset) {
                setFilters((old) => {
                  return {
                    currentPage: 1,
                    limit: old.limit,
                    offset: 0,
                    where:
                      old.where.Tipo.Comentario._in.filter(
                        (value: string) => value !== product.Tipo.Comentario
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
                                    value !== product.Tipo.Comentario
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
                          product.Tipo.Comentario
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
