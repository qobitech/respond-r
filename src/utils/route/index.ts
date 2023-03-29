import { url } from '../../enums/Route'
import LandingPage from 'components/landing';

export interface IUrl {
    id: number;
    PageRenders: (() => JSX.Element)[];
    paths: string[];
    requiresAuth?: boolean;
}

// export const Page404 = React.lazy(()=>import('../404'));
// const LandingPage = React.lazy(() => import('components/landing'));
// const Login = React.lazy(() => import('components/login'));
// const ForgotPassword = React.lazy(() => import('components/login/forgot-password'));
// const ResetPassword = React.lazy(() => import('components/login/reset-password'));
// const Register = React.lazy(() => import('components/register'));
// const VerifyEmail = React.lazy(() => import('components/register/verify-email'));
// const Instructions = React.lazy(() => import('components/instructions'));
// const Overview = React.lazy(() => import('components/dashboard/overview'));
// const UserManagement = React.lazy(() => import('components/dashboard/user-management'));
// const Applications = React.lazy(() => import('components/dashboard/application'));
// const CreateApp = React.lazy(() => import('components/dashboard/application/create-app'));
// const Profile = React.lazy(() => import('components/dashboard/profile'));
// const Organization = React.lazy(() => import('components/dashboard/organization'));
// const ApiBundles = React.lazy(() => import('components/dashboard/billing/api-bundles'));
// const ApiConfigs = React.lazy(() => import('components/dashboard/billing/api-configs'));
// const ApiConfigGroups = React.lazy(() => import('components/dashboard/billing/api-config-group'));
// const Subscriptions = React.lazy(() => import('components/dashboard/billing/subscriptions'));
// const ClientSubs = React.lazy(() => import('components/dashboard/billing/client-subscriptions'));
// const APIDocumentation = React.lazy(() => import('components/dashboard/documentation'));
// const Roles = React.lazy(() => import('components/dashboard/roles'));
// const Permissions = React.lazy(() => import('components/dashboard/roles/permissions'));

export const routes:Array<IUrl> = [
    {   id : 1,
        PageRenders: [LandingPage],
        paths: [url.LANDING_PAGE],
    },
    // {   id : 2,
    //     PageRender : Login,
    //     path : url.LOGIN,
    // },
    // {   id : 3,
    //     PageRender : ForgotPassword,
    //     path : url.FORGOT_PASSWORD,
    // },
    // {   id : 4,
    //     PageRender : ResetPassword,
    //     path : url.RESET_PASSWORD + '/:email?/:token?',
    // },
    // {   id : 5,
    //     PageRender : Register,
    //     path : url.REGISTER,
    // },
    // {   id : 6,
    //     PageRender : VerifyEmail,
    //     path : url.VERIFY_EMAIL + '/:email?/:token?',
    // },
    // {   id : 6.2,
    //     PageRender : Instructions,
    //     path : url.INSTRUCTIONS,
    // },
    // {   id : 7,
    //     PageRender : Overview,
    //     path : url.OVERVIEW,
    //     requiresAuth: true
    // },
    // {   id : 8,
    //     PageRender : UserManagement,
    //     path : url.USERS + '/:id?',
    //     requiresAuth: true
    // },
    // {   id : 9,
    //     PageRender : Applications,
    //     path : url.APPLICATIONS + '/:id?',
    //     requiresAuth: true
    // },
    // {   id : 10,
    //     PageRender : CreateApp,
    //     path : url.CREATE_APP,
    //     requiresAuth: true
    // },
    // {   id : 11,
    //     PageRender : Profile,
    //     path : url.PROFILE,
    //     requiresAuth: true
    // },
    // {   id : 12,
    //     PageRender : Organization,
    //     path : url.ORGANIZATION + '/:id?',
    //     requiresAuth: true
    // },
    // {   id : 13,
    //     PageRender : ApiBundles,
    //     path : url.API_BUNDLES + '/:id?',
    //     requiresAuth: true
    // },
    // {   id : 14,
    //     PageRender : ApiConfigs,
    //     path : url.API_CONFIGS + '/:id?',
    //     requiresAuth: true
    // },
    // {   id : 15,
    //     PageRender : ApiConfigGroups,
    //     path : url.API_CONFIG_GROUPS + '/:id?',
    //     requiresAuth: true
    // },
    // {   id : 16,
    //     PageRender : Subscriptions,
    //     path : url.SUBSCRIPTION + '/:id?',
    //     requiresAuth: true
    // },
    // {   id : 17,
    //     PageRender : ClientSubs,
    //     path : url.CLIENT_SUBSCRIPTIONS + '/:id?',
    //     requiresAuth: true
    // },
    // {   id : 18,
    //     PageRender : APIDocumentation,
    //     path : url.API_DOCUMENTATION,
    //     requiresAuth: true
    // },
    // {   id : 19,
    //     PageRender : Roles,
    //     path : url.ROLES,
    //     requiresAuth: true
    // },
    // {   id : 20,
    //     PageRender : Permissions,
    //     path : url.PERMISSIONS,
    //     requiresAuth: true
    // },
    // {   id : 21,
    //     PageRender : Page404,
    //     path : url.PAGE404,
    // },
];