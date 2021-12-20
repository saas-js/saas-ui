import TinyColor from '@ctrl/tinycolor'
import { useRef, useEffect } from 'react'

interface GlowParticleProps {
  x: number
  y: number
  radius: number
  color: string
  speed: number
}

const PI2 = Math.PI * 2
const GlowParticle = (props: GlowParticleProps) => {
  let { x, y, radius, color, speed } = props

  let vx = Math.random() * 4
  let vy = Math.random() * 4

  let sinValue = Math.random()

  const animate = (
    ctx: CanvasRenderingContext2D,
    stageWidth: number,
    stageHeight: number
  ) => {
    sinValue += 0.01

    radius += Math.sin(sinValue)

    x += vx
    y += vy

    if (x < 0) {
      vx *= -1
      x += speed
    } else if (x > stageWidth) {
      vx *= -1
      x -= speed
    }

    if (y < 0) {
      vy *= -1
      y += speed
    } else if (y > stageHeight) {
      vy *= -1
      y -= speed
    }

    ctx.beginPath()
    const g = ctx.createRadialGradient(x, y, radius * 0.01, x, y, radius)
    g.addColorStop(0, new (TinyColor as any)(color).toRgbString())
    g.addColorStop(1, new (TinyColor as any)(color).setAlpha(0).toRgbString())
    ctx.fillStyle = g
    ctx.arc(x, y, radius, 0, PI2, false)
    ctx.fill()
  }

  return { animate }
}

export interface MovingGradientsProps {
  colors: string[]
  animate: boolean
  speed?: number
}

export const MovingGradients = ({
  colors,
  animate,
  speed = 5,
}: MovingGradientsProps) => {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current

    if (!canvas) {
      return
    }

    const totalParticles = 15
    let particles: any = []
    const maxRadius = 1000
    const minRadius = 500

    const ctx = canvas.getContext('2d')

    if (!ctx) {
      return
    }

    let stageWidth = window.innerWidth
    let stageHeight = window.innerHeight

    ctx.globalCompositeOperation = 'saturation'

    const createParticles = () => {
      let curColor = 0
      particles = []

      for (let i = 0; i < totalParticles; i++) {
        const item = GlowParticle({
          x: Math.random() * stageWidth,
          y: Math.random() * stageHeight,
          radius: Math.random() * (maxRadius - minRadius) + minRadius,
          color: colors[curColor],
          speed,
        })

        if (++curColor >= colors.length) {
          curColor = 0
        }

        particles[i] = item
      }
    }

    const resize = () => {
      stageWidth = window.innerWidth
      stageHeight = window.innerHeight

      canvas.width = stageWidth
      canvas.height = stageHeight

      createParticles()
    }

    window.addEventListener('resize', resize, false)

    resize()

    const startAnimation = () => {
      window.requestAnimationFrame(startAnimation)

      ctx.clearRect(0, 0, stageWidth, stageHeight)

      for (let i = 0; i < totalParticles; i++) {
        const item = particles[i]
        item.animate(ctx, stageWidth, stageHeight)
      }
    }

    if (animate) {
      startAnimation()
    }

    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [animate, colors, speed])

  return <canvas ref={ref}></canvas>
}
