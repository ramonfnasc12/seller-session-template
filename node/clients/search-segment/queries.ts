export const searchSegment = `
query searchSegment($userEmail: String, $isAuthenticated: Boolean $selectedFacets: [SelectedFacetsInput]) {
  searchSegment(isAuthenticated: $isAuthenticated, userEmail: $userEmail, selectedFacets: $selectedFacets){
    key
    value
  }
}
`
