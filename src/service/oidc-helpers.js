import { UserManager } from 'oidc-client'

export const createOidcUserManager = oidcSettings => new UserManager(oidcSettings)
