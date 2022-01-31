import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { GraphQLTypes } from '&crm/graphql/generated/zeus'

 import * as utils from '@comigo/utils'
import * as common from '@comigo/ui-common'
 
 

import * as clients from '&crm/domains/identities/Clients'
import * as phones from '&crm/domains/identities/Clients/Tabs/Phones'

 

export default function CreatePhone() {
  const {
    setSlidePanelState,
    createPhone,
    createPhoneLoading,
    phonesRefetch,
    phoneSchema
  } = phones.usePhone()
  const { clientData } = clients.useUpdate()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(phoneSchema)
  })
  const onSubmit = (formData: GraphQLTypes['contatos_Telefones']) => {
    createPhone({
      variables: {
        Telefone: utils.phoneUnformat(formData.Telefone),
        Identidades: { cliente: clientData?.Id },
        Categorias: [`${formData.Categorias.key}`],
        NomeDoResponsavel: formData.NomeDoResponsavel
      }
    })
      .then(() => {
        phonesRefetch()
        setSlidePanelState((oldState) => {
          return { ...oldState, open: false }
        })
          utils.notification('Telefone cadastrado com sucesso', 'success')
      })
      .catch((erros) => {
        utils.showError(erros)
      })
  }

  return (
    <form      onSubmit={handleSubmit(onSubmit)}
      data-testid="inserirForm"
      className="flex flex-col items-end"
    >
      <div className="flex flex-col w-full gap-2 mb-2">
        <common.form.BRPhoneInput error={errors.Telefone} control={control} />
      </div>
      <div className="flex flex-col w-full gap-2 mb-2">
        <common.form.Input
          fieldName="NomeDoResponsavel"
          register={register}
          title="Responsável"
          error={errors.NomeDoResponsavel}
          data-testid="cadastrarNomeDoResponsavel"
        />
      </div>

      <Controller
        control={control}
        name="Categorias"
        render={({ field: { onChange, value } }) => (
          <div className="flex flex-col w-full gap-2 mb-2">
            <common.form.Select
              itens={[
                { key: 'comercial', title: 'Comercial' },
                { key: 'residencial', title: 'Residencial' }
              ]}
              value={value}
              onChange={onChange}
              error={errors.Categorias}
              label="Categorias"
            />
          </div>
        )}
      />

      <common.Separator />

      <common.buttons.PrimaryButton
        title="Cadastrar"
        disabled={createPhoneLoading}
        loading={createPhoneLoading}
      />
    </form>
  )
}
