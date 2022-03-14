import * as blocks from '@comigo/ui-blocks'
import * as collaborator from '&crm/domains/Collaborators'

export default function List() {
  const { collaboratorsData } = collaborator.useCollaborator()
  return collaboratorsData ? (
    <blocks.Table
      colection={collaboratorsData}
      columnTitles={[
        {
          title: 'Identificador',
          fieldName: 'Identificador',
          type: 'relationship',
          relationshipName: 'Pessoa'
        },
        {
          title: 'Colaborador',
          fieldName: 'Nome',
          type: 'relationship',
          relationshipName: 'Pessoa'
        }
      ]}
      actions={collaborator.RowActions}
    />
  ) : (
    <blocks.TableSkeleton />
  )
}
