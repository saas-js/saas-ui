import { getPropDoc } from '@saas-ui/props-docs'
import { getPropDoc as getChakraPropDoc } from '@chakra-ui/props-docs'
import { transparentize } from '@chakra-ui/theme-tools'
import {
  Box,
  Code,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import * as React from 'react'
import { convertBackticksToInlineCode } from '../utils/convert-backticks-to-inline-code'
import { t } from '../utils/i18n'

export type PropsTableProps = {
  /**
   * displayName of the target component
   */
  of: string
  /**
   * prop names to omit
   */
  omit?: string[] | null
  /**
   * Render only given prop names
   * Has precedence over `omit`
   */
  only?: string[] | null
}

const PropsTable = ({
  of,
  omit = ['layerStyle', 'noOfLines', 'textStyle', 'orientation', 'styleConfig'],
  only,
}: PropsTableProps) => {
  const propList = React.useMemo(
    () => makePropsTable({ of, omit, only }),
    [of, omit, only]
  )

  if (!propList.length) return null

  return (
    <Box overflow="hidden">
      <Table mt="8" fontSize="sm" overflowX="auto" display="block">
        <Thead>
          <Tr>
            <Th textTransform="none" fontWeight="medium" width="180px">
              Prop
            </Th>
            <Th textTransform="none" fontWeight="medium" width="280px">
              Type
            </Th>
            <Th textTransform="none" fontWeight="medium" width="120px">
              Default
            </Th>
            <Th textTransform="none" fontWeight="medium">
              Description
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {propList.map((prop) => (
            <Tr
              key={prop.name}
              _hover={{ bg: 'blackAlpha.50', _dark: { bg: 'whiteAlpha.50' } }}
            >
              <Td minWidth="180px">
                <Text
                  as="span"
                  fontWeight="medium"
                  color="primary.500"
                  fontSize="sm"
                  _dark={{ color: 'primary.300' }}
                >
                  {prop.name}
                </Text>

                {prop.required && (
                  <Code colorScheme="red" ms="2" fontSize="xs">
                    {t('component.props-table.required')}
                  </Code>
                )}
              </Td>
              <Td minWidth="280px">
                <Code
                  whiteSpace="normal"
                  fontSize="0.8em"
                  wordBreak="break-all"
                  borderWidth="1px"
                  rounded="sm"
                  bg="primary.50"
                  borderColor="primary.100"
                  color="inherit"
                  px="1"
                  py="0.5"
                  _dark={{
                    bg: transparentize('primary.900', 0.16),
                    borderColor: 'primary.900',
                  }}
                >
                  {prop.type}
                </Code>
              </Td>
              <Td minWidth="20%">
                {prop.defaultValue && (
                  <Code
                    whiteSpace="normal"
                    fontSize="0.8em"
                    borderRadius="sm"
                    borderWidth="1px"
                    py="0.5"
                    px="1"
                    bg="gray.50"
                    borderColor="gray.100"
                    color="inherit"
                    _dark={{
                      bg: 'whiteAlpha.100',
                      borderColor: 'whiteAlpha.200',
                    }}
                  >
                    {prop.defaultValue}
                  </Code>
                )}
              </Td>
              <Td minWidth="400px">
                {convertBackticksToInlineCode(prop.description)}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}

export default PropsTable

type MakePropsTableOptions = PropsTableProps

const customTable: Record<string, any> = {
  Section: {
    isLoading: {
      type: 'boolean',
      defaultValue: false,
    },
  },
}

function makePropsTable({ of, omit, only }: MakePropsTableOptions) {
  const props = customTable[of] ?? getPropDoc(of) ?? getChakraPropDoc(of)

  if (!props) return []

  return Object.entries(props)
    .filter(([name]) => {
      if (Array.isArray(only) && !only.includes(name)) {
        return false
      }

      if (Array.isArray(omit) && omit.includes(name)) {
        return false
      }

      return true
    })
    .map(([name, value]: any[]) => ({
      name,
      ...value,
      type: cleanType(value.type),
      defaultValue: cleanDefaultValue(value.defaultValue),
    }))
}

function cleanType(value: any) {
  return typeof value === 'string' ? value.replace(';', '') : value
}

function cleanDefaultValue(value: any) {
  return typeof value === 'boolean' ? value.toString() : value
}
