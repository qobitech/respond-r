import { useState } from 'react'

export const TableWrapper = ({
  title,
  children
}: {
  title: string
  children?: any
}) => {
  const [toggle, setToggle] = useState<boolean>(true)
  return (
    <div className="table-wrapper-box">
      <div
        className="table-wrapper-box-header"
        onClick={() => setToggle(!toggle)}
      >
        <p>{new Date(title).toDateString()}</p>
        <p>
          <span>
            <i className={`fas fa-angle-${toggle ? 'down' : 'up'}`} />
          </span>
        </p>
      </div>
      {toggle ? (
        <div className={`table-wrapper-box-body`}>{children}</div>
      ) : null}
    </div>
  )
}
