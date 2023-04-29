import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const config = {
  runtime: 'edge',
}

const font = fetch(
  new URL('../../../public/fonts/Inter-Regular.ttf', import.meta.url)
).then((res) => res.arrayBuffer())
// const fontBold = fetch(
//   new URL('../../../public/fonts/Inter-SemiBold.ttf', import.meta.url)
// ).then((res) => res.arrayBuffer())

export default async function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const fontData = await font
    // const fontDataBold = await fontBold
    const hasTitle = searchParams.has('title')
    const title = hasTitle
      ? searchParams.get('title')?.slice(0, 100)
      : 'The React component library for startups'
    const description = hasTitle
      ? searchParams.get('description')?.slice(0, 200)
      : undefined
    const screenshot = searchParams.get('screenshot')

    const host = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3020'

    return new ImageResponse(
      (
        <div
          style={{
            backgroundColor: 'black',
            height: '100%',
            width: '100%',
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            flexWrap: 'nowrap',
          }}
        >
          <img
            src={`${host}/img/og-background.png`}
            width="100%"
            height="100%"
          />
          <div
            style={{
              background:
                'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%)',
              height: '100%',
              width: '100%',
              position: 'absolute',
              top: '0',
            }}
          />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              justifyItems: 'center',
              position: 'absolute',
              top: '60px',
              left: '60px',
              zIndex: 10,
            }}
          >
            <img
              alt="Saas UI"
              height="60"
              src={`${host}/saasui-dark.svg`}
              style={{ margin: '0 30px' }}
              width="200"
            />
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              fontSize: screenshot ? 60 : 72,
              fontStyle: 'normal',
              letterSpacing: '-0.025em',
              lineHeight: 1.4,
              whiteSpace: 'pre-wrap',
              textAlign: 'left',
              position: 'absolute',
              left: '100px',
              top: '200px',
              bottom: '60px',
              zIndex: 10,
              maxWidth: screenshot ? '440px' : '900px',
            }}
          >
            <div
              style={{
                fontFamily: 'InterBold',
                fontWeight: 700,
                color: 'white',
                marginBottom: 20,
              }}
            >
              {title}
            </div>

            {description && (
              <div
                style={{
                  fontFamily: 'Inter',
                  display: 'flex',
                  fontSize: 30,
                  fontWeight: 400,
                  color: 'rgba(255,255,255,0.5)',
                }}
              >
                {description}
              </div>
            )}
          </div>
          {screenshot && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                justifyItems: 'center',
                position: 'absolute',
                top: '40px',
                right: '-400px',
                width: '800px',
                zIndex: 10,
                transform: 'scale(0.8)',
              }}
            >
              <img
                alt="Saas UI Dashboard"
                height="1021"
                src={`${host}/screenshots/list.png`}
                style={{ margin: '0 30px' }}
                width="1607"
              />
            </div>
          )}
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Inter',
            data: fontData,
            style: 'normal',
            weight: 400,
          },
          // {
          //   name: 'InterBold',
          //   data: fontDataBold,
          //   style: 'normal',
          //   weight: 700,
          // },
        ],
      }
    )
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
