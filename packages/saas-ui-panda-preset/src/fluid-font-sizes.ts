// const fluidFontSizes = {
//   'min-max': fluid({
//     property: 'fluid-text-size',
//     from: breakpointValues.sm,
//     to: breakpointValues['2xl'],
//     divider: 1,
//   }),
// }

// 'fluid-text-size': {
//   'min-max': fluid({ property: 'fluid-text-size', from: BP_SM, to: BP_2XL, divider: 1 }),
//   'sm-md': fluid({ property: 'fluid-text-size', from: BP_SM, to: BP_MD, divider: 1 }),
//   'sm-lg': fluid({ property: 'fluid-text-size', from: BP_SM, to: BP_LG, divider: 1 }),
//   'sm-xl': fluid({ property: 'fluid-text-size', from: BP_SM, to: BP_XL, divider: 1 }),
//   'md-lg': fluid({ property: 'fluid-text-size', from: BP_MD, to: BP_LG, divider: 1 }),
//   'md-xl': fluid({ property: 'fluid-text-size', from: BP_MD, to: BP_XL, divider: 1 }),
//   'md-2xl': fluid({ property: 'fluid-text-size', from: BP_MD, to: BP_2XL, divider: 1 }),
//   'lg-xl': fluid({ property: 'fluid-text-size', from: BP_LG, to: BP_XL, divider: 1 }),
//   'lg-2xl': fluid({ property: 'fluid-text-size', from: BP_LG, to: BP_2XL, divider: 1 }),
// },

// {
//   utilities: {
//     fluidFontSize: {
//       shorthand: ['fluidFontSize'],
//       transform(value, args) {
//         console.log(value, args)
//         const val = 'min-max(sm, lg)'

//         const match = val.match(/(\w+-\w+)\((\w+),\s*(\w+)\)/)

//         if (!match) {
//           return {}
//         }

//         const [, breakpoints, min, max] = match
//         console.log(match)
//         const minSize = args.token.raw(`fontSizes.${min}`)?.value
//         const maxSize = args.token.raw(`fontSizes.${max}`)?.value
//         console.log(minSize, maxSize)
//         return {
//           fontSize: `var(--fluid-text-size-${breakpoints})`,
//           '--fluid-text-size-min': minSize,
//           '--fluid-text-size-max': maxSize,
//         }
//       },
//     },
//     fluidFontSizeMin: {
//       shorthand: ['fluidFontSizeMin'],
//       transform(value, args) {
//         return {
//           '--fluid-text-size-min': value,
//         }
//       },
//     },
//     fluidFontSizeMax: {
//       shorthand: ['fluidFontSizeMax'],
//       transform(value, args) {
//         return {
//           '--fluid-text-size-max': value,
//         }
//       },
//     },
//   },
// },
