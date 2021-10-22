import React, { useState, useEffect, useContext } from 'react'
import createPalette from '@saas-ui/palette'

export const PaletteContext: any = React.createContext({})

const PaletteProvider = ({ color = '#6d28d9', options = {}, children }) => {
  const [colors, setColors] = useState({
    base: color,
  })

  const setPalette = (color, options) => {
    setColors(
      Object.assign(createPalette(color, options), {
        base: color,
      })
    )
  }

  useEffect(() => {
    if (color) {
      setPalette(color, options)
    }
  }, [color])

  const value = [colors, setPalette]

  return (
    <PaletteContext.Provider value={value}>
      {children({ colors })}
    </PaletteContext.Provider>
  )
}

export const usePalette = () => useContext(PaletteContext)

export default PaletteProvider
