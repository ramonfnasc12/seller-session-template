import type { IOContext, InstanceOptions } from '@vtex/api'
import { AppGraphQLClient } from '@vtex/api'

import { searchSegment } from './queries'

interface SearchSegmentPayload {
  userEmail?: string
  isAuthenticated?: boolean
  selectedFacets?: Array<{ key: string; value: string }>
}

export class SearchSegment extends AppGraphQLClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('vtex.search-segment-resolver@0.x', context, {
      ...options,
      headers: {
        ...options?.headers,
        'x-vtex-provider': 'vtex.search-segment-graphql@0.1.0',
      },
    })
  }

  public searchSegment = (variables: SearchSegmentPayload) => {
    return this.graphql.query<
      { searchSegment: SelectedFacet[] },
      SearchSegmentPayload
    >(
      {
        query: searchSegment,
        variables,
      },
      {
        metric: 'search-segment',
      }
    )
  }
}
