import { url } from "enums/Route";
import { OrgAdmin, SuperAdmin } from "utils/roles";

export interface IMenuData {
    id: number;
    title: string;
    url: string;
    icon: string;
    hasChildren: boolean;
    subUrls?: Array<string>;
    view?: boolean
}

export const MenuData:Array<IMenuData> = [
    {
        id: 1,
        title: 'Overview',
        url: url.OVERVIEW,
        icon: 'fa fa-list overview-icon',
        hasChildren: false
    },
    {
        id: 2,
        title: 'Organizations',
        url: url.ORGANIZATION,
        icon: 'fa fa-globe org-icon',
        hasChildren: false,
        view: SuperAdmin
    },
    {
        id: 3,
        title: 'Applications',
        url: url.APPLICATIONS,
        icon: 'fa fa-desktop desktop-icon',
        subUrls: [url.CREATE_APP],
        hasChildren: false
    },
    {
        id: 4,
        title: 'Billing',
        url: url.BILLING,
        icon: 'fas fa-money-bill billing-icon',
        hasChildren: true,
        subUrls: [url.API_BUNDLES, url.API_CONFIGS, url.SUBSCRIPTION, url.API_CONFIG_GROUPS, url.CLIENT_SUBSCRIPTIONS],
        view: OrgAdmin || SuperAdmin
    },
    {
        id: 5,
        title: 'User Management',
        url: url.USERS,
        icon: 'fa fa-users',
        hasChildren: false,
    },
    {
        id: 6,
        title: 'App Security',
        url: url.APP_SECURITY,
        icon: 'fa fa-lock',
        hasChildren: true,
        subUrls: [url.ROLES, url.PERMISSIONS],
        view: SuperAdmin
    },
    // {
    //     id: 7,
    //     title: 'Documentation',
    //     url: url.API_DOCUMENTATION,
    //     icon: 'fa fa-file-code',
    //     hasChildren: false,
    //     view: true
    // },
    {
        id: 8,
        title: 'Profile',
        url: url.PROFILE,
        icon: 'fa fa-user',
        hasChildren: false
    },
];

interface ISubMenuData {
    id: number;
    parentId: number;
    title: string;
    url: string;
    view?: boolean
};

export const SubMenuData:Array<ISubMenuData> = [
    //API-Bundles
    {
        id: 4.1,
        parentId: 4,
        title: "Api Bundles",
        url: url.API_BUNDLES,
        view: SuperAdmin || OrgAdmin
    },
    {
        id: 4.2,
        parentId: 4,
        title: "Api Configurations",
        url: url.API_CONFIGS,
        view: SuperAdmin
    },
    {
        id: 4.3,
        parentId: 4,
        title: "Configuration Groups",
        url: url.API_CONFIG_GROUPS,
        view: SuperAdmin
    },
    {
        id: 4.4,
        parentId: 4,
        title: "Subscription",
        url: url.SUBSCRIPTION,
        view: OrgAdmin
    },
    {
        id: 4.5,
        parentId: 4,
        title: "Client Subscriptions",
        url: url.CLIENT_SUBSCRIPTIONS,
        view: SuperAdmin
    },

    //Roles and Permissions
    {
        id: 6.1,
        parentId: 6,
        title: "Roles",
        url: url.ROLES,
        view: SuperAdmin
    },
    // {
    //     id: 6.2,
    //     parentId: 6,
    //     title: "Permissions",
    //     url: url.PERMISSIONS
    // },
]