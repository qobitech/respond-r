import { url } from 'app-constants/Route'
import { useNavigate } from 'react-router'
import './index.scss'
import { TypeInput } from 'utils/input'
import { TypeButton } from 'utils/button'

const ForgotPassword = () => {
  const navigate = useNavigate()

  return (
    <>
      <div className="login-page">
        <div className="main-card">
          <h3>Forgot your password?</h3>
          <div className="separator" />
          <form onSubmit={(e) => e.preventDefault()}>
            <TypeInput
              label="Email"
              placeholder="Enter your email address"
              error=""
            />
            <div className="cta">
              <TypeButton title="SEND OTP" load={false} />
            </div>
          </form>
          <div className="separator" />
          <div className="alt">
            <p
              className="action"
              style={{ margin: 0 }}
              onClick={() => navigate(url.LOGIN)}
            >
              Login
            </p>
            <p
              className="action"
              style={{ margin: 0 }}
              onClick={() => navigate(url.REGISTER)}
            >
              Register
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword
