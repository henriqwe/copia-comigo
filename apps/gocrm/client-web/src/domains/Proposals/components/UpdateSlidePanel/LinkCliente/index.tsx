import { Controller, useForm } from 'react-hook-form'

import * as common from '@comigo/ui-common'
import * as utils from '@comigo/utils'
import * as proposals from '&crm/domains/Proposals'

import { useState } from 'react'
import { useRouter } from 'next/router'

export function LinkCliente() {
  const [loading, setLoading] = useState(false)
  const { insertClientToProposal, clientData, proposalRefetch } =
    proposals.useUpdate()
  const {
    handleSubmit,
    formState: { errors },
    control
  } = useForm()

  async function onSubmit(formData: {
    Cliente: { key: string; value: string }
  }) {
    try {
      setLoading(true)
      await insertClientToProposal({
        variables: {
          Cliente_Id: formData.Cliente.key
        }
      })
      proposalRefetch()
      utils.notification('Cliente vínculado com sucesso','success')

      setLoading(false)
    } catch (err) {
      setLoading(false)
      utils.showError(err)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      data-testid="inserirForm"
      className="flex flex-col items-end"
    >
      <div className="flex flex-col w-full gap-2 mb-2">
        <Controller
          control={control}
          name={'Cliente'}
          render={({ field: { onChange, value } }) => (
            <div className="col-span-4">
              <common.form.Select
                itens={
                  clientData
                    ? clientData.map((client) => {
                        return {
                          key: client.Id,
                          title: client.Pessoa?.Nome as string
                        }
                      })
                    : []
                }
                value={value}
                onChange={onChange}
                error={errors.Cliente}
                label="Cliente"
              />
            </div>
          )}
        />
      </div>
      <common.Separator />
      <common.buttons.PrimaryButton
        title="Enviar"
        disabled={loading}
        loading={loading}
      />
    </form>
  )
}
