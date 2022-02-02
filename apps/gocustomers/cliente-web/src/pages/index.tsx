import * as blocks from '@comigo/ui-blocks';
import MainMenuItens from '../components/domains/MainMenuItens';
import React from 'react';

export default function Index() {
  return (
      <Page />
  );
}

export function Page() {
  
  return (
    <div className="flex max-h-screen">
      <div className="sticky top-0 z-50 h-screen">
        <blocks.SideBarGoCustomers mainMenuItens={MainMenuItens} />
      </div>
      <div>
        Dashboard
      </div>
    </div>
  );
}
