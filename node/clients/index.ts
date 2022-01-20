import type { ClientsConfig } from '@vtex/api'
import { IOClients } from '@vtex/api'

import { GraphQLServer } from './graphqlServer'

const MEDIUM_TIMEOUT_MS = 5 * 1000

export class Clients extends IOClients {
  public get graphqlServer(): GraphQLServer {
    return this.getOrSet('graphqlServer', GraphQLServer)
  }
}

export const clients: ClientsConfig<Clients> = {
  implementation: Clients,
  options: {
    default: {
      retries: 2,
      timeout: MEDIUM_TIMEOUT_MS,
    },
  },
}
