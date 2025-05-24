/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { SVGProps } from 'react'

import { SaasUILogo } from '@saas-ui/assets'

export const size = {
  width: 1200,
  height: 630,
}

export interface OpenGraphImageProps {
  backgroundSrc?: ArrayBuffer
  title?: string
  category?: string
}

export function OpenGraphImage({
  title,
  category,
  backgroundSrc,
}: OpenGraphImageProps) {
  return (
    <div
      style={{
        display: 'flex',
        width: size.width,
        height: size.height,
        padding: '53px 98px',
      }}
    >
      {backgroundSrc && (
        <img
          src={backgroundSrc as unknown as string}
          width={size.width}
          height={size.height}
          style={{ position: 'absolute', top: 0, left: 0 }}
        />
      )}

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
        }}
      >
        <SaasUILogo style={{ marginBottom: '65px' }} />
        {category ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '13px',
              color: 'oklch(0.511 0.262 276.966)',
              fontFamily: 'Satoshi',
              fontSize: '28px',
              fontWeight: 700,
              lineHeight: '37.8px',
              letterSpacing: '-0.03em',
              textAlign: 'left',
              marginBottom: '26px',
            }}
          >
            {category}
          </div>
        ) : (
          <div
            style={{
              height: '65px',
            }}
          />
        )}
        <div
          style={{
            color: 'rgba(240, 240, 240, 1)',
            fontFamily: 'Satoshi',
            fontSize: '65px',
            fontWeight: 700,
            lineHeight: '87.75px',
            letterSpacing: '-0.03em',
            textAlign: 'left',
            textWrap: 'wrap',
            maxWidth: '719px',
          }}
        >
          {title}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          position: 'absolute',
          bottom: '53px',
          left: '98px',
          right: '98px',
          height: '7px',
          background: 'oklch(0.511 0.262 276.966)',
        }}
      />
    </div>
  )
}
