export interface IRole {
    roleDescription: string;
    roleCategory: string;
    id: string;
    name: string;
    normalizedName: string;
    concurrencyStamp: string;
};

export interface IPermission {
    permission: string;
    description: string;
    permissionGroup: number;
}