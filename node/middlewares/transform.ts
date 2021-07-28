import { json } from 'co-body'

import { parseFacetsString, stringifyFacets } from '../utils'

export async function transform(ctx: Context, next: () => Promise<any>) {
  ctx.set('Cache-Control', 'no-cache')
  const { searchSegment } = ctx.clients

  const body = await json(ctx.req)

  const userEmail = body?.profile?.email?.value
  const isAuthenticated = body?.profile?.isAuthenticated?.value === 'true'
  const facetsStr = body?.public?.facets?.value
  const facets = parseFacetsString(facetsStr)

  const selectedFacetsResult = await searchSegment.searchSegment({
    userEmail,
    isAuthenticated,
    selectedFacets: facets,
  })

  ctx.response.status = 200
  ctx.response.body = {
    search: {
      facets: {
        value: stringifyFacets(selectedFacetsResult.data?.searchSegment ?? []),
      },
    },
  }
  await next()
}
