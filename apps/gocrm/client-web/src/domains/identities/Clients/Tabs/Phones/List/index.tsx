import * as common from '@comigo/ui-common';

import * as blocks from '@comigo/ui-blocks';
import * as phones from '&crm/domains/identities/Clients/Tabs/Phones';

import * as utils from '@comigo/utils';

export default function List() {
  const { setSlidePanelState, phonesData } = phones.usePhone();
  return phonesData ? (
    <div>
      <div className="flex justify-end w-full mt-5">
        <common.buttons.SecondaryButton
          handler={() => {
            setSlidePanelState({ open: true, type: 'create' });
          }}
        />
      </div>
      <common.Separator />
      <blocks.Table
        colection={phonesData}
        columnTitles={[
          {
            title: 'Telefone',
            fieldName: 'Telefone',
            type: 'handler',
            handler: (numero) => {
              return utils.phoneFormat(numero);
            },
          },
          { title: 'Responsável', fieldName: 'NomeDoResponsavel' },
        ]}
        actions={phones.RowActions}
      />
      <phones.SlidePanel />
    </div>
  ) : (
    <blocks.TableSkeleton />
  );
}
