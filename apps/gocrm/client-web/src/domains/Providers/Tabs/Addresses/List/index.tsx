import * as common from '@comigo/ui-common';

import * as blocks from '@comigo/ui-blocks';
import * as adresses from '&crm/domains/Providers/Tabs/Addresses';

export default function List() {
  const { setSlidePanelState, addressesData } = adresses.useAdress();
  return addressesData ? (
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
        colection={addressesData}
        columnTitles={[
          { title: 'Logradouro', fieldName: 'Logradouro' },
          { title: 'Numero', fieldName: 'Numero' },
        ]}
        actions={adresses.RowActions}
      />
      <adresses.SlidePanel />
    </div>
  ) : (
    <blocks.TableSkeleton />
  );
}
