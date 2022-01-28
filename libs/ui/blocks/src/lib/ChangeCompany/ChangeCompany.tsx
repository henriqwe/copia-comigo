import React, { Dispatch, SetStateAction } from 'react'
import * as common from '@comigo/ui-common'
import router from 'next/router'

type ChangeCompanyProps = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  empresa: string
  setEmpresa: Dispatch<SetStateAction<string>>
  companies: {
    name: string,
    ram: string,
    cpus: string,
    disk: string,
    active?: boolean
  }[]
}

export const ChangeCompany = ({
  open,
  setOpen,
  empresa,
  setEmpresa,
  companies
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
        className="px-4 py-3 mt-2 text-white rounded-md bg-theme-10"
      >
        Alterar sistema
      </button>
    </div>
  </common.DialogueModal>
)

