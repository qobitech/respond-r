import { useGlobalContext } from 'context/hooks'
import { useEffect, useState } from 'react'
import { vehicleSearchType } from 'store/actions/global'
import { TypeButton } from 'utils/button'
import { PulseSVG } from 'utils/svgs'
import TextPrompt from 'utils/text-prompt'

export const TrafficSearchComponent = ({
  searchVehicleByChasisNumber,
  searchVehicleByRegNumber,
  load,
  setSearch
}: {
  searchVehicleByChasisNumber: (query: string) => (dispatch: any) => void
  searchVehicleByRegNumber: (query: string) => (dispatch: any) => void
  load?: boolean
  setSearch: (
    search: boolean,
    type: vehicleSearchType
  ) => (dispatch: any) => void
}) => {
  const { search } = useGlobalContext()

  const [inputValue, setInputValue] = useState<string>('')
  const [error, setError] = useState<string>('')

  const handleOnChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target
    setInputValue(value)
    setError('')
  }

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!inputValue) {
      setError('input empty')
      return
    }
    if (inputValue.length < 11) searchVehicleByRegNumber(inputValue)
    else searchVehicleByChasisNumber(inputValue)
    setSearch(true, inputValue.length < 11 ? 'regnumber' : 'chasis')
  }

  useEffect(() => {
    setInputValue(search)
  }, [search])

  return (
    <form className="nav-search-component" onSubmit={handleSearch}>
      <div className="d-flex align-items-center" style={{ gap: '20px' }}>
        <input
          placeholder="Search reg number or chasis number"
          onChange={handleOnChange}
          value={inputValue.toUpperCase()}
          onBlur={() => setError('')}
          onFocus={() => setError('')}
          autoFocus={error.length > 0}
          className={error ? 'error' : ''}
        />
        {load ? (
          <PulseSVG />
        ) : (
          <TypeButton
            buttonSize="small"
            title="Search"
            type="submit"
            load={load}
          />
        )}
      </div>
      {error ? <TextPrompt prompt={error} status={false} /> : null}
    </form>
  )
}
