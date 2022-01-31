import { Controller, useForm } from 'react-hook-form'

import * as common from '@comigo/ui-common'
 
 
import * as produtctAttributes from '&crm/domains/commercial/Products/Tabs/Attributes'
import * as attributes from '&crm/domains/commercial/Registration/Attributes'

import { yupResolver } from '@hookform/resolvers/yup'
 import * as utils from '@comigo/utils'
 

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
          utils.notification('Atributo cadastrado com sucesso', 'success')
      })
      .catch((err) => {
        utils.showError(err)
      })
  }

  return (
    <form      onSubmit={handleSubmit(onSubmit)}
      data-testid="inserirForm"
      className="flex flex-col items-end"
    >
      <div className="flex flex-col w-full gap-2 mb-2">
        <Controller
          control={control}
          name="Atributo_Id"
          render={({ field: { onChange, value } }) => (
            <div>
              <common.form.Select
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
      <common.buttons.PrimaryButton
        title="Enviar"
        disabled={createAttributeLoading}
        loading={createAttributeLoading}
      />
    </form>
  )
}
