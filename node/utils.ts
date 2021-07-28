export const parseFacetsString = (facetsStr: string): SelectedFacet[] => {
  const selectedFacets: SelectedFacet[] = []

  if (!facetsStr) {
    selectedFacets
  }

  facetsStr.split(';').forEach((facetStr) => {
    const [key, value] = facetStr.split('=')

    if (key && value) {
      selectedFacets.push({
        key,
        value,
      })
    }
  })

  return selectedFacets
}

export const stringifyFacets = (selectedFacets: SelectedFacet[]) =>
  selectedFacets.reduce(
    (acum: string, { key, value }: SelectedFacet) => `${acum}${key}=${value};`,
    ''
  )
