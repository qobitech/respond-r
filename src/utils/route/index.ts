import { ReactElement } from "react"
import { url } from "../../enums/Route"
import LandingPage from "components/public/landing"
import Login from "components/auth/login"
import ForgotPassword from "components/auth/login/forgot-password"
import ResetPassword from "components/auth/login/reset-password"
import Register from "components/auth/register"
import VerifyEmail from "components/auth/register/verify-email"
import Instructions from "components/public/instructions"
import Overview from "components/dashboard/overview"
import UserManagement from "components/dashboard/user-management"
import Applications from "components/dashboard/application"
import CreateApp from "components/dashboard/application/create"
import Profile from "components/dashboard/profile"
import Organization from "components/dashboard/organization"
import ApiBundles from "components/dashboard/billing/api-bundles"
import ApiConfigs from "components/dashboard/billing/api-configs"
import ApiConfigGroups from "components/dashboard/billing/api-config-group"
import Subscriptions from "components/dashboard/billing/subscriptions"
import ClientSubscriptions from "components/dashboard/billing/client-subscriptions"
import APIDocumentation from "components/dashboard/documentation"
import Notification from "components/dashboard/notification"
import Billing from "components/dashboard/billing"
import AppSecurity from "components/dashboard/app-security"
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
  {
    id: 6.2,
    PageRenders: [Instructions],
    paths: [url.INSTRUCTIONS],
    routeType: "public",
  },
  { id: 7, PageRenders: [Overview], paths: [url.OVERVIEW], routeType: "auth" },
  {
    id: 8,
    PageRenders: [UserManagement],
    paths: [url.USERS, `${url.USERS}/:id`],
    routeType: "auth",
  },
  {
    id: 9,
    PageRenders: [Applications, Applications],
    paths: [url.APPLICATIONS, `${url.APPLICATIONS}/:id`],
    routeType: "auth",
  },
  {
    id: 10,
    PageRenders: [CreateApp],
    paths: [url.CREATE_APP],
    routeType: "auth",
  },
  { id: 11, PageRenders: [Profile], paths: [url.PROFILE], routeType: "auth" },
  {
    id: 12,
    PageRenders: [Organization],
    paths: [url.ORGANIZATION, `${url.ORGANIZATION}/:id`],
    routeType: "auth",
  },
  {
    id: 13,
    PageRenders: [ApiBundles],
    paths: [url.API_BUNDLES, `${url.API_BUNDLES}/:id`],
    routeType: "auth",
  },
  {
    id: 14,
    PageRenders: [ApiConfigs],
    paths: [url.API_CONFIGS, `${url.API_CONFIGS}/:id`],
    routeType: "auth",
  },
  {
    id: 15,
    PageRenders: [ApiConfigGroups],
    paths: [url.API_CONFIG_GROUPS, `${url.API_CONFIG_GROUPS}/:id`],
    routeType: "auth",
  },
  {
    id: 16,
    PageRenders: [Subscriptions],
    paths: [url.SUBSCRIPTION, `${url.SUBSCRIPTION}/:id`],
    routeType: "auth",
  },
  {
    id: 17,
    PageRenders: [ClientSubscriptions],
    paths: [url.CLIENT_SUBSCRIPTIONS, `${url.CLIENT_SUBSCRIPTIONS}/:id`],
    routeType: "auth",
  },
  {
    id: 18,
    PageRenders: [APIDocumentation],
    paths: [url.API_DOCUMENTATION],
    routeType: "auth",
  },

  {
    id: 21,
    PageRenders: [Notification],
    paths: [url.NOTIFICATION],
    routeType: "auth",
  },
  {
    id: 22,
    PageRenders: [Billing],
    paths: [url.BILLING],
    routeType: "auth",
  },
  {
    id: 23,
    PageRenders: [AppSecurity],
    paths: [url.APP_SECURITY],
    routeType: "auth",
  },
]
