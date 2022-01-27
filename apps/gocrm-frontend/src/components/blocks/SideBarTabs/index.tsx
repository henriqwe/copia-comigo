import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import * as icons from '@/common/Icons'
import * as buttons from '@/common/Buttons'
import Skeleton from 'react-loading-skeleton'

type SideBarTabsProps = {
  array: ItemType[]
  setArray?: Dispatch<SetStateAction<ItemType[]>>
  selectedItem?: ItemType
  onChange: (value: any) => void
  allowAdding?: boolean
  addFunction?: () => void
  loading?: boolean
}

type ItemType = {
  Id: null | string
  content: { title: string; subtitle: string }
  position: number
}

export default function SideBarTabs({
  array,
  onChange,
  setArray = () => null,
  allowAdding = false,
  loading = false,
  addFunction,
  selectedItem
}: SideBarTabsProps) {
  const [newArray, setNewArray] = useState(array)
  const [selected, setSelected] = useState(
    selectedItem ? selectedItem : array[0]
  )

  useEffect(() => {
    if (array[0] !== newArray[0]) {
      setSelected(selectedItem ? selectedItem : array[0])
      setNewArray(array)
      if (array.length < newArray.length) {
        setSelected(array[0])
      }
    }
  }, [array])

  useEffect(() => {
    if (selectedItem) {
      setSelected(selectedItem)
    }
  }, [selectedItem])

  return (
    <div className="w-full p-5 pl-6 bg-gray-500 dark:bg-dark-4 rounded-l-md">
      <div className="w-full max-w-md mx-auto">
        <RadioGroup
          value={selected}
          onChange={(e) => {
            onChange(e)
            setSelected(e)
          }}
        >
          <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
          <div className="space-y-2">
            {loading
              ? ['', ''].map((_, index) => (
                  <div key={index} className="mb-px">
                    <Skeleton
                      baseColor="rgb(41, 49, 69)"
                      highlightColor="rgb(63, 72, 101)"
                      height={56}
                    />
                  </div>
                ))
              : array.map((plan, index) => (
                  <RadioGroup.Option
                    key={index}
                    value={plan}
                    className={({ active, checked }) =>
                      `${
                        active ||
                        selectedItem?.content.subtitle === plan.content.subtitle
                          ? 'ring-2 ring-offset-2 ring-offset-sky-300 ring-white ring-opacity-60'
                          : ''
                      }
                  ${
                    checked ||
                    selectedItem?.content.subtitle === plan.content.subtitle
                      ? 'dark:bg-dark-5 bg-primary-1 text-white bg-opacity-75'
                      : 'dark:bg-dark-1 bg-gray-400'
                  }
                    relative rounded-lg shadow-md px-5 py-4 cursor-pointer flex focus:outline-none dark:text-white`
                    }
                  >
                    {({ checked }) => (
                      <>
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center">
                            <div className="text-sm">
                              <RadioGroup.Label
                                as="p"
                                className={`font-medium  ${
                                  checked ||
                                  selectedItem?.content.subtitle ===
                                    plan.content.subtitle
                                    ? 'dark:text-white '
                                    : 'text-gray-900 dark:text-white'
                                }`}
                              >
                                {plan.content.subtitle !== 'Sem vínculo'
                                  ? plan.content.subtitle
                                      .split(' -')
                                      .map((item, index) => (
                                        <span className="block" key={index}>
                                          {item}
                                        </span>
                                      ))
                                  : plan.content.title + plan.position}
                              </RadioGroup.Label>
                            </div>
                          </div>
                          {(checked ||
                            selectedItem?.content.subtitle ===
                              plan.content.subtitle) && (
                            <div className="flex-shrink-0 text-white">
                              <icons.CheckIcon className="w-6 h-6" />
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </RadioGroup.Option>
                ))}
          </div>
        </RadioGroup>
      </div>
      {loading ? (
        <div className={'mt-2'}>
          <Skeleton
            baseColor="#6E961D"
            highlightColor="rgb(165, 228, 19)"
            height={44}
          />
        </div>
      ) : null}
      <div className="flex items-center justify-center mt-2">
        {allowAdding && (
          <buttons.SecondaryButton
            handler={() =>
              addFunction
                ? addFunction()
                : setArray((lastArray) => {
                    return [
                      ...lastArray,
                      {
                        Id: null,
                        content: { title: 'Veículo ', subtitle: 'Sem vínculo' },
                        position: lastArray[lastArray.length - 1].position + 1
                      }
                    ]
                  })
            }
            type="button"
            divClassName="w-full"
            svgClassName="w-full"
            buttonClassName="w-full"
            className="w-full max-h-7"
          />
        )}
      </div>
    </div>
  )
}
