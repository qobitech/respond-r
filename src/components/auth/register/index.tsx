import React, { useEffect } from "react"
import { url } from "enums/Route"
import { useNavigate } from "react-router-dom"
import "./index.scss"
import { TypeButton } from "utils/new/button"
import { IStates } from "interfaces/IReducer"
import { useFormHook } from "utils/new/hook"
import * as yup from "yup"
import { IAction } from "interfaces/IAction"
import { authType } from "store/types"
import TextPrompt from "utils/new/text-prompt"
import { UseFormReturn } from "react-hook-form"
import FormBuilder from "utils/new/form-builder"
import { registerOrganizationFC } from "utils/new/constants/form-components"

interface IProps {
  states?: IStates
}

export interface IRegisterHookForm {
  email: string
  userName: string
  address: string
  organizationName: string
  state: string
  employeeId: string
  phoneNumber: string
  password: string
  confirmPassword: string
  role: string
}

export const registerSchema = {
  email: yup.string().email().required("Email is required"),
  userName: yup.string().required("User name is required"),
  address: yup.string().required("Address is required"),
  organizationName: yup.string().required("Organization name is required"),
  state: yup.string().required("State is required"),
  employeeId: yup.string().required("Employee id is required"),
  phoneNumber: yup.string().required("Phone number is required"),
  role: yup.string(),
  password: yup.string().required("Password is required"),
  confirmPassword: yup.string().required("Confirm Password is required"),
}

interface IRegisterForm {
  hookForm: UseFormReturn<IRegisterHookForm, any>
  handleAction: (data: IRegisterHookForm) => void
  loading: boolean
  error: string
}

export const RegisterForm: React.FC<IRegisterForm> = ({
  hookForm,
  handleAction,
  loading,
  error,
}) => {
  const { handleSubmit } = hookForm
  return (
    <form onSubmit={handleSubmit(handleAction)}>
      <FormBuilder hookForm={hookForm} formComponent={registerOrganizationFC} />
      <div className="cta">
        <TypeButton
          title="REGISTER"
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

const Register: React.FC<IProps> = ({ states, ...props }) => {
  const { registerOrganization, clearAction } = props as unknown as IAction

  const dataLoading = states?.auth.registerOrganizationLoading
  const dataError = states?.auth.registerOrganizationError

  const navigate = useNavigate()

  const [hookForm] = useFormHook<IRegisterHookForm>(registerSchema)

  const handleRegister = (data: IRegisterHookForm) => {
    clearAction(authType.registerOrganization)
    registerOrganization({ ...data, role: "OrganizationAdmin" })
  }

  useEffect(() => {
    return () => {
      clearAction(authType.registerOrganization)
    }
  }, [clearAction])

  const formProps = {
    error: dataError || "",
    loading: dataLoading || false,
    handleAction: handleRegister,
    hookForm,
  }

  console.log(hookForm.getValues(), "juju")

  return (
    <div className="register-page">
      <div className="main-card">
        <h3>Register your organization</h3>
        <div className="separator" />
        <RegisterForm {...formProps} />
        <div className="separator" />
        <div className="alt">
          <p>Already have an account ?</p>
          <p className="action" onClick={() => navigate(url.LOGIN)}>
            Login
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
