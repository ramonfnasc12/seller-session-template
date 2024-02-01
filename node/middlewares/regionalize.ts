export async function regionalize(ctx: Context, next: () => Promise<any>) {
  ctx.set('Cache-Control', 'no-cache')
  const {postalCode, country} = ctx.query
  const regionResponse = await ctx.clients.region.GetRegion(postalCode, country)
  const sellerNames: string[] = ([] as string[]).concat(...regionResponse.map(content => content.sellers.map(seller => seller.name)));
  ctx.response.status = 200
  ctx.response.body = sellerNames
  await next()
}
