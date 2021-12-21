import React, { useState, useEffect, useContext } from 'react'
import { createPalette } from '@saas-ui/palette'

export const PaletteContext: any = React.createContext({})

const PaletteProvider = ({
  color = '#6d28d9',
  options = {},
  children,
}: any) => {
  const [colors, setColors] = useState({})

  const setPalette = (color: string, options: any) => {
    setColors(createPalette(color, options))
  }

  useEffect(() => {
    if (color) {
      setPalette(color, options)
    }
  }, [color, options])

  const value = [{ color, options, colors }, setPalette]

  return (
    <PaletteContext.Provider value={value}>{children}</PaletteContext.Provider>
  )
}

export const usePalette = (): any => useContext(PaletteContext)

export default PaletteProvider
