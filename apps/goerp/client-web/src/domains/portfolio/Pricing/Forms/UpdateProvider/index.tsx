import { useEffect } from 'react';

import * as common from '@comigo/ui-common';

import * as providers from '&erp/domains/portfolio/Pricing';
import { useForm } from 'react-hook-form';

export function Update() {
  const { providerData } = providers.useUpdate();

  const { register, reset } = useForm();

  useEffect(() => {
    reset({
      Nome: providerData?.Nome || '',
    });
  }, [providerData, reset]);

  return (
    <div className="flex flex-col gap-4">
      <common.Card>
        <common.GenericTitle
          title="Dados gerais"
          subtitle="Dados básicos do Fornecedor"
          className="px-6"
        />
        <common.Separator className="mb-0" />
        <form>
          <common.form.FormLine position={1} grid={2}>
            <common.form.Input
              fieldName="Nome"
              title="Nome"
              register={register}
              disabled={true}
            />
          </common.form.FormLine>

          <div className="flex items-center justify-between w-full px-6">
            <common.buttons.GoBackButton />
          </div>
        </form>
      </common.Card>
    </div>
  );
}
