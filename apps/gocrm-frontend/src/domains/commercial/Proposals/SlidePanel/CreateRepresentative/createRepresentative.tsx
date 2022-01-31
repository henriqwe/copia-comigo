import { useState } from 'react'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
 import * as utils from '@comigo/utils'
 
// import { PhysicalPerson } from '../CreateClient/physicalPerson'
// import { LegalPerson } from '../CreateClient/legalPerson'
import { GraphQLTypes } from '&crm/graphql/generated/zeus'


import * as common from '@comigo/ui-common'
 
 
import * as client from '&crm/domains/identities/Clients'
import * as representative from '&crm/domains/identities/Clients/Tabs/Representative'

type FormType = Pick<GraphQLTypes['identidades_Pessoas'], 'Identificador'>

export default function CreateRepresentative() {
  const {
    createRepresentativeLoading,
    createRepresentative,
    CPFSchema,
    CNPJSchema,
    setSlidePanelState,
    representativesDataRefetch
  } = representative.useRepresentative()

  const { clientData } = client.useUpdate()

  const [kindOfPerson, setKindOfPerson] = useState('')

  const {
    register,
    control,
    formState: { errors },
    handleSubmit
  } = useForm({
    resolver: yupResolver(kindOfPerson !== 'pj' ? CPFSchema : CNPJSchema)
  })

  async function onSubmit(formData: FormType) {
    await createRepresentative({
      variables: {
        Identificador: utils.identifierUnformat(formData.Identificador),
        PessoaJuridica: kindOfPerson !== 'pj' ? false : true,
        PessoaRepresentada: clientData?.Pessoa.Id
      }
    })
      .then((/*resposta*/) => {
          utils.notification(
          formData.Identificador + ' cadastrado com sucesso',
          'success'
        )
        setSlidePanelState((oldState) => {
          return { ...oldState, open: false }
        })
        representativesDataRefetch()
      })
      .catch((erros) => {
        console.log(erros)
        utils.showError(erros)
      })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-center p-4">
          <section className="w-9/12 gap-2 text-center">
            {/* <common.ListRadioGroup
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
              setSelectedOption={setKindOfPerson}
            /> */}
          </section>
        </div>
        <div className="flex items-center justify-center flex-1 w-full">
          <section className="flex flex-col w-11/12 gap-2">
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

            <div>
              <common.buttons.PrimaryButton
                title="Adicionar"
                disabled={createRepresentativeLoading}
                loading={createRepresentativeLoading}
              // disabled={kindOfPerson !== ''}
              />
            </div>
          </section>
        </div>
      </div>
    </form>
  )
}
