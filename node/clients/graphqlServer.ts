import type { InstanceOptions, IOContext, RequestConfig } from '@vtex/api'
import { AppClient, GraphQLClient } from '@vtex/api'

interface SearchSegmentPayload {
  userEmail?: string
  isAuthenticated?: boolean
  selectedFacets?: Array<{ key: string; value: string }>
}

export class GraphQLServer extends AppClient {
  protected graphql: GraphQLClient

  constructor(ctx: IOContext, opts?: InstanceOptions) {
    super('vtex.graphql-server@1.x', ctx, opts)
    this.graphql = new GraphQLClient(this.http)
  }

  public query = async (
    query: string,
    variables: any,
    config: RequestConfig
  ) => {
    return this.graphql.query<
      { searchSegment: SelectedFacet[] },
      SearchSegmentPayload
    >(
      {
        query,
        variables,
      },
      {
        ...config,
        params: {
          ...config.params,
          locale: this.context.locale,
        },
        url: '/graphql',
      }
    )
  }
}
