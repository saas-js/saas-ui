import * as stylex from '@stylexjs/stylex'

export const spin = stylex.keyframes({
  '0%': {
    transform: 'rotate(0deg)',
  },
  '100%': {
    transform: 'rotate(360deg)',
  },
})

export const pulse = stylex.keyframes({
  '50%': {
    opacity: '0.5',
  },
})

export const ping = stylex.keyframes({
  '75%, 100%': {
    transform: 'scale(2)',
    opacity: '0',
  },
})

export const bounce = stylex.keyframes({
  '0%, 100%': {
    transform: 'translateY(-25%)',
    animationTimingFunction: 'cubic-bezier(0.8,0,1,1)',
  },
  '50%': {
    transform: 'none',
    animationTimingFunction: 'cubic-bezier(0,0,0.2,1)',
  },
})

export const bgPosition = stylex.keyframes({
  from: {
    backgroundPosition: 'var(--animate-from, 1rem) 0',
  },
  to: {
    backgroundPosition: 'var(--animate-to, 0) 0',
  },
})

export const position = stylex.keyframes({
  from: {
    insetInlineStart: 'var(--animate-from-x)',
    insetBlockStart: 'var(--animate-from-y)',
  },
  to: {
    insetInlineStart: 'var(--animate-to-x)',
    insetBlockStart: 'var(--animate-to-y)',
  },
})

export const circularProgress = stylex.keyframes({
  '0%': {
    strokeDasharray: '1, 400',
    strokeDashoffset: '0',
  },
  '50%': {
    strokeDasharray: '400, 400',
    strokeDashoffset: '-100%',
  },
  '100%': {
    strokeDasharray: '400, 400',
    strokeDashoffset: '-260%',
  },
})

export const expandHeight = stylex.keyframes({
  from: {
    height: '0',
  },
  to: {
    height: 'var(--height)',
  },
})

export const collapseHeight = stylex.keyframes({
  from: {
    height: 'var(--height)',
  },
  to: {
    height: '0',
  },
})

export const expandWidth = stylex.keyframes({
  from: {
    width: '0',
  },
  to: {
    width: 'var(--width)',
  },
})

export const collapseWidth = stylex.keyframes({
  from: {
    height: 'var(--width)',
  },
  to: {
    height: '0',
  },
})

export const fadeIn = stylex.keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
})

export const fadeOut = stylex.keyframes({
  from: {
    opacity: 1,
  },
  to: {
    opacity: 0,
  },
})

export const slideFromLeftFull = stylex.keyframes({
  from: {
    translate: '-100% 0',
  },
  to: {
    translate: '0 0',
  },
})

export const slideFromRightFull = stylex.keyframes({
  from: {
    translate: '100% 0',
  },
  to: {
    translate: '0 0',
  },
})

export const slideFromTopFull = stylex.keyframes({
  from: {
    translate: '0 -100%',
  },
  to: {
    translate: '0 0',
  },
})

export const slideFromBottomFull = stylex.keyframes({
  from: {
    translate: '0 100%',
  },
  to: {
    translate: '0 0',
  },
})

export const slideToLeftFull = stylex.keyframes({
  from: {
    translate: '0 0',
  },
  to: {
    translate: '-100% 0',
  },
})

export const slideToRightFull = stylex.keyframes({
  from: {
    translate: '0 0',
  },
  to: {
    translate: '100% 0',
  },
})

export const slideToTopFull = stylex.keyframes({
  from: {
    translate: '0 0',
  },
  to: {
    translate: '0 -100%',
  },
})

export const slideToBottomFull = stylex.keyframes({
  from: {
    translate: '0 0',
  },
  to: {
    translate: '0 100%',
  },
})

export const slideFromTop = stylex.keyframes({
  '0%': {
    translate: '0 -0.5rem',
  },
  to: {
    translate: '0',
  },
})

export const slideFromBottom = stylex.keyframes({
  '0%': {
    translate: '0 0.5rem',
  },
  to: {
    translate: '0',
  },
})

export const slideFromLeft = stylex.keyframes({
  '0%': {
    translate: '-0.5rem 0',
  },
  to: {
    translate: '0',
  },
})

export const slideFromRight = stylex.keyframes({
  '0%': {
    translate: '0.5rem 0',
  },
  to: {
    translate: '0',
  },
})

export const slideToTop = stylex.keyframes({
  '0%': {
    translate: '0',
  },
  to: {
    translate: '0 -0.5rem',
  },
})

export const slideToBottom = stylex.keyframes({
  '0%': {
    translate: '0',
  },
  to: {
    translate: '0 0.5rem',
  },
})

export const slideToLeft = stylex.keyframes({
  '0%': {
    translate: '0',
  },
  to: {
    translate: '-0.5rem 0',
  },
})

export const slideToRight = stylex.keyframes({
  '0%': {
    translate: '0',
  },
  to: {
    translate: '0.5rem 0',
  },
})

export const scaleIn = stylex.keyframes({
  from: {
    scale: '0.95',
  },
  to: {
    scale: '1',
  },
})

export const scaleOut = stylex.keyframes({
  from: {
    scale: '1',
  },
  to: {
    scale: '0.95',
  },
})

export const marqueeX = stylex.keyframes({
  from: {
    transform: 'translateX(0%)',
  },
  to: {
    transform: 'translateX(var(--marquee-translate))',
  },
})

export const marqueeY = stylex.keyframes({
  from: {
    transform: 'translateY(0%)',
  },
  to: {
    transform: 'translateY(var(--marquee-translate))',
  },
})
