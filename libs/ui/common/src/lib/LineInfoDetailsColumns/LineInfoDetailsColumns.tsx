import React, { ReactNode } from 'react'
type LineTitleProps = {
  children: ReactNode
}
export const LineInfoDetailsColumns = ({ children }: LineTitleProps) => {
  return <div className="flex justify-between lg:flex-row ">{children}</div>
}
