import { json } from 'co-body'

import { parseFacetsString, stringifyFacets } from '../utils'


export async function transform(ctx: Context, next: () => Promise<any>) {
  ctx.set('Cache-Control', 'no-cache')

  const body = await json(ctx.req)
  console.log(body)
  const facetsStr = body?.public?.facets?.value
  const facets = parseFacetsString(facetsStr)

  let selectedFacetsResult: SelectedFacet[] | undefined = facets

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
