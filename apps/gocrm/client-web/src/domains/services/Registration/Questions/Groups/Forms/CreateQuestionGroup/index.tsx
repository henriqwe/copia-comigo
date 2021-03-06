import { useRouter } from 'next/router';
import { useForm, Controller } from 'react-hook-form';

import rotas from '&crm/domains/routes';

import * as common from '@comigo/ui-common';

import * as questionsGroup from '&crm/domains/services/Registration/Questions/Groups';
import * as questions from '&crm/domains/services/Registration/Questions';
import { useEffect, useState } from 'react';
import * as utils from '@comigo/utils';

import { yupResolver } from '@hookform/resolvers/yup';

const CreateQuestionsGroup = () => {
  const [questionsGroups, setquestionsGroups] = useState<number[]>([1]);
  const [lastNumber, setlastNumber] = useState(0);
  const router = useRouter();
  const { questionsData, setSlidePanelState } = questions.useQuestion();
  const [questionsArray, setQuestionsArray] = useState(questionsData);
  const [reload, setReload] = useState(false);
  const {
    createQuestionsGroupLoading,
    createQuestionsGroup,
    questionGroupSchema,
  } = questionsGroup.useCreate();
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm({ resolver: yupResolver(questionGroupSchema) });

  async function onSubmit(data: any) {
    try {
      const filteredQuestionsGroups = questionsGroups.filter(
        (question) => question !== 0
      );
      const itensValues = filteredQuestionsGroups.map((question) => {
        if (!data['Pergunta_Id' + question]) {
          return;
        }

        return {
          Pergunta_Id: data['Pergunta_Id' + question].key,
        };
      });

      if (itensValues.includes(undefined)) {
        throw new Error('Selecione todas as perguntas para continuar');
      }

      await createQuestionsGroup({
        variables: {
          Nome: data.Nome,
          data: itensValues,
        },
      }).then(() => {
        router.push(rotas.atendimento.cadastros.perguntas.grupos.index);
        utils.notification(data.Nome + ' criado com sucesso', 'success');
      });
    } catch (err: any) {
      utils.showError(err);
    }
  }

  useEffect(() => {
    if (questionsGroups[questionsGroups.length - 1] > lastNumber) {
      setlastNumber(questionsGroups[questionsGroups.length - 1]);
    }
  }, [questionsGroups]);

  useEffect(() => {
    const selectedItens = questionsGroups.map((question) => {
      if (watch('Pergunta_Id' + question) !== undefined) {
        return watch('Pergunta_Id' + question).key;
      }
    });

    const unSelectedItens = questionsData?.filter((questionData) => {
      return !selectedItens.includes(questionData.Id);
    });
    setQuestionsArray(
      unSelectedItens?.map((unSelectedItem) => {
        return {
          Id: unSelectedItem.Id,
          Titulo: unSelectedItem.Titulo,
          Descricao: unSelectedItem.Descricao,
        };
      })
    );
  }, [questionsGroups.length]);

  useEffect(() => {
    setQuestionsArray(questionsData);
  }, [questionsData]);

  return (
    <common.Card>
      <common.GenericTitle
        title="Dados do grupo de pergunta"
        subtitle="Nome, perguntas"
        className="px-6"
      />

      <common.Separator />
      <form>
        {' '}
        <common.form.FormLine position={1} grid={3}>
          <common.form.Input
            fieldName="Nome"
            register={register}
            title="Nome"
            error={errors.Nome}
            data-testid="editNome"
          />
        </common.form.FormLine>
        {questionsGroups.map(
          (question, index) =>
            question !== 0 && (
              <common.form.FormLine position={index} grid={3} key={index}>
                <Controller
                  control={control}
                  name={'Pergunta_Id' + question}
                  render={({ field: { onChange, value } }) => (
                    <div className="col-span-2">
                      <common.form.Select
                        itens={
                          questionsArray
                            ? questionsArray.map((question) => {
                                return {
                                  key: question.Id,
                                  title:
                                    question.Titulo +
                                    ' - ' +
                                    question.Descricao,
                                };
                              })
                            : []
                        }
                        value={value}
                        onChange={(newValue) => {
                          setQuestionsArray(() => {
                            if (value !== undefined) {
                              questionsArray?.push({
                                Id: value.key,
                                Titulo: value.title.split(' - ')[0],
                                Descricao: value.title.split(' - ')[1],
                              });
                            }
                            return questionsArray?.filter((item) => {
                              return item.Id !== newValue.key;
                            });
                          });
                          onChange(newValue);
                        }}
                        label="Pergunta"
                      />
                      <common.OpenModalLink
                        onClick={() =>
                          setSlidePanelState({ open: true, type: 'create' })
                        }
                      >
                        Cadastrar pergunta
                      </common.OpenModalLink>
                    </div>
                  )}
                />
                {question !== 1 && (
                  <common.buttons.DeleteButton
                    onClick={() => {
                      questionsGroups[index] = 0;
                      setReload(!reload);
                    }}
                  />
                )}
              </common.form.FormLine>
            )
        )}
        {!createQuestionsGroupLoading && (
          <common.AddForm
            array={questionsGroups}
            setArray={setquestionsGroups}
            lastNumber={lastNumber}
          >
            Adicionar outra pergunta
          </common.AddForm>
        )}
      </form>
      <div className="flex items-center justify-between w-full px-6 mt-4">
        <common.buttons.GoBackButton />
        <common.buttons.PrimaryButton
          title="Cadastrar"
          disabled={createQuestionsGroupLoading}
          onClick={handleSubmit(onSubmit)}
          loading={createQuestionsGroupLoading}
        />
      </div>
      <questions.SlidePanel />
    </common.Card>
  );
};

export default CreateQuestionsGroup;
