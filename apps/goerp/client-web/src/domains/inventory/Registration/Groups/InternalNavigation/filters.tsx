import * as groups from '&erp/domains/inventory/Registration/Groups'

export function Filters() {
  const { setFilters, groupsData } = groups.useGroup()
  const groupNames = []
  const filters = [
    {
      title: 'Nome do grupo',
      children: groupsData?.estoque_Grupos
        .filter((group) => {
          if (!groupNames.includes(group.Nome)) {
            groupNames.push(group.Nome)
            return true
          }
        })
        .map((group) => {
          return {
            title: group.Nome,
            handler: (reset = false) => {
              if (reset) {
                setFilters((old) => {
                  return {
                    currentPage: 1,
                    limit: old.limit,
                    offset: 0,
                    where:
                      old.where.Nome._in.filter(
                        (value: string) => value !== group.Nome
                      ).length === 0
                        ? {
                            ...old,
                            Nome: undefined
                          }
                        : {
                            ...old,
                            Nome: {
                              _in: old.where.Nome._in.filter(
                                (value: string) => value !== group.Nome
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
                        group.Nome
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
