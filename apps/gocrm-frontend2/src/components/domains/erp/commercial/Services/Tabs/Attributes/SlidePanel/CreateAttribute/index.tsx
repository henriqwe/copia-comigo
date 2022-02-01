import { Controller, useForm } from 'react-hook-form'

import * as common from '&test/components/common'
import * as buttons from '&test/components/common/Buttons'
import * as form from '&test/components/common/Form'
import * as produtctAttributes from '&test/components/domains/erp/commercial/Services/Tabs/Attributes'
import * as attributes from '&test/components/domains/erp/commercial/Registration/Attributes'

import { yupResolver } from '@hookform/resolvers/yup'
import { notification } from '&test/utils/notification'
import { showError } from '&test/utils/showError'

type FormData = {
  Atributo_Id: {
    key: string
  }
}

export default function CreateAttribute() {
  const {
    createAttributeLoading,
    createAttribute,
    setSlidePanelState,
    attributesRefetch,
    attributeSchema
  } = produtctAttributes.useAttribute()
  const { attributeData } = attributes.useAttribute()
  const {
    handleSubmit,
    formState: { errors },
    control
  } = useForm({
    resolver: yupResolver(attributeSchema)
  })
  const onSubmit = (formData: FormData) => {
    createAttribute({
      variables: {
        Atributo_Id: formData.Atributo_Id.key
      }
    })
      .then(() => {
        attributesRefetch()
        setSlidePanelState((oldState) => {
          return { ...oldState, open: false }
        })
        notification('Atributo cadastrado com sucesso', 'success')
      })
      .catch((err) => {
        showError(err)
      })
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
          name="Atributo_Id"
          render={({ field: { onChange, value } }) => (
            <div>
              <form.Select
                itens={
                  attributeData
                    ? attributeData.map((item) => {
                      return {
                        key: item.Id,
                        title: item.Nome
                      }
                    })
                    : []
                }
                value={value}
                onChange={onChange}
                error={errors.Atributo_Id}
                label="Atributo"
              />
            </div>
          )}
        />
      </div>
      <common.Separator />
      <buttons.PrimaryButton
        title="Enviar"
        disabled={createAttributeLoading}
        loading={createAttributeLoading}
      />
    </form>
  )
}