import hasProviderAppImplementation from '../utils/hasProviderAppImplementation'

export async function checkProviderImplementation(
  ctx: Context,
  next: () => Promise<any>
) {
  const { apps, assets } = ctx.clients
  const metainfo = await apps.getAppsMetaInfos()
  const hasImplementationApp = hasProviderAppImplementation(
    metainfo,
    assets,
    'vtex.search-segment-graphql@0.1.1'
  )

  ctx.hasImplementationApp = hasImplementationApp

  await next()
}
