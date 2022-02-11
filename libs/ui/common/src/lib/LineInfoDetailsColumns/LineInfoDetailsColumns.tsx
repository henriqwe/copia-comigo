import React, { ReactNode } from 'react'
type LineTitleProps = {
  children: ReactNode
}
export const LineInfoDetailsColumns = ({ children }: LineTitleProps) => {
  return (
    <div className="flex flex-col items-start lg:flex-row ">{children}</div>
  )
}
