import { Prose } from 'compositions/ui/prose'

// Used for syntax highlighting
const html = String.raw

const content = html`
  <h3>Tables</h3>
  <table>
    <thead>
      <tr>
        <th>Plan</th>
        <th>Seats</th>
        <th>Price</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Starter</td>
        <td>3</td>
        <td>$0</td>
      </tr>
      <tr>
        <td>Team</td>
        <td>25</td>
        <td>$49</td>
      </tr>
      <tr>
        <td>Enterprise</td>
        <td>Unlimited</td>
        <td>Custom</td>
      </tr>
    </tbody>
  </table>
`

export const ProseWithTable = () => {
  return <Prose dangerouslySetInnerHTML={{ __html: content }} />
}
