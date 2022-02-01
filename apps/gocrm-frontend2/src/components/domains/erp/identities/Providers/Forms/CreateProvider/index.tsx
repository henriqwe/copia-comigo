import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { GraphQLTypes } from '&test/graphql/generated/zeus'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import rotas from '&test/components/domains/routes'

import * as common from '&test/components/common'
import * as buttons from '&test/components/common/Buttons'
import * as form from '&test/components/common/Form'
import * as providers from '&test/components/domains/erp/identities/Providers'
import { PhysicalPerson } from './physicalPerson'
import { LegalPerson } from './legalPerson'
import { identifierUnformat } from '&test/utils/formaters'
import { notification } from '&test/utils/notification'
import { showError } from '&test/utils/showError'

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
        Identificador: identifierUnformat(formData.Identificador),
        PessoaJuridica: tipoDePessoaSelecionada !== 'pj' ? false : true
      }
    })
      .then((resposta) => {
        router.push(
          `${rotas.erp.identidades.fornecedores.index}/${resposta?.data.CadastrarFornecedor.Id}`
        )

        notification(
          formData.Identificador + ' cadastrado com sucesso',
          'success'
        )
      })
      .catch((erros) => showError(erros))
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
        <form.FormLine grid={2} position={1}>
          <div className="flex items-center justify-center p-8">
            <section className="w-9/12 gap-2 text-center">
              <h4 className="mb-4 font-normal text-gray-800 dark:text-gray-400">
                Para seguir com o cadastro, selecione o{' '}
                <span className="text-theme-11">tipo de de fornecedor </span>
                que será cadastrado
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
                Informe o número do documento
              </h4>
              {tipoDePessoaSelecionada !== 'pf' ? (
                <form.CNPJInput
                  register={register}
                  error={errors.Identificador}
                  control={control}
                  disabled={tipoDePessoaSelecionada === ''}
                />
              ) : (
                <form.CPFInput
                  register={register}
                  error={errors.Identificador}
                  control={control}
                />
              )}
            </section>
          </div>
        </form.FormLine>
        <div className="flex items-center justify-between w-full px-6 mt-4">
          <buttons.GoBackButton />
          <buttons.PrimaryButton
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
