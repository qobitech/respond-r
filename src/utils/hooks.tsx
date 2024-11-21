import { useLocation } from 'react-router-dom'
import queryString from 'query-string'

export const useQueryValuesHook = () => {
  const location = useLocation()
  const { search } = location
  const values = queryString.parse(search) as { [key: string]: string }
  return values
}
