import { IOrganization } from "./IOrganization"

export interface IAPIBundle {
    id: number;
    code: string;
    description: string;
};

export interface IAPIConfig {
    id: number;
    groupCode: string;
    billingCategoryCode: string;
    apiName: string;
    apiRoute: string;
    description: string;
    perCallRate: number;
    applyDiscountAfter: number;
    discount: number;
    createdAt: string;
    updatedAt: string;
};
export interface IAPIConfigGroup {
    id: number;
    groupCode: string;
    groupDescription: string;
    apiConfiguration: null;
};

export interface IClientSubscription {
    id: number;
    clientSubscriptions: [],
    bundleCode: string;
    subscriptionStatus: string;
    organizationId: number;
    deleted: string;
    deletedAt: string;
    createdAt: string;
    updatedAt: string;
    organization: IOrganization;
};