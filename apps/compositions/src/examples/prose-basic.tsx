import { Prose } from 'compositions/ui/prose'

// Used for syntax highlighting
const html = String.raw

const content = html`
  <h1>Title Heading 1</h1>
  <h2>Title Heading 2</h2>
  <h3>Title Heading 3</h3>
  <h4>Title Heading 4 <code>testing</code></h4>

  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at dolor nec
    ex rutrum semper. Praesent ultricies purus eget lectus tristique egestas ac
    in lacus. Press <kbd>Ctrl</kbd> + <kbd>C</kbd> to copy.
  </p>

  <hr />

  <p>
    Fusce placerat ipsum vel sollicitudin imperdiet. Morbi vulputate non diam at
    consequat. Donec vitae sem eu arcu auctor scelerisque vel in turpis.
  </p>
`

export const ProseBasic = () => {
  return <Prose dangerouslySetInnerHTML={{ __html: content }} />
}
