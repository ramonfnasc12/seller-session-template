import type { ClientsConfig } from '@vtex/api'
import { IOClients } from '@vtex/api'

import { SearchSegment } from './search-segment'

const MEDIUM_TIMEOUT_MS = 2 * 1000

export class Clients extends IOClients {
  public get searchSegment(): SearchSegment {
    return this.getOrSet('searchSegment', SearchSegment)
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
