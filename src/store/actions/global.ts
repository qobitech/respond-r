import * as utils from "../services/new/utils"
import { globalType } from "../types"

export const clearAction = (actionType: utils.I_ACTION_TYPE) => {
  return utils.clearHttp({
    actionType,
  })
}

export const setMenuOpen = (menuOpen: boolean) => (dispatch: any) => {
  dispatch({
    type: globalType.menuOpen.dataAction,
    payload: menuOpen,
  })
}

export const setSubMenuOpen = (subMenuOpen: number) => (dispatch: any) => {
  dispatch({
    type: globalType.subMenuOpen.dataAction,
    payload: subMenuOpen,
  })
}

export const setNotificationStatus =
  (notice: string, status: boolean) => (dispatch: any) => {
    dispatch({
      type: globalType.notifyUser.dataAction,
      payload: { notice, status },
    })
  }
