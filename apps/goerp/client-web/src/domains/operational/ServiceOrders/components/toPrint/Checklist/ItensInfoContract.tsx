export function ItensInfoContract({
  title,
  subtitle,
  reverse = false,
  subtitleRigth = false,
  textAlignRigth = false
}: {
  title: string
  subtitle: string
  reverse?: boolean
  subtitleRigth?: boolean
  textAlignRigth?: boolean
}) {
  const titleClass = `font-semibold mb-1 text-xs ${
    textAlignRigth && 'flex justify-end'
  }`
  const subtitleClass = `text-gray-600 text-tiny ${
    textAlignRigth && 'flex justify-end'
  }`

  return (
    <div className={`flex  ${subtitleRigth ? 'justify-between' : 'flex-col'}`}>
      <span className={reverse ? subtitleClass : titleClass}>{title}</span>
      <span className={reverse ? titleClass : subtitleClass}>{subtitle}</span>
    </div>
  )
}
