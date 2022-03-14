export function Field({
  value,
  position = 'right'
}: {
  value: string
  position?: 'left' | 'right'
}) {
  return (
    <td className={`text-left border-b dark:border-dark-5 !px-1`}>{value}</td>
  )
}
