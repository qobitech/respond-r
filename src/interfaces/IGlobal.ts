import { vehicleSearchType } from "store/actions/global"

export interface INotification {
  notice: string
  status: boolean
}

export interface IVehicleSearchPayload {
  search: boolean
  type: vehicleSearchType
}
