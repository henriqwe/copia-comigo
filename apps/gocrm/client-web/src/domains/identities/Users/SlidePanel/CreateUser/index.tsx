import { Controller, useForm } from 'react-hook-form';

import * as common from '@comigo/ui-common';

import * as users from '&crm/domains/identities/Users';
import * as clients from '&crm/domains/identities/Clients';

import { yupResolver } from '@hookform/resolvers/yup';
import * as utils from '@comigo/utils';

import router from 'next/router';
import rotas from '&crm/domains/routes';

type FormData = {
  Id: string;
  Cliente_Id: {
    key: string;
    title: string;
  };
  Colaborador_Id: {
    key: string;
    title: string;
  };
};

export default function CreateUser() {
  const {
    createUserLoading,
    createUser,
    setSlidePanelState,
    usersRefetch,
    userSchema,
    collaboratorsData,
  } = users.useUser();
  const { clientsData } = clients.useList();
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(userSchema),
  });
  const onSubmit = (formData: FormData) => {
    try {
      if (
        formData.Cliente_Id === undefined &&
        formData.Colaborador_Id === undefined
      ) {
        throw new Error('Preencha um campo para continuar');
      }
      createUser({
        variables: {
          Cliente_Id: formData.Cliente_Id ? formData.Cliente_Id.key : null,
          Colaborador_Id: formData.Colaborador_Id
            ? formData.Colaborador_Id.key
            : null,
        },
      }).then(() => {
        usersRefetch();
        setSlidePanelState((oldState) => {
          return { ...oldState, open: false };
        });
        utils.notification('Usuário cadastrado com sucesso', 'success');
      });
    } catch (err: any) {
      utils.showError(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      data-testid="inserirForm"
      className="flex flex-col items-end"
    >
      <div className="flex flex-col w-full gap-2 mb-2">
        <Controller
          control={control}
          name="Cliente_Id"
          render={({ field: { onChange, value } }) => (
            <div>
              <common.form.Select
                itens={
                  clientsData
                    ? clientsData.map((item) => {
                        return {
                          key: item.Id,
                          title: item.Pessoa?.Nome as string,
                        };
                      })
                    : []
                }
                value={value}
                onChange={onChange}
                error={errors.Cliente_Id}
                label="Cliente"
              />
              <common.OpenModalLink
                onClick={() =>
                  router.push(rotas.identidades.clientes.cadastrar)
                }
              >
                Cadastrar Cliente
              </common.OpenModalLink>
            </div>
          )}
        />
        <Controller
          control={control}
          name="Colaborador_Id"
          render={({ field: { onChange, value } }) => (
            <div>
              <common.form.Select
                itens={
                  collaboratorsData
                    ? collaboratorsData.map((item) => {
                        return {
                          key: item.Id,
                          title: item.Pessoa.Nome,
                        };
                      })
                    : []
                }
                value={value}
                onChange={onChange}
                error={errors.Colaborador_Id}
                label="Colaborador"
              />
            </div>
          )}
        />
      </div>
      <common.Separator />
      <common.buttons.PrimaryButton
        title="Enviar"
        disabled={createUserLoading}
        loading={createUserLoading}
      />
    </form>
  );
}
