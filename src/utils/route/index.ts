import { ReactElement } from 'react';
import { url } from '../../enums/Route'
import LandingPage from 'components/landing';
import Login from 'components/login';
import ForgotPassword  from 'components/login/forgot-password';
import ResetPassword from 'components/login/reset-password';
import Register from 'components/register';
import VerifyEmail from 'components/register/verify-email';
import Instructions from 'components/instructions';
import Overview from 'components/dashboard/overview';
import UserManagement from 'components/dashboard/user-management';
import Applications from 'components/dashboard/application';
import CreateApp from 'components/dashboard/application/create-app';
import Profile from 'components/dashboard/profile';
import Organization from 'components/dashboard/organization';
import ApiBundles from 'components/dashboard/billing/api-bundles';
import ApiConfigs from 'components/dashboard/billing/api-configs';
import ApiConfigGroups from 'components/dashboard/billing/api-config-group';
import Subscriptions from 'components/dashboard/billing/subscriptions';
import ClientSubscriptions from 'components/dashboard/billing/client-subscriptions';
import Roles from 'components/dashboard/roles';
import Page404 from 'utils/404';
import APIDocumentation from 'components/dashboard/documentation'
import Permissions from 'components/dashboard/roles/permissions';
export interface IUrl {
    id: number;
    PageRenders: ((props?: any) => ReactElement | null)[];
    paths: string[];
    requiresAuth?: boolean;
}

export const routes:Array<IUrl> = [
    {   id : 1,
        PageRenders: [LandingPage],
        paths: [url.LANDING_PAGE],
    },
    {   id : 2,
        PageRenders : [Login],
        paths : [url.LOGIN],
    },
    {   id : 3,
        PageRenders : [ForgotPassword],
        paths : [url.FORGOT_PASSWORD],
    },
    {   id : 4,
        PageRenders : [ResetPassword, ResetPassword],
        paths : [url.RESET_PASSWORD, `${url.RESET_PASSWORD}/:email/:token`],
    },
    {   id : 5,
        PageRenders : [Register],
        paths : [url.REGISTER],
    },
    {   id : 6,
        PageRenders : [VerifyEmail, VerifyEmail],
        paths : [url.VERIFY_EMAIL, `${url.VERIFY_EMAIL}/:email/:token`],
    },
    {   id : 6.2,
        PageRenders : [Instructions],
        paths : [url.INSTRUCTIONS],
    },
    {   id : 7,
        PageRenders : [Overview],
        paths : [url.OVERVIEW],
        requiresAuth: true
    },
    {   id : 8,
        PageRenders : [UserManagement],
        paths : [url.USERS, `${url.USERS}/:id`],
        requiresAuth: true
    },
    {   id : 9,
        PageRenders : [Applications, Applications],
        paths : [url.APPLICATIONS, `${url.APPLICATIONS}/:id`],
        requiresAuth: true
    },
    {   id : 10,
        PageRenders : [CreateApp],
        paths : [url.CREATE_APP],
        requiresAuth: true
    },
    {   id : 11,
        PageRenders : [Profile],
        paths : [url.PROFILE],
        requiresAuth: true
    },
    {   id : 12,
        PageRenders : [Organization],
        paths : [url.ORGANIZATION, `${url.ORGANIZATION}/:id`],
        requiresAuth: true
    },
    {   id : 13,
        PageRenders : [ApiBundles],
        paths : [url.API_BUNDLES, `${url.API_BUNDLES}/:id`],
        requiresAuth: true
    },
    {   id : 14,
        PageRenders : [ApiConfigs],
        paths : [url.API_CONFIGS, `${url.API_CONFIGS}/:id`],
        requiresAuth: true
    },
    {   id : 15,
        PageRenders : [ApiConfigGroups],
        paths : [url.API_CONFIG_GROUPS, `${url.API_CONFIG_GROUPS}/:id`],
        requiresAuth: true
    },
    {   id : 16,
        PageRenders : [Subscriptions],
        paths : [url.SUBSCRIPTION, `${url.SUBSCRIPTION}/:id`],
        requiresAuth: true
    },
    {   id : 17,
        PageRenders : [ClientSubscriptions],
        paths : [url.CLIENT_SUBSCRIPTIONS, `${url.CLIENT_SUBSCRIPTIONS}/:id`],
        requiresAuth: true
    },
    {   id : 18,
        PageRenders : [APIDocumentation],
        paths : [url.API_DOCUMENTATION],
        requiresAuth: true
    },
    {   id : 19,
        PageRenders : [Roles],
        paths: [url.ROLES],
        requiresAuth: true
    },
    {   id : 20,
        PageRenders : [Permissions],
        paths : [url.PERMISSIONS],
        requiresAuth: true
    },
    {   id : 21,
        PageRenders : [Page404],
        paths : [url.PAGE404],
    },
];