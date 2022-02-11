import React, { ReactNode } from 'react'
type LineTitleProps = {
  title: string
  actions?: ReactNode
}
export const LineTitle = ({ title, actions = false }: LineTitleProps) => {
  return (
    <section className={`flex items-center justify-between w-full pt-6 pb-4`}>
      <div className={`text-lg font-medium`}>{title}</div>
      {actions && <div>{actions}</div>}
    </section>
  )
}
