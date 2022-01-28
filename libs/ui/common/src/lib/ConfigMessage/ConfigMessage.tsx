import * as common from '@comigo/ui-common'
import { useRouter } from 'next/router'

type ConfigMessageProps = {
  children: React.ReactNode
  rotas: {
    erp: {
      configuracoes: {
        index: string
      }
    }
  }
}

export function ConfigMessage({ children, rotas }: ConfigMessageProps) {
  const router = useRouter()
  return (
    <div className="flex flex-col items-center justify-center my-8">
      <p className="pb-4 text-xl">{children}</p>
      <common.buttons.SecondaryButton
        handler={() => router.push(rotas.erp.configuracoes.index)}
        title="Configurar"
        type="button"
      />
    </div>
  )
}
