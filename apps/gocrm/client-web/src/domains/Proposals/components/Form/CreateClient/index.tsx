import * as proposals from '&crm/domains/Proposals'
import * as common from '@comigo/ui-common'
import * as utils from '@comigo/utils'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { LegalPerson } from './legalPerson'
import { PhysicalPerson } from './physicalPerson'
import { GraphQLTypes } from '&crm/graphql/generated/zeus'

type FormType = Pick<GraphQLTypes['identidades_Pessoas'], 'Identificador'>

export function CreateClient() {
  const [kindOfPerson, setkindOfPerson] = useState('')
  const {
    createClient,
    CPFSchema,
    CNPJSchema,
    createClientLoading,
    insertClientToProposal,
    proposalRefetch,
    runClientQuery,
    setSlidePanelState
  } = proposals.useUpdate()

  const {
    register,
    formState: { errors },
    handleSubmit,
    control
  } = useForm({
    resolver: yupResolver(kindOfPerson !== 'pj' ? CPFSchema : CNPJSchema)
  })

  async function onSubmit(formData: FormType) {
    try {
      const client = await createClient({
        variables: {
          Identificador: utils.identifierUnformat(formData.Identificador),
          PessoaJuridica: kindOfPerson !== 'pj' ? false : true
        }
      })

      await insertClientToProposal({
        variables: {
          Cliente_Id: client?.data.CadastrarCliente.Id
        }
      })

      proposalRefetch()
      utils.notification(
        formData.Identificador + ' cadastrado com sucesso',
        'success'
      )
    } catch (err) {
      utils.showError(err)
    }
  }

  return (
    <common.Card>
      <form>
        <common.form.FormLine grid={2} position={1}>
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
                setSelectedOption={setkindOfPerson}
              />
            </section>
          </div>
          <div className="flex items-center justify-center flex-1 w-full">
            <section className="flex flex-col w-9/12 gap-2">
              <h4 className="font-light text-gray-900 dark:text-gray-400">
                Informe o número do documento
              </h4>
              {kindOfPerson !== 'pf' ? (
                <common.form.CNPJInput
                  register={register}
                  error={errors.Identificador}
                  control={control}
                  disabled={kindOfPerson === ''}
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
          <div className="flex gap-2">
            <common.buttons.PrimaryButton
              onClick={() => {
                runClientQuery()
                setSlidePanelState({
                  open: true,
                  type: 'linkClient'
                })
              }}
              type="button"
              title="Vincular cliente existente"
              disabled={createClientLoading}
              loading={createClientLoading}
              // disabled={tipoDePessoaSelecionada !== ''}
            />
            <common.buttons.PrimaryButton
              onClick={handleSubmit(onSubmit)}
              title="Cadastrar"
              disabled={createClientLoading}
              loading={createClientLoading}
              // disabled={tipoDePessoaSelecionada !== ''}
            />
          </div>
        </div>
      </form>
      <proposals.UpdateSlidePanel />
    </common.Card>
  )
}
