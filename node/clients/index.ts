import type { ClientsConfig } from '@vtex/api'
import { IOClients } from '@vtex/api'
import { Region } from './region'

const MEDIUM_TIMEOUT_MS = 6 * 1000

export class Clients extends IOClients {
  public get region() {
    return this.getOrSet('region', Region)
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
