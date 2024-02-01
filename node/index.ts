import type {
  RecorderState,
  ParamsContext,
  ServiceContext,
  SegmentData,
  IOContext,
} from '@vtex/api'
import { method, Service } from '@vtex/api'

import type { Clients } from './clients'
import { clients } from './clients'
import { transform } from './middlewares/transform'
import { regionalize } from './middlewares/regionalize'

declare global {
  // We declare a global Context type just to avoid re-writing ServiceContext<Clients, State> in every handler and resolver
  type Context = ServiceContext<Clients, RecorderState, CustomContext> & {
    hasImplementationApp?: boolean
  }

  interface CustomContext extends ParamsContext {
    vtex: CustomIOContext
  }
  interface CustomIOContext extends IOContext {
    segment?: SegmentData
  }
}

export default new Service<Clients, RecorderState, ParamsContext>({
  clients,
  routes: {
    transform: method({
      POST: [transform],
    }),
    regionalize: method({
      GET: [regionalize],
    }),
  },
})
