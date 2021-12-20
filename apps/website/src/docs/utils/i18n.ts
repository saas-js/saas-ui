import { get } from 'lodash'
import uiJson from '../../i18n/ui.json'

export function t(str: string) {
  // TODO: load the locale appropriate ui.json file
  return get(uiJson, str)
}
