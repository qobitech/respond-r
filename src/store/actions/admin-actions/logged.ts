import { RESPONDR_QR_BASE_URL } from "utils/constants";
import * as utils from "../../services/new/utils";
import { logged } from "store/types";

export const getLoggedActionsForRole = (
	name: string,
	onSuccess?: (res: any) => void,
	onFailure?: (err: any) => void
) => {
	return utils.httpGetMethod({
		apiData: {
			url: "",
			customurl: `${RESPONDR_QR_BASE_URL}/Action/getactionsforrole?roleName=${name}`,
			header: utils.header(""),
		},
		actionType: logged.getLoggedActionsForRole,
		onSuccess: (res) => {
			onSuccess?.(res);
		},
		onFailure: (err) => {
			onFailure?.(err);
		},
	});
};

export const getLoggedOrganization = (query: string) => {
	return utils.httpGetMethod({
		apiData: {
			url: "",
			customurl: `${RESPONDR_QR_BASE_URL}/Organisation/${query || ""}`,
			header: utils.header(""),
		},
		actionType: logged.getLoggedOrganization,
	});
};

export const getLoggedRoles = (query: string) => {
	return utils.httpGetMethod({
		apiData: {
			url: "",
			customurl: `${RESPONDR_QR_BASE_URL}/Role${query || ""}`,
			header: utils.header(""),
		},
		actionType: logged.getLoggedRoles,
	});
};
