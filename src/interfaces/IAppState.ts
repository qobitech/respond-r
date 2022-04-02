import { IAdmin } from "./IAdmin";
import { IHttp } from './IHttp'
import { IAuth } from './IAuth'

export interface IAppState {
    admin: IAdmin
    http : IHttp
    auth : IAuth
}