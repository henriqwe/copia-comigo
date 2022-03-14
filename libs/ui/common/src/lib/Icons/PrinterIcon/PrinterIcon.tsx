import { PrinterIcon as Printer } from '@heroicons/react/outline'

export function PrinterIcon({ ...props }: React.ComponentProps<'svg'>) {
  return (
    <Printer className={`w-5 h-5 text-white ${props.className}`} {...props} />
  )
}
