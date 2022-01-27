import React, { Dispatch, SetStateAction } from 'react'

import * as common from '@/common'

import router from 'next/router'
import companies from '@/domains/companies'

type ChangeCompanyProps = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  empresa: string
  setEmpresa: Dispatch<SetStateAction<string>>
}

const ChangeCompany = ({
  open,
  setOpen,
  empresa,
  setEmpresa
}: ChangeCompanyProps) => (
  <common.DialogueModal open={open} setOpen={setOpen}>
    <common.OptionsGroup companies={companies} setCompanies={setEmpresa} />
    <div className="flex items-center justify-end pl-4 mt-2">
      <button
        onClick={() => {
          if (empresa === 'GoCRM') {
            router.push(
              'http://ec2-54-207-246-124.sa-east-1.compute.amazonaws.com:3001/erp'
            )
          }
          if (empresa === 'GoERP') {
            router.push(
              'http://ec2-54-207-246-124.sa-east-1.compute.amazonaws.com:3002/erp'
            )
          }
        }}
        className="px-4 py-3 mt-2 text-white rounded-md bg-theme-10 disabled:bg-gray-500"
      >
        Alterar sistema
      </button>
    </div>
  </common.DialogueModal>
)

export default ChangeCompany
