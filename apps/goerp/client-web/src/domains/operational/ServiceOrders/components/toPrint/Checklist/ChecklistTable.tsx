import { InfoDetails } from '../InfoDetails'

import * as common from '@comigo/ui-common'
import * as blocks from '@comigo/ui-blocks'

export function CheckListTable({ itensChecklist, title, signature = false }) {
  const leftSide = []
  const rightSide = []
  let count = 0
  itensChecklist.forEach((item) => {
    switch (count) {
      case 0:
        leftSide.push(item)
        break
      case 1:
        rightSide.push(item)
        break
    }
    if (count === 1) {
      count = 0
      return
    }
    count++
  })
  return (
    <div className="flex flex-col">
      <div className="">
        <InfoDetails title={''} subtitle={title} />
      </div>
      <div className=" grid  grid-cols-12 gap-4">
        <div className="col-span-6 grid ">
          <blocks.BorderLessTable
            colection={leftSide}
            columnTitles={[
              {
                title: 'Descrição',
                fieldName: 'Descricao'
              },
              {
                title: <common.icons.AuthorizationIcon />,
                fieldName: '',
                type: 'handler',
                handler: () => (
                  <div className="w-4 h-4 border-2 border-gray-600 " />
                )
              },
              {
                title: <common.icons.RemoveSelectItemIcon />,
                fieldName: '',
                type: 'handler',
                handler: () => (
                  <div className="w-4 h-4 border-2 border-gray-600 " />
                )
              }
            ]}
          />
        </div>

        <div className="col-span-6 grid">
          <blocks.BorderLessTable
            colection={rightSide}
            columnTitles={[
              {
                title: 'Descrição',
                fieldName: 'Descricao'
              },
              {
                title: <common.icons.AuthorizationIcon />,
                fieldName: '',
                type: 'handler',
                handler: () => (
                  <div className="w-4 h-4 border-2 border-gray-600 " />
                )
              },
              {
                title: <common.icons.RemoveSelectItemIcon />,
                fieldName: '',
                type: 'handler',
                handler: () => (
                  <div className="w-4 h-4 border-2 border-gray-600 " />
                )
              }
            ]}
          />
        </div>
      </div>
      <div className={` flex items-center ${signature ? 'mt-4' : ' -mt-9'}`}>
        <div className="font-semibold text-xs mr-4">Fiação do veículo</div>
        <div className="flex items-center mr-4 ">
          <div className="w-4 h-4 border-2 border-gray-600 mr-2 text-xs" />
          Precária / Solta
        </div>
        <div className="flex items-center  mr-4">
          <div className="w-4 h-4 border-2 border-gray-600 mr-2 text-xs" />
          Regular
        </div>
        <div className="flex items-center  mr-4">
          <div className="w-4 h-4 border-2 border-gray-600 mr-2 text-xs" />
          Ok
        </div>
      </div>
      <div className=" grid grid-cols-12 mt-8">
        <div
          className={`${
            signature ? 'col-span-8' : 'col-span-12'
          } flex flex-col`}
        >
          <div className="font-semibold text-xs">Observação:</div>

          <div className="">
            <common.Separator className="!my-5 !border-gray-400" />
            <common.Separator className="!my-5 !border-gray-400" />
            <common.Separator className="!my-5 !border-gray-400" />
          </div>
        </div>
        {signature && (
          <div className="font-semibold col-span-4 flex flex-col items-center pt-7 pl-8">
            <common.Separator className=" !border-gray-400" />
            <div className="w-full flex justify-center text-xs">Assinatura</div>
          </div>
        )}
      </div>
    </div>
  )
}
