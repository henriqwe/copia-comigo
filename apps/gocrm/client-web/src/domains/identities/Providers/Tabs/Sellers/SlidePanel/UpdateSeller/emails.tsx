import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import * as common from '@comigo/ui-common';
import * as blocks from '@comigo/ui-blocks';

import * as sellers from '&crm/domains/identities/Providers/Tabs/Sellers';
import * as utils from '@comigo/utils';

export default function Emails() {
  const {
    updateSellerEmail,
    updateSellerEmailLoading,
    sellersRefetch,
    slidePanelState,
    setSlidePanelState,
    emailsSchema,
  } = sellers.useSeller();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(emailsSchema),
  });

  const onSubmit = (formData: { Email: string }) => {
    setSlidePanelState((oldState) => {
      return {
        ...oldState,
        data: {
          ...oldState.data,
          Emails: [...oldState.data?.Emails, formData.Email],
        },
      };
    });
    updateSellerEmail({
      variables: {
        Id: slidePanelState.data?.Id,
        Emails: [...slidePanelState.data?.Emails, formData.Email],
      },
    })
      .then(() => {
        sellersRefetch();
        reset({
          Email: '',
        });
        utils.notification(
          formData.Email + ' cadastrado com sucesso',
          'success'
        );
      })
      .catch((err) => {
        utils.notification(err.message, 'error');
      });
  };

  return (
    <form
      data-testid="inserirForm"
      className="flex items-center justify-between gap-2 mb-2"
    >
      <div className="flex-1">
        <common.form.Input
          fieldName={`Email`}
          register={register}
          title={`E-mail`}
          error={errors.Email}
        />
      </div>
      <common.buttons.SecondaryButton
        handler={handleSubmit(onSubmit)}
        loading={updateSellerEmailLoading}
        disabled={updateSellerEmailLoading}
        className="w-8 h-full"
      />
    </form>
  );
}
