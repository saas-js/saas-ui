'use client';
import { Button, ButtonGroup } from '@chakra-ui/react'
import { EmptyState } from 'compositions/ui/empty-state'
import { HiColorSwatch } from 'react-icons/hi'

export const EmptyStateWithAction = () => {
  return (
    <EmptyState
      icon={<HiColorSwatch />}
      title="Start adding tokens"
      description="Add a new design token to get started"
    >
      <ButtonGroup>
        <Button variant="outline">Create token</Button>
        <Button variant="solid">Import</Button>
      </ButtonGroup>
    </EmptyState>
  )
}
