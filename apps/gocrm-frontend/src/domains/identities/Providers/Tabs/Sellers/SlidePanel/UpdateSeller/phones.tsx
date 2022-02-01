import { useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'

 
import * as common from '@comigo/ui-common'
import * as blocks from '@comigo/ui-blocks'
import * as sellers from '&crm/domains/identities/Providers/Tabs/Sellers'

 import * as utils from '@comigo/utils'

export default function Phones() {
  const {
    phoneSchema,
    updateSellerPhones,
    updateSellerPhonesLoading,
    sellersRefetch,
    slidePanelState,
    setSlidePanelState
  } = sellers.useSeller()
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    register
  } = useForm({
    resolver: yupResolver(phoneSchema)
  })

  const onSubmit = (formData: { Telefone: string }) => {
    formData.Telefone = utils.phoneUnformat(formData.Telefone)
    updateSellerPhones({
      variables: {
        Id: slidePanelState.data?.Id,
        Telefones: [...slidePanelState.data?.Telefones, formData.Telefone]
      }
    })
      .then(() => {
        setSlidePanelState((oldState) => {
          return {
            ...oldState,
            data: {
              ...oldState.data,
              Telefones: [...oldState.data?.Telefones, formData.Telefone]
            }
          }
        })
        sellersRefetch()
        reset({
          Telefone: ''
        })
          utils.notification(formData.Telefone + ' cadastrado com sucesso', 'success')
      })
      .catch((err) => {
          utils.notification(err.message, 'error')
      })
  }

  return (
    <form      data-testid="inserirForm"
      className="flex items-center justify-between gap-2 mb-2"
    >
      <div className="flex-1">
        <common.form.BRPhoneInput
          control={control}
          error={errors.Telefone}
          register={register}
        />
      </div>
      <common.buttons.SecondaryButton
        handler={handleSubmit(onSubmit)}
        loading={updateSellerPhonesLoading}
        disabled={updateSellerPhonesLoading}
        className="w-8 h-full"
      />
    </form>
  )
}
