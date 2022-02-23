import React, { ReactNode } from 'react'
type InfoDetailsProps = {
  title: ReactNode
  subtitle: string
  details?: {
    key: string
    value: string
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
      } mt-10 lg:mt-0`}
    >
      <div className={`text-base text-slate-500 `}>{title}</div>
      <div
        className={`text-lg font-medium  mt-2 ${
          dangerTitle ? 'text-danger' : 'text-primary'
        }`}
      >
        {subtitle}
      </div>

      {details.length > 0 &&
        details.map((details) => (
          <div key={`${details.key}-${details.value}`} className="mt-1">
            {details.key}
            {details.key && `: `}
            {details.value}
          </div>
        ))}
    </div>
  )
}
