export const getStatus = (val?: boolean) => {
  if (val) return 'Valid'
  return 'Expired'
}
