export function StatusField({ value }: { value: string }) {
  return (
    <td className="w-40">
      <div className="flex items-center justify-center text-danger">
        <i data-feather="check-square" className="w-4 h-4 mr-2"></i> {value}
      </div>
    </td>
  )
}
