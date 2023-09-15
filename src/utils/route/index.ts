import { ReactElement } from "react"
import { url } from "../../enums/Route"
import LandingPage from "components/public/landing"
import Login from "components/auth/login"
import ForgotPassword from "components/auth/login/forgot-password"
import ResetPassword from "components/auth/login/reset-password"
import Register from "components/auth/register"
import VerifyEmail from "components/auth/register/verify-email"
import Overview from "components/dashboard/overview"
export interface IUrl {
  id: number
  PageRenders: ((props?: any) => ReactElement | null)[]
  paths: string[]
  routeType: "public" | "auth"
}

export const routes: Array<IUrl> = [
  {
    id: 1,
    PageRenders: [LandingPage],
    paths: [url.LANDING_PAGE],
    routeType: "public",
  },
  { id: 2, PageRenders: [Login], paths: [url.LOGIN], routeType: "public" },
  {
    id: 3,
    PageRenders: [ForgotPassword],
    paths: [url.FORGOT_PASSWORD],
    routeType: "public",
  },
  {
    id: 4,
    PageRenders: [ResetPassword, ResetPassword],
    paths: [url.RESET_PASSWORD, `${url.RESET_PASSWORD}/:email/:token`],
    routeType: "public",
  },
  {
    id: 5,
    PageRenders: [Register],
    paths: [url.REGISTER],
    routeType: "public",
  },
  {
    id: 6,
    PageRenders: [VerifyEmail, VerifyEmail],
    paths: [url.VERIFY_EMAIL, `${url.VERIFY_EMAIL}/:email/:token`],
    routeType: "public",
  },
  { id: 7, PageRenders: [Overview], paths: [url.OVERVIEW], routeType: "auth" },
]
