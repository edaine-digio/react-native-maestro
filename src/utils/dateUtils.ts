import dayjs from 'dayjs'

export const formatDate = (input: string) => {
  return dayjs(input).format('DD MMM YYYY')
}
