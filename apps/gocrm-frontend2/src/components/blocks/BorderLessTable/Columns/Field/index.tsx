export default function Field({
  value,
  position = 'right'
}: {
  value: string
  position?: 'left' | 'right'
}) {
  return (
    <td
      className={`${
        position === 'right' ? 'text-right' : 'text-left'
      }  border-b dark:border-dark-5`}
    >
      {value}
    </td>
  )
}
