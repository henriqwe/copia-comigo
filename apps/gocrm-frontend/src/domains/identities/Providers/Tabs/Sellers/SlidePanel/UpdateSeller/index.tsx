import { useForm } from 'react-hook-form'
import React, { useEffect } from 'react'

import { GraphQLTypes } from '&crm/graphql/generated/zeus'
import { yupResolver } from '@hookform/resolvers/yup'

import * as common from '@comigo/ui-common'
 

 

import * as sellers from '&crm/domains/identities/Providers/Tabs/Sellers'

 import * as utils from '@comigo/utils'

export default function UpdateSeller() {
  const {
    sellerSchema,
    slidePanelState,
    setSlidePanelState,
    sellersRefetch,
    UpdateSeller,
    UpdateSellerLoading,
    updateSellerEmail,
    updateSellerPhones
  } = sellers.useSeller()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(sellerSchema)
  })

  const onSubmit = (formData: GraphQLTypes['identidades_Vendedores']) => {
    UpdateSeller({
      variables: {
        Id: slidePanelState.data?.Id,
        Nome: formData.Nome
      }
    })
      .then(() => {
        sellersRefetch()
          utils.notification(formData.Nome + ' editado com sucesso', 'success')
      })
      .catch((err) => {
          utils.notification(err.message, 'error')
      })
  }

  useEffect(() => {
    reset({
      Nome: slidePanelState.data?.Nome || ''
    })
  }, [slidePanelState.data, reset])

  const deleteEmail = (email: string) => {
    const novosEmails = slidePanelState.data?.Emails.filter(
      (item: string) => item !== email
    )
    setSlidePanelState((oldState) => {
      return { ...oldState, data: { ...oldState.data, Emails: novosEmails } }
    })
    updateSellerEmail({
      variables: {
        Id: slidePanelState.data?.Id,
        Emails: novosEmails
      }
    })
      .then(() => {
        sellersRefetch()
          utils.notification(email + ' excluido com sucesso', 'success')
      })
      .catch((err) => {
          utils.notification(err.message, 'error')
      })
  }

  const deletePhone = (telefone: string) => {
    const novosTelefones = slidePanelState.data?.Telefones.filter(
      (item: string) => item !== telefone
    )
    setSlidePanelState((oldState) => {
      return {
        ...oldState,
        data: { ...oldState.data, Telefones: novosTelefones }
      }
    })

    updateSellerPhones({
      variables: {
        Id: slidePanelState.data?.Id,
        Telefones: novosTelefones
      }
    })
      .then(() => {
        sellersRefetch()
          utils.notification(telefone + ' excluido com sucesso', 'success')
      })
      .catch((err) => {
          utils.notification(err.message, 'error')
      })
  }

  return (
    <main data-testid="editForm">
      <div className="flex flex-col gap-2 mb-2">
        <form          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center justify-between gap-2 mb-2"
        >
          <div className="flex-1">
            <common.form.Input
              fieldName="Nome"
              register={register}
              title="Nome"
              error={errors.Nome}
              data-testid="inserirNome"
            />
          </div>
          <common.buttons.PrimaryButton
            title="Editar"
            disabled={UpdateSellerLoading}
            loading={UpdateSellerLoading}
            className="mb-3"
          />
        </form>

        <common.Separator />

        <h2 className="mb-3 text-lg font-medium text-gray-900 dark:text-theme-8">
          Emails
        </h2>

        {slidePanelState.data?.Emails.map((item: string) => (
          <div
            className="flex items-center justify-between gap-2 mb-2"
            key={item}
          >
            <ol className="ml-4 list-disc">
              <li>{item}</li>
            </ol>
            <common.icons.DeleteIcon
              className="w-6 h-6 text-white cursor-pointer"
              onClick={() => deleteEmail(item)}
            />
          </div>
        ))}

        <sellers.Emails />

        <common.Separator />

        <h2 className="mb-3 text-lg font-medium text-gray-900 dark:text-theme-8">
          Telefones
        </h2>

        {slidePanelState.data?.Telefones.map((item: string) => (
          <div
            className="flex items-center justify-between gap-2 mb-2"
            key={item}
          >
            <ol className="ml-4 list-disc">
              <li>{utils.phoneFormat(item)}</li>
            </ol>
            <common.icons.DeleteIcon
              className="w-6 h-6 text-white cursor-pointer"
              onClick={() => deletePhone(item)}
            />
          </div>
        ))}

        <sellers.Phones />
      </div>
    </main>
  )
}
