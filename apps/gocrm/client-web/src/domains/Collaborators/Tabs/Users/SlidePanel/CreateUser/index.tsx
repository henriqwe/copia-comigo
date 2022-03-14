import { Controller, useForm } from 'react-hook-form'

import * as common from '@comigo/ui-common'

import * as users from '&crm/domains/Collaborators/Tabs/Users'
import * as collaborator from '&crm/domains/Collaborators'
import { yupResolver } from '@hookform/resolvers/yup'
import * as utils from '@comigo/utils'

import router from 'next/router'
import rotas from '&crm/domains/routes'

type FormData = {
  Id: string
  Email: string
  Senha: string
}

export default function CreateUser() {
  const {
    createUserLoading,
    createUser,
    setSlidePanelState,
    slidePanelState,
    usersRefetch,
    userSchema,
    collaboratorsData
  } = users.useUser()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(userSchema)
  })
  const onSubmit = (formData: FormData) => {
    createUser({
      variables: {
        Email: formData.Email,
        Senha: formData.Senha
      }
    })
      .then(() => {
        usersRefetch()
        setSlidePanelState((oldState) => {
          return { ...oldState, open: false }
        })
        utils.notification('Usuário cadastrado com sucesso', 'success')
      })
      .catch((err) => {
        utils.showError(err)
      })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      data-testid="inserirForm"
      className="flex flex-col items-end"
    >
      <div className="flex flex-col w-full gap-2 mb-2">
        <common.form.Input
          fieldName="Email"
          type="email"
          register={register}
          title="Email"
          error={errors.Email}
          data-testid="createEmail"
        />
        <common.form.Input
          fieldName="Senha"
          type="password"
          register={register}
          title="Senha"
          error={errors.Senha}
          data-testid="createSenha"
        />
      </div>
      <common.Separator />
      <common.buttons.PrimaryButton
        title="Enviar"
        disabled={createUserLoading}
        loading={createUserLoading}
      />
    </form>
  )
}
