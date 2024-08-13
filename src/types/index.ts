interface Team {
  id: string
  name: string
  gists: Gist[]
}

interface Gist {
  id: string
  name: string
  code: string
}
