export const adminSections = {
  TRAFFIC: 'E-traffic',
  POLICE: 'E-police',
  FIRE_DEPARTMENT: 'E-fire department',
  HEALTHCARE: 'E-healthcare'
} as const

export type typeAdminSections =
  (typeof adminSections)[keyof typeof adminSections]

export const managementTabEnums = {
  USERS: 'user',
  ACTIONS: 'actions',
  ROLES: 'roles',
  ORGANIZATIONS: 'organizations'
} as const

export type mamagenentTabType =
  (typeof managementTabEnums)[keyof typeof managementTabEnums]
