import { json } from 'co-body'

import { parseFacetsString, stringifyFacets } from '../utils'

export const searchSegmentQuery = `
query searchSegment($userEmail: String, $isAuthenticated: Boolean $selectedFacets: [SelectedFacetsInput]) {
  searchSegment(isAuthenticated: $isAuthenticated, userEmail: $userEmail, selectedFacets: $selectedFacets){
    key
    value
  }
}
`

export async function transform(ctx: Context, next: () => Promise<any>) {
  ctx.set('Cache-Control', 'no-cache')
  const { graphqlServer } = ctx.clients

  const body = await json(ctx.req)

  const userEmail = body?.profile?.email?.value
  const isAuthenticated = body?.profile?.isAuthenticated?.value === 'true'
  const facetsStr = body?.public?.facets?.value
  const facets = parseFacetsString(facetsStr)

  let selectedFacetsResult: SelectedFacet[] | undefined = facets

  if (ctx.hasImplementationApp) {
    try {
      selectedFacetsResult = (
        await graphqlServer.query(
          searchSegmentQuery,
          {
            userEmail,
            isAuthenticated,
            selectedFacets: facets,
          },
          { metric: 'search-segment', cacheable: 0 }
        )
      ).data?.searchSegment
    } catch (error) {
      if (process.env.VTEX_APP_LINK) {
        console.error(error)
      }

      ctx.vtex.logger.error({
        message: error.message,
        error,
      })
    }
  }

  ctx.response.status = 200
  ctx.response.body = {
    search: {
      facets: {
        value: stringifyFacets(selectedFacetsResult ?? []),
      },
    },
  }
  await next()
}
