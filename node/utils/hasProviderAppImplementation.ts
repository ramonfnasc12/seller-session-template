import type { AppMetaInfo, Assets } from '@vtex/api'

const getBuildFeatures = (wokspaceMetainfos: AppMetaInfo[], appId: string) => {
  const appMetainfo = wokspaceMetainfos.find(
    (metainfo: any) => metainfo.id === appId
  )

  return appMetainfo?._buildFeatures ?? {}
}

const isInstalled = (wokspaceMetainfos: AppMetaInfo[], appId: string) => {
  const appMetainfo = wokspaceMetainfos.find(
    (metainfo: AppMetaInfo) => metainfo.id === appId
  )

  return appMetainfo?._isRoot
}

const implementsGraphqlSchema = (buildFeatures: any) =>
  buildFeatures['vtex.graphql-server']?.includes('implements-graphql')

// The app vtex.search-segment-resolver is just a boilerplate and doesn't need to be called.
const isBoilerPlateApp = (appName: string) =>
  appName.split('@')[0] === 'vtex.search-segment-resolver'

export default function hasProviderAppImplementation(
  workspaceMetaInfo: AppMetaInfo[],
  assetsClient: Assets,
  providerApp: string
) {
  const dependsOnApp = assetsClient
    .getFilteredDependencies(providerApp, workspaceMetaInfo)
    .map((dep) => dep.id)

  const dependencies = dependsOnApp
    .filter((appDep) => {
      const appBF = getBuildFeatures(workspaceMetaInfo, appDep)

      return implementsGraphqlSchema(appBF)
    })
    .filter((appDep) => isInstalled(workspaceMetaInfo, appDep))

  if (dependencies.length === 0 || isBoilerPlateApp(dependencies[0])) {
    return false
  }

  return true
}
