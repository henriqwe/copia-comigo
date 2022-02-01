import * as blocks from '&test/components/blocks'
import * as businessProfiles from '&test/components/domains/erp/services/BusinessProfiles'

export default function List() {
  const { businessProfilesData } = businessProfiles.useBusinessProfile()
  return businessProfilesData ? (
    <blocks.Table
      colection={businessProfilesData}
      columnTitles={[
        // {
        //   title: 'Grupo de Pergunta',
        //   fieldName: 'Nome',
        //   type: 'relationship',
        //   relationshipName: 'GrupoDePergunta'
        // },
        {
          title: 'Lead',
          fieldName: 'Nome',
          type: 'relationship',
          relationshipName: 'Lead'
        }
      ]}
      actions={businessProfiles.RowActions}
    />
  ) : (
    <blocks.TableSkeleton />
  )
}
