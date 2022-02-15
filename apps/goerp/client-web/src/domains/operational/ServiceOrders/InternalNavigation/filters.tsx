import * as service from '&erp/domains/operational/ServiceOrders'

export function Filters() {
  const { setFilters } = service.useServiceOrder()
  const filters = [
    {
      title: 'Aberta',
      handler: () => {
        setFilters((old) => {
          return {
            currentPage: 1,
            limit: old.limit,
            offset: 0,
            where: {
              ...old.where,
              Situacao_Id: { _eq: 'aberta' }
            }
          }
        })
      }
    },
    {
      title: 'Agendada',
      handler: () => {
        setFilters((old) => {
          return {
            currentPage: 1,
            limit: old.limit,
            offset: 0,
            where: {
              ...old.where,
              Situacao_Id: { _eq: 'agendada' }
            }
          }
        })
      }
    },
    {
      title: 'Cancelada',
      handler: () => {
        setFilters((old) => {
          return {
            currentPage: 1,
            limit: old.limit,
            offset: 0,
            where: {
              ...old.where,
              Situacao_Id: { _eq: 'cancelada' }
            }
          }
        })
      }
    },
    {
      title: 'Finalizada',
      handler: () => {
        setFilters((old) => {
          return {
            currentPage: 1,
            limit: old.limit,
            offset: 0,
            where: {
              ...old.where,
              Situacao_Id: { _eq: 'finalizada' }
            }
          }
        })
      }
    },
    {
      title: 'Conferida',
      handler: () => {
        setFilters((old) => {
          return {
            currentPage: 1,
            limit: old.limit,
            offset: 0,
            where: {
              ...old.where,
              Situacao_Id: { _eq: 'conferida' }
            }
          }
        })
      }
    },
    {
      title: 'Frustrada',
      handler: () => {
        setFilters((old) => {
          return {
            currentPage: 1,
            limit: old.limit,
            offset: 0,
            where: {
              ...old.where,
              Situacao_Id: { _eq: 'frustada' }
            }
          }
        })
      }
    }
  ]
  return filters
}
