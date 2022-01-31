import * as common from '@comigo/ui-common'
import * as blocks from '@comigo/ui-blocks'

import * as contracts from '&crm/domains/commercial/Contracts'
import * as contractVersions from '&crm/domains/commercial/Contracts/Tabs/Versions'
import { useRouter } from 'next/router'

export default function Documents() {
  const router = useRouter()
  const { baseContractRefetch } = contracts.useUpdate()
  const { contractVersionsData, contractVersionsRefetch } =
    contractVersions.useContractVersions()

  function refetch() {
    baseContractRefetch()
    contractVersionsRefetch()
  }

  return (
    <>
      <div>
        <div className="flex justify-end w-full gap-4 mt-5">
          <common.UploadFilePDF
            documentName="CONTRATO"
            Id={router.query.id as string}
            path={'contracts'}
            refetch={refetch}
          />
        </div>
        <common.Separator />
        {contractVersionsData ? (
          <blocks.Table
            colection={contractVersionsData}
            columnTitles={[
              {
                title: 'Versão',
                fieldName: 'Versao'
              }
            ]}
            actions={contractVersions.RowActions}
          />
        ) : (
          <blocks.TableSkeleton />
        )}
      </div>
      <common.Separator />
    </>
  )
}
