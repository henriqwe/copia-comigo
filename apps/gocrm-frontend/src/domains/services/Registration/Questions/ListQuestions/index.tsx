import * as blocks from '@comigo/ui-blocks'
import * as questions from '&crm/domains/services/Registration/Questions'

export default function List() {
  const { questionsData } = questions.useQuestion()
  return questionsData ? (
    <blocks.Table
      colection={questionsData}
      columnTitles={[
        { title: 'Título', fieldName: 'Titulo' },
        { title: 'Descrição', fieldName: 'Descricao' }
      ]}
      actions={questions.RowActions}
    />
  ) : (
    <blocks.TableSkeleton />
  )
}
