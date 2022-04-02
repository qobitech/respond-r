// import { Admins } from '../../enums/Admins';

export interface IAdminPrivilege {
    admin: string;
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
};

// export const AdminPrivileges: Array<IAdminPrivilege> = [
//     {
//         admin: Admins.eTraffika,
//         create: true,
//         read: true,
//         update: true,
//         delete: true
//     },
//     {
//         admin: Admins.DRTS,
//         create: false,
//         read: true,
//         update: false,
//         delete: false,
//     },
//     {
//         admin: Admins.VIO,
//         create: false,
//         read: true,
//         update: false,
//         delete: false,
//     },
// ];