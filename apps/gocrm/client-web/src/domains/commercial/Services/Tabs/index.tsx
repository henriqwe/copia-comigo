import * as blocks from '@comigo/ui-blocks'

import { List as ServicesList } from './Services'
import { List as ProductsList } from './Products'
import { List as UpSellingList } from './UpSelling'
import { List as AtributesList } from './Attributes'
import { List as TariffsList } from './Tariffs'
import { List as AlertsList } from './Alerts'

const sections = {
  ['Produtos relacionados']: <ProductsList />,
  ['Serviços relacionados']: <ServicesList />,
  Oportunidades: <UpSellingList />,
  Atributos: <AtributesList />,
  Tarifas: <TariffsList />,
  Regras: <AlertsList />
}

export default function Tabs() {
  return <blocks.Tabs categories={sections} />
}
