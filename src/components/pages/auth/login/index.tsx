import React, { useEffect } from 'react'
import './index.scss'
import * as yup from 'yup'
import { IStates } from 'interfaces/IReducer'
import { IAction } from 'interfaces/IAction'
import { UseFormReturn } from 'react-hook-form'
import FormBuilder from 'utils/form-builder'
import { TypeButton } from 'utils/button'
import TextPrompt from 'utils/text-prompt'
import { useFormHook } from 'utils/hook'
import { loginFC } from './utils'
import { authType } from 'store/types'

interface IProps {
  states?: IStates
}

interface ILoginHookForm {
  email: string
  password: string
}

interface ILoginForm {
  hookForm: UseFormReturn<ILoginHookForm, any>
  handleAction: (data: ILoginHookForm) => void
  loading: boolean
  error: string
}

export const LoginForm: React.FC<ILoginForm> = ({
  hookForm,
  handleAction,
  loading,
  error
}) => {
  const { handleSubmit } = hookForm
  // const navigate = useNavigate()
  return (
    <form onSubmit={handleSubmit(handleAction)}>
      <FormBuilder hookForm={hookForm} formComponent={loginFC} />
      <div className="cta">
        <TypeButton
          title="LOGIN"
          load={loading}
          type="submit"
          buttonType={loading ? 'disabled' : 'bold'}
          disabled={loading}
        />
      </div>
      {error && (
        <div className="form-error">
          <TextPrompt prompt={error} status={false} />
        </div>
      )}
    </form>
  )
}

const Login: React.FC<IProps> = ({ states, ...props }) => {
  const { userLogin, clearAction, setNotificationStatus } =
    props as unknown as IAction

  const dataLoading = states?.auth.userLoginLoading
  const dataError = states?.auth.userLoginError
  const data = states?.auth.userLogin

  const loginSchema = {
    email: yup.string().email().required('Email is required'),
    password: yup.string().required('Password is required')
  }

  const [hookForm] = useFormHook<ILoginHookForm>(loginSchema)

  const handleLogin = (data: ILoginHookForm) => {
    clearAction(authType.userLogin)
    userLogin(data)
  }

  useEffect(() => {
    if (data?.isSuccessful) {
      setNotificationStatus('Login Successful', true)
    }
  }, [data?.isSuccessful, setNotificationStatus])

  useEffect(() => {
    return () => {
      clearAction(authType.userLogin)
    }
  }, [clearAction])

  const loginFormProps = {
    error: dataError || '',
    loading: dataLoading || false,
    handleAction: handleLogin,
    hookForm
  }

  return (
    <div className="login-page">
      <div className="main-card">
        <h3>Login</h3>
        <div className="separator" />
        <LoginForm {...loginFormProps} />
      </div>
    </div>
  )
}

export default Login
