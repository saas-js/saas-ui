declare module '*?raw' {
  const content: string
  export default content
}

declare module '*.svg?url' {
  const url: string
  export default url
}
