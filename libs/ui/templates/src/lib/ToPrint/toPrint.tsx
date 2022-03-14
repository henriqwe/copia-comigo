import { ReactNode, useEffect, useState } from 'react'

type ToPrintTemplateProps = {
  children: ReactNode
  noGrid?: boolean
}

export function ToPrint({ children, noGrid = false }: ToPrintTemplateProps) {
  useEffect(() => {
    document.querySelector('html')?.classList.add('!bg-white')
  })
  return (
    <section>
      {noGrid ? (
        <div className={`flex w-full`}>{children}</div>
      ) : (
        <div className="grid grid-cols-12 gap-6 mt-5">{children}</div>
      )}
    </section>
  )
}
