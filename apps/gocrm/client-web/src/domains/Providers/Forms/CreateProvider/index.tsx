import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { GraphQLTypes } from '&crm/graphql/generated/zeus'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import rotas from '&crm/domains/routes'

import * as common from '@comigo/ui-common'

import * as providers from '&crm/domains/Providers'
import { PhysicalPerson } from './physicalPerson'
import { LegalPerson } from './legalPerson'

import * as utils from '@comigo/utils'

type FormType = Pick<GraphQLTypes['identidades_Pessoas'], 'Identificador'>

export default function CreateProvider() {
  const router = useRouter()
  const { createProviderLoading, createProvider, CPFSchema, CNPJSchema } =
    providers.useCreate()
  const [tipoDePessoaSelecionada, setTipoDePessoaSelecionada] = useState('')

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset
  } = useForm({
    resolver: yupResolver(
      tipoDePessoaSelecionada !== 'pj' ? CPFSchema : CNPJSchema
    )
  })

  async function onSubmit(formData: FormType) {
    await createProvider({
      variables: {
        Identificador: utils.identifierUnformat(formData.Identificador),
        PessoaJuridica: tipoDePessoaSelecionada !== 'pj' ? false : true
      }
    })
      .then((resposta) => {
        router.push(
          `${rotas.fornecedores.index}/${resposta?.data.CadastrarFornecedor.Id}`
        )

        utils.notification(
          formData.Identificador + ' cadastrado com sucesso',
          'success'
        )
      })
      .catch((erros) => utils.showError(erros))
  }

  useEffect(() => {
    reset({
      Identificador: ''
    })
  }, [reset, tipoDePessoaSelecionada])

  return (
    <common.Card>
      <common.GenericTitle
        title={'CPF ou CNPJ'}
        subtitle={
          'Informe o identificador do fornecedor para continuar o cadastro.'
        }
        className="px-6"
      />
      <common.Separator />
      <form onSubmit={handleSubmit(onSubmit)}>
        <common.form.FormLine grid={2} position={1}>
          <div className="flex items-center justify-center p-8">
            <section className="w-9/12 gap-2 text-center">
              <h4 className="mb-4 font-normal text-gray-800 dark:text-gray-400">
                Para seguir com o cadastro, selecione o{' '}
                <span className="text-theme-11">tipo de de fornecedor </span>
                que ser?? cadastrado
              </h4>
              <common.ListRadioGroup
                options={[
                  {
                    value: 'pf',
                    content: <PhysicalPerson />
                  },
                  {
                    value: 'pj',
                    content: <LegalPerson />
                  }
                ]}
                setSelectedOption={setTipoDePessoaSelecionada}
              />
            </section>
          </div>
          <div className="flex items-center justify-center flex-1 w-full">
            <section className="flex flex-col w-9/12 gap-2">
              <h4 className="font-light text-gray-900 dark:text-gray-400">
                Informe o n??mero do documento
              </h4>
              {tipoDePessoaSelecionada !== 'pf' ? (
                <common.form.CNPJInput
                  register={register}
                  error={errors.Identificador}
                  control={control}
                  disabled={tipoDePessoaSelecionada === ''}
                />
              ) : (
                <common.form.CPFInput
                  register={register}
                  error={errors.Identificador}
                  control={control}
                />
              )}
            </section>
          </div>
        </common.form.FormLine>
        <div className="flex items-center justify-between w-full px-6 mt-4">
          <common.buttons.GoBackButton />
          <common.buttons.PrimaryButton
            title="Cadastrar"
            disabled={createProviderLoading}
            loading={createProviderLoading}
            // disabled={tipoDePessoaSelecionada !== ''}
          />
        </div>
      </form>
    </common.Card>
  )
}
