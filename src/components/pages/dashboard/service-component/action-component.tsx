import { PulseSVG } from 'utils/svgs'

export const ActionComponent = ({
  actions,
  title,
  load
}: {
  title?: string
  actions?: Array<{ label: string; action?: () => void }>
  load?: boolean
}) => {
  return (
    <div className="dropdown cta-section">
      <button
        title="Action"
        className="dropdown-toggle button-action"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {title || 'Action'}
        {load ? (
          <>
            &nbsp;&nbsp;
            <PulseSVG />
          </>
        ) : null}
      </button>

      <div
        className="dropdown-menu"
        aria-labelledby="dropdownMenuButton"
        style={{ cursor: 'pointer' }}
      >
        {actions?.map((i, index) => (
          <p className="dropdown-item m-0 py-2" onClick={i.action} key={index}>
            {i.label}
          </p>
        ))}
      </div>
    </div>
  )
}
