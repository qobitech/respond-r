import { IAdmin } from "./IAdmin"
import { IAuth } from "./IAuth"

export interface IAppState {
  admin: IAdmin
  http: any
  auth: IAuth
}
