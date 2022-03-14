import * as manufacturers from '&erp/domains/inventory/Registration/Manufacturers'

export function Filters() {
  const { setFilters, manufacturersData } = manufacturers.useManufacturer()
  const manufacturersNames = []
  const filters = [
    {
      title: 'Nome dos fabricantes',
      children: manufacturersData
        ?.filter((manufacturer) => {
          if (!manufacturersNames.includes(manufacturer.Nome)) {
            manufacturersNames.push(manufacturer.Nome)
            return true
          }
        })
        .map((manufacturer) => {
          return {
            title: manufacturer.Nome,
            handler: (reset) => {
              if (reset) {
                setFilters((old) => {
                  return {
                    currentPage: 1,
                    limit: old.limit,
                    offset: 0,
                    where:
                      old.where.Nome._in.filter(
                        (value: string) => value !== manufacturer.Nome
                      ).length === 0
                        ? {
                            ...old,
                            Nome: undefined
                          }
                        : {
                            ...old,
                            Nome: {
                              _in: old.where.Nome._in.filter(
                                (value: string) => value !== manufacturer.Nome
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
                    ...old,
                    Nome: {
                      _in: [
                        ...(old.where.Nome ? old.where.Nome._in : []),
                        manufacturer.Nome
                      ]
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
