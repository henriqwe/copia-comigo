import { useForm } from 'react-hook-form';

import * as common from '@comigo/ui-common';

import * as questions from '&crm/domains/services/Registration/Questions';

import { yupResolver } from '@hookform/resolvers/yup';
import * as utils from '@comigo/utils';

type FormData = {
  Titulo: string;
  Descricao: string;
};

export default function CreateQuestion() {
  const {
    createQuestionLoading,
    createQuestion,
    setSlidePanelState,
    questionsRefetch,
    questionSchema,
  } = questions.useQuestion();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(questionSchema),
  });
  const onSubmit = (formData: FormData) => {
    createQuestion({
      variables: {
        Titulo: formData.Titulo,
        Descricao: formData.Descricao,
      },
    })
      .then(() => {
        questionsRefetch();
        setSlidePanelState((oldState) => {
          return { ...oldState, open: false };
        });
        utils.notification(
          formData.Titulo + ' cadastrado com sucesso',
          'success'
        );
      })
      .catch((err) => {
        utils.showError(err);
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      data-testid="inserirForm"
      className="flex flex-col items-end"
    >
      <div className="flex flex-col w-full gap-2 mb-2">
        <common.form.Input
          fieldName="Titulo"
          register={register}
          title="Título"
          error={errors.Titulo}
          data-testid="editTitulo"
        />
        <common.form.Input
          fieldName="Descricao"
          register={register}
          title="Descrição"
          error={errors.Descricao}
          data-testid="editDescricao"
        />
      </div>
      <common.Separator />
      <common.buttons.PrimaryButton
        title="Enviar"
        disabled={createQuestionLoading}
        loading={createQuestionLoading}
      />
    </form>
  );
}
