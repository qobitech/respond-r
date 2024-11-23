export const AssetItem = ({
  label,
  value
}: {
  label: string
  value: string
}) => {
  return (
    <div>
      <p className="text-color-label">{label}</p>
      <p className="text-color">{value}</p>
    </div>
  )
}
