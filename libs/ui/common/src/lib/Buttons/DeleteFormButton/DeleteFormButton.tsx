import { Dispatch, SetStateAction } from 'react'
import * as common from '@comigo/ui-common'

type DeleteFormButtonProps = {
  array: number[]
  setArray: Dispatch<SetStateAction<number[]>>
  loading: boolean
  number: number
}

export function DeleteFormButton({
  array,
  setArray,
  loading,
  number
}: DeleteFormButtonProps) {
  return (
    <div>
      <button
        onClick={() => {
          setArray(array.filter((position) => position !== number))
        }}
        className={`mb-1 ${
          loading ? 'bg-gray-400 cursor-not-allowed' : ''
        } py-2 px-4 rounded-md bg-primary-3 transition text-white flex items-center`}
        type="button"
      >
        <common.icons.DeleteIcon width={28} height={28} className={'text-theme-2'} />
      </button>
    </div>
  )
}
