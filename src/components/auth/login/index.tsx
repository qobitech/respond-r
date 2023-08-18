import React, { useEffect } from "react"
import { TypeButton } from "utils/new/button"
import { useNavigate } from "react-router-dom"
import { url } from "enums/Route"
import "./index.scss"
import { useFormHook } from "utils/new/hook"
import * as yup from "yup"
import { IStates } from "interfaces/IReducer"
import { IAction } from "interfaces/IAction"
import TextPrompt from "utils/new/text-prompt"
import { authType } from "../../../store/types"
import { UseFormReturn } from "react-hook-form"
import FormBuilder from "utils/new/form-builder"
import { loginFC } from "utils/new/constants/form-components"

interface IProps {
  states?: IStates
}

interface ILoginHookForm {
  username: string
  password: string
  rememberMe: boolean
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
  error,
}) => {
  const { handleSubmit } = hookForm
  const navigate = useNavigate()
  return (
    <form onSubmit={handleSubmit(handleAction)}>
      <FormBuilder hookForm={hookForm} formComponent={loginFC} />
      <div className="forgot-password">
        <p onClick={() => navigate(url.FORGOT_PASSWORD)}>Forgot Password ?</p>
      </div>
      <div className="cta">
        <TypeButton
          title="LOGIN"
          load={loading}
          type="submit"
          buttonType={loading ? "disabled" : "bold"}
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

  const navigate = useNavigate()

  const loginSchema = {
    username: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is required"),
    rememberMe: yup.boolean(),
  }

  const [hookForm] = useFormHook<ILoginHookForm>(loginSchema)

  const handleLogin = (data: ILoginHookForm) => {
    clearAction(authType.userLogin)
    userLogin(data)
  }

  useEffect(() => {
    if (data?.loginSuccessful) {
      setNotificationStatus("Login Successful", true)
    }
  }, [data?.loginSuccessful, setNotificationStatus])

  useEffect(() => {
    return () => {
      clearAction(authType.userLogin)
    }
  }, [clearAction])

  const loginFormProps = {
    error: dataError || "",
    loading: dataLoading || false,
    handleAction: handleLogin,
    hookForm,
  }

  return (
    <div className="login-page">
      <div className="main-card">
        <h3>Login</h3>
        <div className="separator" />
        <LoginForm {...loginFormProps} />
        <div className="separator" />
        <div className="alt">
          <p>Not registered yet ?</p>
          <p className="action" onClick={() => navigate(url.REGISTER)}>
            Create an account
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
