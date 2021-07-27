import { json } from 'co-body'

export async function transform(ctx: Context, next: () => Promise<any>) {
  ctx.set('Cache-Control', 'no-cache')

  const body = await json(ctx.req)

  ctx.response.status = 200
  ctx.response.body = {
    search: {
      facets: {
        value: body.public.facets.value,
      },
    },
  }
  await next()
}
