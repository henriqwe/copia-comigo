import React, { ReactNode } from 'react'
type InfoDetailsProps = {
  title: ReactNode
  subtitle: string
  details?: {
    key: string
    value: string
  }[]
  textAlignRight?: boolean
  children?: ReactNode
}
export const InfoDetails = ({
  title,
  subtitle,
  details = [],
  textAlignRight = false
}: InfoDetailsProps) => {
  return (
    <div
      className={`${
        textAlignRight && `lg:text-right lg:ml-auto`
      } mt-10 lg:mt-0`}
    >
      <div className={`text-base text-slate-500`}>{title}</div>
      <div className={`text-lg font-medium text-primary mt-2`}>{subtitle}</div>

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
