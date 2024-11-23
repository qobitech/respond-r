import { TypeButton } from 'utils/button'
import { TypeInput } from 'utils/input'
import { TypeSelect } from 'utils/select'

export const FilterSection = () => {
  return (
    <div className="admin-filter-section">
      <TypeSelect
        initoption={{ label: 'All reports', value: '' }}
        optionsdata={[
          { id: 1, label: 'Un-assigned reports', value: 'unassigned' },
          { id: 2, label: 'Assigned reports', value: 'assigned' },
          { id: 3, label: 'Rejected reports', value: 'rejected' }
        ]}
      />
      <TypeInput placeholder="Search report or location" />
      <TypeButton buttonSize="small" title="Search" />
    </div>
  )
}
