export const SYSTEMS = {
  chakra: {
    name: 'chakra',
    label: 'Chakra UI',
  },
  panda: {
    name: 'panda',
    label: 'Panda CSS',
  },
} as const

export type System = (typeof SYSTEMS)[keyof typeof SYSTEMS]

export const getSystem = (name: string): System | undefined => {
  return SYSTEMS[name as keyof typeof SYSTEMS]
}
