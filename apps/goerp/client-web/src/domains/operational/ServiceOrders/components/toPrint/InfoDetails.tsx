import { ReactNode } from 'react'

type InfoDetailsType = {
  title: ReactNode
  subtitle: string
  details?: {
    key: string | ReactNode
    value: string | ReactNode
  }[]
  textAlignRight?: boolean
  contentAlignRight?: boolean
  children?: ReactNode
  dangerTitle?: boolean
}
export function InfoDetails({
  title,
  subtitle,
  details = [],
  textAlignRight = false,
  contentAlignRight = false,
  dangerTitle = false
}: InfoDetailsType) {
  return (
    <div
      className={`${textAlignRight && `lg:text-right`} ${
        contentAlignRight && `lg:ml-auto`
      }  mt-0`}
    >
      <div
        className={`text-xs text-slate-500 ${
          textAlignRight && `flex justify-end`
        }`}
      >
        {title}
      </div>
      <div
        className={`text-lg font-medium  mt-1 ${
          dangerTitle ? 'text-danger' : 'text-primary'
        } ${textAlignRight && `flex justify-end`}`}
      >
        {subtitle}
      </div>

      {details.length > 0 &&
        details.map((details, index) => (
          <div key={index} className="">
            <div
              className={`${
                textAlignRight && `flex justify-end`
              } text-tiny leading-tight`}
            >
              {details.key}
              {details.key && ': '}
              {details.value}
            </div>
          </div>
        ))}
    </div>
  )
}
