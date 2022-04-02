
export enum ActionEnums {
    //authentication
    ORGANIZATION_REGISTRATION = 'Organization registration',
    USER_REGISTRATION = 'User registration',
    EMAIL_VERIFICATION = 'Email verification',
    PASSWORD_RESET = 'Password Reset',
    LOGIN = 'Login',
    PASSWORD_TOKEN_REQUEST = 'Password Token Request',
    PASSWORD_RESET_TOKEN_VERIFICATION = 'Password Reset Token Verification',
    PASSWORD_UPDATE = 'Password Update',
    TOKEN_REFRESH = 'Token Refresh',
    TOKEN_GENERATION = 'Token Generation',
    LOGOUT = 'Logout',

    //roles
    GET_ALL_ROLES = 'Get all Roles',
    CREATE_ROLE = 'Create Role',
    UPDATE_ROLE = 'Update Role',
    DELETE_ROLE = 'Delete Role',
    GET_PERMISSIONS = 'Get Permissions',
    CREATE_PERMISSION = 'Create Permission',
    UPDATE_PERMISSION = 'Update Permission',
    DELETE_PERMISSION = 'Delete Permission',

    //user
    CREATE_USER = 'Create User',
    UPDATE_USER = 'Update User',
    DELETE_USER = 'Delete User',
    GET_ALL_USERS = 'Get all Users',

    //applications
    GET_ALL_APPLICATIONS = 'Get all applications',
    CREATE_APPLICATION = 'Create application',
    UPDATE_APPLICATION = 'Update application',

    //organization
    GET_ORGANIZATION_INFO = 'Get organization information',
    GET_ALL_ORGANIZATIONS = 'Get all organizations',
    UPDATE_ORGANIZATION = 'Update Organization',
    DELETE_ORGANIZATION = 'Delete Organization',

    //api-scopes
    GET_API_SCOPES = 'Get API Scopes',
    CREATE_API_SCOPE = 'Create API Scope',
    UPDATE_API_SCOPE = 'Update API Scope',

    //billing
    GET_API_BUNDLES = 'Get API Bundles',
    GET_API_BUNDLE_BY_ID = 'Get API Bundle Details',
    CREATE_API_BUNDLE = 'Create API Bundle',
    UPDATE_API_BUNDLE = 'Update API Bundle',
    DELETE_API_BUNDLE = 'Delete API Bundle',

    GET_API_CONFIGS = 'Get API Configurations',
    CREATE_API_CONFIG = 'Create API Configuration',
    UPDATE_API_CONFIG = 'Update API Configuration',
    DELETE_API_CONFIG = 'Delete API Configuration',
    GET_API_CONFIG_GROUPS = 'Get API Configuration Groups',
    CREATE_API_CONFIG_GROUP = 'Create API Configuration Group',
    UPDATE_API_CONFIG_GROUP = 'Update API Configuration Group',
    DELETE_API_CONFIG_GROUP = 'Delete API Configuration Group',

    GET_CLIENT_SUBSCRIPTIONS = 'Get Client Subscriptions',
    SUBSCRIBE_TO_BUNDLE = 'Subscribe to bundle',
    ADD_APP_TO_SUB = 'Add application to subscription'
}