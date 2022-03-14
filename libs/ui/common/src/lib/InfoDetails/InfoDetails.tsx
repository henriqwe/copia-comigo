import React, { ReactNode } from 'react'
type InfoDetailsProps = {
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
export const InfoDetails = ({
  title,
  subtitle,
  details = [],
  textAlignRight = false,
  contentAlignRight = false,
  dangerTitle = false
}: InfoDetailsProps) => {
  return (
    <div
      className={`${textAlignRight && `lg:text-right`} ${
        contentAlignRight && `lg:ml-auto`
      }  mt-0`}
    >
      <div
        className={`text-base text-slate-500 ${
          textAlignRight && `flex justify-end`
        }`}
      >
        {title}
      </div>
      <div
        className={`text-lg font-medium  mt-2 ${
          dangerTitle ? 'text-danger' : 'text-primary'
        } ${textAlignRight && `flex justify-end`}`}
      >
        {subtitle}
      </div>

      {details.length > 0 &&
        details.map((details, index) => (
          <div key={index} className="">
            <div className={`${textAlignRight && `flex justify-end`}`}>
              {details.key}
              {details.key && ': '}
              {details.value}
            </div>
          </div>
        ))}
    </div>
  )
}
