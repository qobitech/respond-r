import { useState } from 'react'
import TextPrompt from 'utils/text-prompt'

export const PoliceSearchComponent = () => {
  const [inputValue, setInputValue] = useState<string>('')
  const [error, setError] = useState<string>('')

  const handleOnChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target
    setInputValue(value)
    setError('')
  }

  return (
    <form className="nav-search-component" onSubmit={(e) => e.preventDefault()}>
      <div className="d-flex align-items-center" style={{ gap: '20px' }}>
        <input
          placeholder="Type here to search"
          onChange={handleOnChange}
          value={inputValue}
          onBlur={() => setError('')}
          onFocus={() => setError('')}
          autoFocus={error.length > 0}
          style={{
            border: error ? '1px solid #f56e9d' : '',
            marginBottom: error ? '5px' : '0'
          }}
        />
      </div>
      {error ? <TextPrompt prompt={error} status={false} /> : null}
    </form>
  )
}
