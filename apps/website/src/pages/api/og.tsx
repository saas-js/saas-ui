import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const config = {
  runtime: 'experimental-edge',
}

export default function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)

    // ?title=<title>
    const hasTitle = searchParams.has('title')
    const title = hasTitle
      ? searchParams.get('title')?.slice(0, 100)
      : 'My default title'

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
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              justifyItems: 'center',
              position: 'absolute',
              top: '60px',
              left: '60px',
            }}
          >
            <img
              alt="Saas UI"
              height={60}
              src="data:image/svg+xml;base64,ICAgIDxzdmcKICAgICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICAgICB2aWV3Qm94PSIwIDAgNTUwIDE3MiIKICAgID4KICAgICAgPHBhdGgKICAgICAgICBmaWxsPSIjODk1MmUwIgogICAgICAgIGQ9Ik0xMTcuNjcgMTYuNTloLTU0Yy0xLjg2IDAtMy4zNiAxLjUtMy4zNiAzLjM2VjQ2LjJjMCAyLjExLS44OSA0LjExLTIuNDYgNS41MmwtLjEuMDlhNy40MzggNy40MzggMCAwIDEtNC45NiAxLjlIMjAuMjRjLTEuODYgMC0zLjM2IDEuNS0zLjM2IDMuMzZ2MzguNDRjMCAxLjg2IDEuNSAzLjM2IDMuMzYgMy4zNmgzNC41MWMxLjg2IDAgMy4zNi0xLjUgMy4zNi0zLjM2VjU5LjI1YzAtMi4xMS44OS00LjExIDIuNDYtNS41MmE3LjQzOCA3LjQzOCAwIDAgMSA0Ljk2LTEuOWg1Mi4xNWMxLjg2IDAgMy4zNi0xLjUgMy4zNi0zLjM2VjE5Ljk1YTMuMzcgMy4zNyAwIDAgMC0zLjM3LTMuMzZ6IgogICAgICAvPgogICAgICA8cGF0aAogICAgICAgIGZpbGw9IiM4OTUyZTAiCiAgICAgICAgZD0iTTExNy42NyA3Mi43OGgtMzQuNWMtMS44NiAwLTMuMzYgMS41LTMuMzYgMy4zNnYzNi4yN2MwIDIuMTEtLjg5IDQuMTEtMi40NiA1LjUyYTcuNDM4IDcuNDM4IDAgMCAxLTQuOTYgMS45SDIwLjI0Yy0xLjg2IDAtMy4zNiAxLjUtMy4zNiAzLjM2djI4LjU2YzAgMS44NiAxLjUgMy4zNiAzLjM2IDMuMzZoNTRjMS44NiAwIDMuMzYtMS41IDMuMzYtMy4zNnYtMjYuM2MwLTIuMTEuODktNC4xMSAyLjQ2LTUuNTJsLjEtLjA5YTcuNDM4IDcuNDM4IDAgMCAxIDQuOTYtMS45aDMyLjU0YzEuODYgMCAzLjM2LTEuNSAzLjM2LTMuMzZWNzYuMTNhMy4zMzcgMy4zMzcgMCAwIDAtMy4zNS0zLjM1eiIKICAgICAgLz4KICAgICAgPHBhdGgKICAgICAgICBmaWxsPSIjZmZmIgogICAgICAgIGQ9Im0yMjEuNyA1OC4wOC01LjM1IDEwLjgyYy01Ljk5LTMuNjktMTMuNS01Ljk5LTE5LjQ4LTUuOTktNS43MyAwLTkuOTMgMS45MS05LjkzIDYuNzUgMCAxMi40OCAzNi4wNCA1LjczIDM1LjkxIDMwLjMxIDAgMTMuODgtMTIuMzUgMjAuMTItMjUuOTggMjAuMTItOS45MyAwLTIwLjUtMy4zMS0yNy4yNS05LjQybDUuMjItMTAuNDRjNS44NiA1LjIyIDE1LjI4IDguNCAyMi42NyA4LjQgNi4yNCAwIDExLjA4LTIuMTcgMTEuMDgtNy4yNiAwLTEzLjg4LTM1LjY2LTYuMTEtMzUuNTMtMzAuNTYgMC0xMy43NSAxMS45Ny0xOS42MSAyNC45Ni0xOS42MSA4LjUzIDAgMTcuNTcgMi41NSAyMy42OCA2Ljg4ek0yNzcuMzggMTExLjMxYy00Ljg0IDUuOTktMTIuNjEgOC45MS0yMi40MSA4LjkxLTE0LjY0IDAtMjMuODEtOS4wNC0yMy44MS0yMS4wMSAwLTEyLjM1IDkuMy0yMC4yNSAyNS42LTIwLjM3aDIwLjVWNzYuOGMwLTguNTMtNS40OC0xMy42My0xNi4xNy0xMy42My02LjQ5IDAtMTMuMjQgMi4yOS0xOS45OSA2Ljg4bC01Ljk4LTEwLjE5YzkuNDItNS42IDE2LjMtOC41MyAyOS4xNi04LjUzIDE3LjQ1IDAgMjcuMjUgOC45MSAyNy4zOCAyMy44MWwuMTMgNDQuNDRIMjc3LjR2LTguMjd6bS0uMTMtMTUuNTR2LTYuMjRoLTE4LjM0Yy05LjU1IDAtMTQuMDEgMi41NS0xNC4wMSA5LjA0IDAgNi4xMSA0Ljk3IDEwLjA2IDEzLjEyIDEwLjA2IDEwLjQ1IDAgMTguNDctNS40NyAxOS4yMy0xMi44NnpNMzQ5LjM4IDExMS4zMWMtNC44NCA1Ljk5LTEyLjYxIDguOTEtMjIuNDEgOC45MS0xNC42NCAwLTIzLjgxLTkuMDQtMjMuODEtMjEuMDEgMC0xMi4zNSA5LjMtMjAuMjUgMjUuNi0yMC4zN2gyMC41Vjc2LjhjMC04LjUzLTUuNDgtMTMuNjMtMTYuMTctMTMuNjMtNi40OSAwLTEzLjI0IDIuMjktMTkuOTkgNi44OGwtNS45OC0xMC4xOWM5LjQyLTUuNiAxNi4zLTguNTMgMjkuMTYtOC41MyAxNy40NSAwIDI3LjI1IDguOTEgMjcuMzggMjMuODFsLjEzIDQ0LjQ0SDM0OS40di04LjI3em0tLjEyLTE1LjU0di02LjI0aC0xOC4zNGMtOS41NSAwLTE0LjAxIDIuNTUtMTQuMDEgOS4wNCAwIDYuMTEgNC45NyAxMC4wNiAxMy4xMiAxMC4wNiAxMC40NCAwIDE4LjQ2LTUuNDcgMTkuMjMtMTIuODZ6TTQyNS41OSA1OC4wOGwtNS4zNSAxMC44MmMtNS45OS0zLjY5LTEzLjUtNS45OS0xOS40OC01Ljk5LTUuNzMgMC05LjkzIDEuOTEtOS45MyA2Ljc1IDAgMTIuNDggMzYuMDQgNS43MyAzNS45MSAzMC4zMSAwIDEzLjg4LTEyLjM1IDIwLjEyLTI1Ljk4IDIwLjEyLTkuOTMgMC0yMC41LTMuMzEtMjcuMjUtOS40Mmw1LjIyLTEwLjQ0YzUuODYgNS4yMiAxNS4yOCA4LjQgMjIuNjcgOC40IDYuMjQgMCAxMS4wOC0yLjE3IDExLjA4LTcuMjYgMC0xMy44OC0zNS42Ni02LjExLTM1LjUzLTMwLjU2IDAtMTMuNzUgMTEuOTctMTkuNjEgMjQuOTYtMTkuNjEgOC41MyAwIDE3LjU3IDIuNTUgMjMuNjggNi44OHpNNDcyLjkgMTIwLjAyYy04LjU1IDAtMTUuMTItMi4yMi0xOS41MS02LjYtNC4zOS00LjM3LTYuNjItMTAuOTEtNi42Mi0xOS40M1Y1MS44N2g4LjhWODguNmMwIDguNzMgMS4zMSAxNC43MSA0IDE4LjI4IDIuNzEgMy41OSA3LjI4IDUuNDEgMTMuNTkgNS40MSA2LjMgMCAxMC44NS0xLjggMTMuNTItNS4zNSAyLjY1LTMuNTIgMy45My05LjUyIDMuOTMtMTguMzRWNTEuODdoOC41NFY5NGMwIDguNTYtMi4yMiAxNS4xLTYuNjEgMTkuNDYtNC4zOSA0LjM1LTExIDYuNTYtMTkuNjQgNi41NnpNNTE0LjY2IDUxLjg3aDguNTR2NjcuNjZoLTguNTR6IgogICAgICAvPgogICAgPC9zdmc+"
              style={{ margin: '0 30px' }}
              width={200}
            />
          </div>
          <div
            style={{
              fontSize: 60,
              fontStyle: 'normal',
              letterSpacing: '-0.025em',
              fontWeight: 'bold',
              color: 'white',
              marginTop: 30,
              padding: '0 120px',
              lineHeight: 1.4,
              whiteSpace: 'pre-wrap',
            }}
          >
            {title}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
