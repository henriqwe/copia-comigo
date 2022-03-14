import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { GraphQLTypes } from '&crm/graphql/generated/zeus';
import * as common from '@comigo/ui-common';
import * as blocks from '@comigo/ui-blocks';

import * as sellers from '&crm/domains/Providers/Tabs/Sellers';
import * as utils from '@comigo/utils';

export default function CreateSeller() {
  const {
    setSlidePanelState,
    sellerSchema,
    createSeller,
    createSellerLoading,
    sellersRefetch,
  } = sellers.useSeller();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(sellerSchema),
  });
  const onSubmit = (formData: GraphQLTypes['identidades_Vendedores']) => {
    createSeller({
      variables: {
        Nome: formData.Nome,
      },
    })
      .then(() => {
        sellersRefetch();
        setSlidePanelState((oldState) => {
          return { ...oldState, open: false };
        });
        utils.notification(
          formData.Nome + ' cadastrado com sucesso',
          'success'
        );
      })
      .catch((err) => {
        utils.notification(err.message, 'error');
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-testid="inserirForm">
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex-1">
          <common.form.Input
            fieldName="Nome"
            register={register}
            title="Nome"
            error={errors.Nome}
            data-testid="inserirNome"
          />
        </div>
        <common.buttons.PrimaryButton
          title="Salvar"
          disabled={createSellerLoading}
          loading={createSellerLoading}
          className="mb-3"
        />
      </div>
    </form>
  );
}
