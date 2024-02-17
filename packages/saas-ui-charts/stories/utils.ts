import { format, eachDayOfInterval } from 'date-fns'

export const createData = ({
  startDate,
  endDate,
  interval = 1,
  growthRate = 1.02,
  categories = ['value'],
  startValues = [],
}: {
  startDate: string
  endDate: string
  interval?: number
  growthRate?: number
  categories?: string[]
  startValues?: number[]
}) => {
  const days = eachDayOfInterval({
    start: new Date(startDate),
    end: new Date(endDate),
  })

  const values: Record<string, string | number>[] = []

  for (let i = 0; i < days.length; i += interval) {
    const data = {
      date: format(days[i], 'MMM d'),
    }

    for (const category of categories) {
      const dailyGrowth = Math.random() * 0.3 + 0.7

      const value =
        (startValues[categories.indexOf(category)] || 2000) *
        Math.pow(growthRate, i) *
        dailyGrowth

      data[category] = Math.round(value)
    }

    values.push(data)
  }

  return values
}
