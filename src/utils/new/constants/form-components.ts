import { IFormComponent } from "../form-builder"

export const registerOrganizationFC: IFormComponent[] = [
  {
    id: "email",
    label: "Email",
    placeHolder: "Enter your email",
    type: "text",
    component: "input",
  },
  {
    id: "organizationName",
    label: "Organization Name",
    placeHolder: "Enter your organization name",
    type: "text",
    component: "input",
  },
  {
    id: "state",
    label: "State",
    placeHolder: "Enter your state",
    type: "text",
    component: "input",
  },
  {
    id: "employeeId",
    label: "Employee ID",
    placeHolder: "Enter your employee id",
    type: "text",
    component: "input",
  },
  {
    id: "phoneNumber",
    label: "Phone Number",
    placeHolder: "Enter your phone number",
    type: "phone",
    component: "phone",
  },
  {
    id: "password",
    label: "Password",
    placeHolder: "Enter your password",
    type: "password",
    component: "input",
  },
  {
    id: "confirmPassword",
    label: "Confirm Password",
    placeHolder: "Confirm Password",
    type: "password",
    component: "input",
  },
]

export const loginFC: IFormComponent[] = [
  {
    id: "email",
    label: "Email",
    placeHolder: "Enter your email address",
    type: "text",
    component: "input",
  },
  {
    id: "password",
    label: "Password",
    placeHolder: "Enter your password",
    type: "password",
    component: "input",
  },
]
