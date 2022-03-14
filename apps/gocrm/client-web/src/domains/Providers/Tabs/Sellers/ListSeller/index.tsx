import * as common from '@comigo/ui-common';

import * as blocks from '@comigo/ui-blocks';
import * as sellers from '&crm/domains/Providers/Tabs/Sellers';

export default function List() {
  const { setSlidePanelState, sellersData } = sellers.useSeller();
  return sellersData ? (
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
        colection={sellersData}
        columnTitles={[{ title: 'Nome', fieldName: 'Nome' }]}
        actions={sellers.RowActions}
      />
      <sellers.SlidePanel />
    </div>
  ) : (
    <blocks.TableSkeleton />
  );
}
