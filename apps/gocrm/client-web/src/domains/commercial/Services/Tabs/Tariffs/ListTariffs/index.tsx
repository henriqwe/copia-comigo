import * as common from '@comigo/ui-common';
import * as blocks from '@comigo/ui-blocks';

import * as tariffs from '&crm/domains/commercial/Services/Tabs/Tariffs';
export default function List() {
  const { setSlidePanelState, tariffsData } = tariffs.useTariff();

  return tariffsData ? (
    <div>
      <div className="flex justify-end w-full gap-4 mt-5">
        <common.buttons.SecondaryButton
          handler={() => {
            setSlidePanelState({
              open: true,
            });
          }}
        />
      </div>
      <common.Separator />
      <blocks.Table
        colection={tariffsData}
        columnTitles={[
          {
            title: 'Nome',
            fieldName: 'Nome',
            type: 'relationship',
            relationshipName: 'Tarifa',
          },
        ]}
        actions={tariffs.RowActions}
      />

      <tariffs.SlidePanel />
    </div>
  ) : (
    <blocks.TableSkeleton />
  );
}
