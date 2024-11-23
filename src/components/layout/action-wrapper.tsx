import { useGlobalContext } from 'context/hooks'

export const ActionWrapper = ({
  action,
  children
}: {
  action: string
  children?: any
}) => {
  const { isAction } = useGlobalContext()

  if (isAction?.(action)) return <>{children}</>

  return <></>
}
