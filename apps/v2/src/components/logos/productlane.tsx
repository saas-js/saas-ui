import { chakra, useColorModeValue } from '@chakra-ui/react'

export const ProductLaneLogo = (props) => {
  return (
    <chakra.svg
      viewBox="0 0 17 22"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.072 0a.724.724 0 0 0-.512 1.236L8.925 3.6l-4.91 4.911a.724.724 0 0 0-.213.512v4.016L2.16 11.4a.724.724 0 0 0-1.235.512v8.64c0 .4.324.724.724.724h8.64a.724.724 0 0 0 .512-1.235l-2.365-2.366 4.911-4.911a.724.724 0 0 0 .212-.512V8.24L15.2 9.885a.724.724 0 0 0 1.236-.511V.724c0-.4-.324-.724-.723-.724H7.072Zm-3.06 15.297a.724.724 0 0 0 1.026.003l7.074-7.066v3.717L6.9 17.162a.724.724 0 0 0 0 1.024l1.642 1.642h-6.17v-6.17l1.64 1.639ZM10.46 3.089 8.819 1.448h6.17v6.174l-1.641-1.646a.724.724 0 0 0-1.024 0L5.25 13.041V9.324l5.21-5.211a.724.724 0 0 0 0-1.024Z"
        fill={useColorModeValue('black', 'white')}
      ></path>
    </chakra.svg>
  )
}
