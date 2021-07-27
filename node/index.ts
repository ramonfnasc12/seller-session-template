import type { ServiceContext } from '@vtex/api'
import { method, Service } from '@vtex/api'

import { transform } from './middlewares/transform'

declare global {
  // We declare a global Context type just to avoid re-writing ServiceContext<Clients, State> in every handler and resolver
  type Context = ServiceContext
}

export default new Service({
  routes: {
    transform: method({
      POST: [transform],
    }),
  },
})
