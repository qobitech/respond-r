import { IOrganization } from "./IOrganization";

export interface IAPIScope{
    id: number;
    enables: boolean;
    name: string;
    displayName: string;
    description: string;
    required: boolean;
    emphasize: string;
    showInDiscoveryDocument: boolean;
    userClaims: [];
    properties: []
};

export interface IApplication {
    id: number;
    applicationName: string;
    description: string;
    clientId: string;
    clientSecret: string;
    environment: string;
    status: string;
    organizationId: number;
    deleted: string;
    applicationRoleAccess: string;
    deletedAt: string;
    organization: IOrganization;
    createdAt: string;
    updatedAt: string;
    transactionSummary: [];
    transactionDetails: [];
    clientSubscriptions: [];
    apiCalls: [];
};