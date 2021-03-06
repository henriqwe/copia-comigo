import { useRouter } from 'next/router';
import { useForm, Controller } from 'react-hook-form';

import rotas from '&crm/domains/routes';

import * as common from '@comigo/ui-common';

import * as leads from '&crm/domains/services/Leads';
import * as questionsGroups from '&crm/domains/services/Registration/Questions/Groups';
import * as businessProfiles from '&crm/domains/services/BusinessProfiles';
import { useState } from 'react';
import * as utils from '@comigo/utils';

type Questions = {
  Id: string;
  Pergunta: {
    Id: string;
    Titulo: string;
    Descricao: string;
  };
};

type CreateBusinessProfileProps = {
  Lead_Id: string | null;
  Lead_Nome: string | null;
};

const CreateBusinessProfile = ({
  Lead_Id,
  Lead_Nome,
}: CreateBusinessProfileProps) => {
  const [questions, setQuestions] = useState<Questions[]>([]);
  const router = useRouter();

  const { questionsGroupsData } = questionsGroups.useList();
  const { leadsData } = leads.useLead();
  const { createBusinessProfile, createBusinessProfileLoading } =
    businessProfiles.useCreate();
  const { control, handleSubmit, register, watch } = useForm();

  async function onSubmit(data: any) {
    try {
      const questionsValues = questions.map((_, index) => {
        if (!data['Resposta' + index]) {
          return;
        }

        return {
          Lead_Id: data['Lead_Id'].key,
          Grupo_Id: data['Grupo_Id'].key.Id,
          Resposta: data['Resposta' + index],
          Pergunta_Id: data['Pergunta_Id' + index].key,
        };
      });

      if (questionsValues.includes(undefined)) {
        throw new Error('Preencha todos os campos para continuar');
      }

      await createBusinessProfile({
        variables: {
          data: questionsValues,
        },
      }).then(async () => {
        router.push(rotas.atendimento.perfisComerciais.index);
        utils.notification('Perfil comercial criado com sucesso', 'success');
      });
    } catch (err: any) {
      utils.showError(err);
    }
  }

  function disableMainButton() {
    const questionsArray: any[] = [];
    questions.map((_, index) => {
      questionsArray.push(watch('Resposta' + index));
    });
    if (questionsArray.includes(undefined) || questionsArray.includes('')) {
      return true;
    }
    return watch('Grupo_Id') === undefined || createBusinessProfileLoading;
  }

  return (
    <common.Card>
      <form>
        {' '}
        <common.GenericTitle
          title="Dados do principais"
          subtitle="Item e tipos"
          className="px-6"
        />
        <common.Separator />
        <common.form.FormLine grid={3} position={1}>
          <Controller
            control={control}
            name="Lead_Id"
            defaultValue={
              Lead_Id ? { key: Lead_Id, title: Lead_Nome } : undefined
            }
            render={({ field: { onChange, value } }) => (
              <div>
                <common.form.Select
                  itens={
                    leadsData
                      ? leadsData.map((item) => {
                          return {
                            key: item.Id,
                            title: item.Nome,
                          };
                        })
                      : []
                  }
                  value={value}
                  onChange={onChange}
                  label="Lead"
                  disabled={Lead_Id !== null}
                />
                <common.OpenModalLink
                  onClick={() => router.push(rotas.atendimento.leads)}
                >
                  Cadastrar lead
                </common.OpenModalLink>
              </div>
            )}
          />

          <Controller
            name="Grupo_Id"
            control={control}
            render={({ field: { onChange, value } }) => (
              <div>
                <common.form.Select
                  itens={
                    questionsGroupsData
                      ? questionsGroupsData.map((item) => {
                          return {
                            key: item,
                            title: item.Nome,
                          };
                        })
                      : []
                  }
                  value={value}
                  onChange={(e) => {
                    setQuestions(e.key.Perguntas);
                    onChange(e);
                  }}
                  label="Grupo de pergunta"
                />
                <common.OpenModalLink
                  onClick={() =>
                    router.push(
                      rotas.atendimento.cadastros.perguntas.grupos.cadastrar
                    )
                  }
                >
                  Cadastrar grupo de pergunta
                </common.OpenModalLink>
              </div>
            )}
          />
        </common.form.FormLine>
        {questions?.length === 0 ? (
          <div />
        ) : (
          <>
            <div className="mt-2">
              <common.GenericTitle
                title="Dados das quest??es"
                subtitle="Pergunta e Resposta"
                className="px-6"
              />
              <common.Separator />
            </div>

            {questions.map((question, index) => (
              <common.form.FormLine position={index} grid={1} key={index}>
                <div>
                  <h2 className="mb-1 text-lg">{question.Pergunta.Titulo}</h2>
                  <p className="mb-2 text-sm">{question.Pergunta.Descricao}</p>
                  <Controller
                    name={'Pergunta_Id' + index}
                    defaultValue={{
                      key: question.Pergunta.Id,
                      title: question.Pergunta.Titulo,
                    }}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <common.form.Select
                        itens={[]}
                        value={value}
                        onChange={onChange}
                        disabled
                        label="Pergunta"
                        className="hidden"
                      />
                    )}
                  />

                  <common.form.Input
                    fieldName={'Resposta' + index}
                    title="Resposta"
                    register={register}
                  />
                </div>
              </common.form.FormLine>
            ))}
          </>
        )}
      </form>
      <div className="flex items-center justify-between w-full px-6 mt-4">
        <common.buttons.GoBackButton />
        <common.buttons.PrimaryButton
          title="Cadastrar"
          disabled={disableMainButton()}
          onClick={handleSubmit(onSubmit)}
          loading={createBusinessProfileLoading}
        />
      </div>
    </common.Card>
  );
};

export default CreateBusinessProfile;
