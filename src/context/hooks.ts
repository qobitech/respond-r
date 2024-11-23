import { GlobalContext, IGlobalContext } from 'context'
import { useContext } from 'react'

export const useGlobalContext = (): IGlobalContext => {
  const globalContext = useContext(GlobalContext)
  if (!globalContext) {
    throw new Error('useGlobalContext must be used within a GlobalProvider')
  }
  return globalContext
}
