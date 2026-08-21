"use client"

import { DatePicker } from "@chakra-ui/react"

export const DatePickerInputOnly = () => {
  return (
    <DatePicker.Root maxWidth="20rem">
      <DatePicker.Label>Date of birth</DatePicker.Label>
      <DatePicker.Control>
        <DatePicker.Input />
      </DatePicker.Control>
    </DatePicker.Root>
  )
}
