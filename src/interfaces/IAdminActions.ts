export interface IAdminActions {
    //Instance Logger
    instance_log_view_list?: boolean;
    instance_log_view_details?: boolean;
    instance_log_view_vehicle_instances?: boolean;
    instance_log_view_vehicle_violations?: boolean;
    instance_log_view_vehicle_warnings?: boolean;
    instance_log_book_vehicle?: boolean;
    instance_log_send_owner_message?: boolean;
    instance_log_send_owner_warning?: boolean;
    instance_log_search_filter?: boolean;

    //Vehicles
    vehicle_create?: boolean;
    vehicle_update?: boolean;
    vehicle_delete?: boolean;
    vehicle_search_filter?: boolean;
    vehicle_broadcast_view?: boolean;
    vehicle_broadcast_update?: boolean;
    vehicle_broadcast_delete?: boolean;
    vehicle_broadcast_search_filter?: boolean;
    vehicle_offence_search_filter?: boolean;
    vehicle_offence_view_details?: boolean;
    vehicle_offence_view_owner?: boolean;
    vehicle_offence_create_offence?: boolean;
    vehicle_offence_update_offence?: boolean;
    vehicle_offence_delete_offence?: boolean;

    //Licence
    licence_view?: boolean;
    licence_create?: boolean;
    licence_update?: boolean;
    licence_delete?: boolean;
    licence_create_broadcast?: boolean;

    //Person
    person_view?: boolean;
    person_more_details?: boolean;
    person_update?: boolean;
    person_delete?: boolean;
    person_create?: boolean;
    person_search_filter?: boolean;
    person_broadcast_view?: boolean;
    person_broadcast_update?: boolean;
    peron_broadcast_delete?: boolean;
    person_broadcast_search_filter?: boolean;
    person_offence_search_filter?: boolean;
    person_offence_view_details?: boolean;
    person_offence_view_owner?: boolean;
    person_offence_create_offence?: boolean;
    person_offence_update_offence?: boolean;
    person_offence_delete_offence?: boolean;

    //Finance
    finance_view_paid_offences?: boolean;
    finance_view_total_violations?: boolean;
    finance_view_unpaid_offences?: boolean;

    //Offences
    offences_view_offence?: boolean;
    offences_update_offence?: boolean;
    offences_delete_offence?: boolean;
    offences_create_offence?: boolean;
    offences_search_filter?: boolean;

    //Management
    management_view_users?: boolean;
    management_create_user?: boolean;
    management_update_user?: boolean;
    management_delete_user?: boolean;
    management_users_search_filter?: boolean;
    management_view_devices?: boolean;
    management_create_devices?: boolean;
    management_update_devices?: boolean;
    management_delete_devices?: boolean;
    management_devices_search_filter?: boolean;
    management_link_device_to_user?: boolean;

    //Organizations
    organizations_view_organization?: boolean;
    organizations_create_organizations?: boolean;
    organizations_update_organizations?: boolean;
    organizations_delete_organizations?: boolean;
    organizations_search_filter?: boolean;

    //Location
    location_view_states?: boolean;
    location_view_cities?: boolean;
    location_create_city?: boolean;
    location_update_city?: boolean;
    location_delete_city?: boolean;
    location_search_filter?: boolean;

    //Status
    status_view_status?: boolean;
    status_create_status?: boolean;
    status_update_status?: boolean;
    status_delete_status?: boolean;
    status_search_filter?: boolean;

    //ECommerce
    ecommerce_view_service_groups?: boolean;
    ecommerce_create_service_group?: boolean;
    ecommerce_update_service_group?: boolean;
    ecommerce_view_vendors?: boolean;
    ecommerce_create_vendor?:boolean;
    ecommerce_update_vendor?: boolean;
    ecommerce_view_vendor_services?: boolean;
    ecommerce_create_vendor_service?: boolean;
    ecommerce_update_vendor_service?: boolean;
    ecommerce_view_transactions?: boolean;
    ecommerce_create_transaction?: boolean;
    ecommerce_view_transaction_requests?: boolean;
    ecommerce_view_accounts?: boolean;
    ecommerce_create_account?: boolean;
    ecommerce_link_account_to_device?: boolean;

}