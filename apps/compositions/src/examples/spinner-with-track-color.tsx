'use client'

import { Spinner } from 'compositions/ui/spinner'

export const SpinnerWithTrackColor = () => (
  <Spinner
    color="red.500"
    css={{ '--spinner-track-color': 'colors.gray.200' }}
  />
)
