'use client'

import { Button } from 'compositions/ui/button'
import { KbdGroup } from 'compositions/ui/kbd-group'
import { Tooltip } from 'compositions/ui/tooltip'

export const KbdGroupInTooltip = () => {
  return (
    <Tooltip
      content={
        <>
          Go to inbox <KbdGroup>G then I</KbdGroup>
        </>
      }
    >
      <Button variant="outline" size="sm">
        Inbox
      </Button>
    </Tooltip>
  )
}
