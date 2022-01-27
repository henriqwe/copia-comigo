import { useEffect } from 'react'

import * as common from '@/common'
import * as buttons from '@/common/Buttons'
import * as form from '@/common/Form'
import * as providers from '@/domains/erp/portfolio/Pricing'
import { useForm } from 'react-hook-form'

export default function UpdateProvider() {
  const { providerData } = providers.useUpdate()

  const { register, reset } = useForm()

  useEffect(() => {
    reset({
      Nome: providerData?.Nome || ''
    })
  }, [providerData, reset])

  return (
    <div className="flex flex-col gap-4">
      <common.Card>
        <common.GenericTitle
          title="Dados gerais"
          subtitle="Dados básicos do Fornecedor"
          className="px-6"
        />
        <common.Separator className="mb-0" />
        <form>
          <form.FormLine position={1} grid={2}>
            <form.Input
              fieldName="Nome"
              title="Nome"
              register={register}
              disabled={true}
            />
          </form.FormLine>

          <div className="flex items-center justify-between w-full px-6">
            <buttons.GoBackButton />
          </div>
        </form>
      </common.Card>
    </div>
  )
}
