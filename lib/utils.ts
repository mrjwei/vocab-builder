export const capitalize = (text: string) => {
  return text.charAt(0).toUpperCase() + text.substring(1)
}

export const barWidth = (
  ratio: number,
  scalar: number = 1000,
  min: number = 16,
  max: number = 160
) => {
  if (ratio * scalar < min) {
    return min
  } else if (ratio * scalar > max) {
    return max
  }
  return ratio * scalar
}
