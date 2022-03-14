import { useTypedClientQuery } from '&erp/graphql/generated/zeus/apollo'

export async function getItensCheckListByNameChecklist(NomeChecklist: string) {
  const checklist = await getChecklistByName(NomeChecklist)

  const { data } = await useTypedClientQuery({
    operacional_OrdemDeServico_ItensDeChecklist: [
      {
        where: {
          deleted_at: { _is_null: true }
        }
      },
      {
        Descricao: true,
        Id: true,
        Checklist_Id: [{}, true]
      }
    ]
  })
  const response = data as {
    operacional_OrdemDeServico_ItensDeChecklist: {
      Checklist_Id: { ids: string[] }
      Descricao: string
      Id: string
    }[]
  }

  const filter = response.operacional_OrdemDeServico_ItensDeChecklist.filter(
    (item) => {
      let validator = false
      item.Checklist_Id.ids.forEach((id) => {
        if (id === checklist[0].Id) {
          validator = true
          return
        }
      })
      if (validator) return item
      return
    }
  )
  return filter
}

export async function getChecklistByName(NomeChecklist: string) {
  const { data } = await useTypedClientQuery({
    operacional_OrdemDeServico_Checklist: [
      {
        where: {
          deleted_at: { _is_null: true },
          Nome: { _eq: NomeChecklist }
        }
      },
      {
        Id: true
      }
    ]
  })

  return data.operacional_OrdemDeServico_Checklist
}
