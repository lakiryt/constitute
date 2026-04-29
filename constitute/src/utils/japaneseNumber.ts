export function formatJapaneseNumeral(value: number): string {
  if (value <= 0 || value >= 1000) {
    return String(value)
  }

  const digits = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九"]
  const hundreds = Math.floor(value / 100)
  const tens = Math.floor((value % 100) / 10)
  const ones = value % 10

  let result = ""

  if (hundreds > 0) {
    if (hundreds > 1) {
      result += digits[hundreds]
    }
    result += "百"
  }

  if (tens > 0) {
    if (tens > 1) {
      result += digits[tens]
    }
    result += "十"
  }

  if (ones > 0) {
    result += digits[ones]
  }

  return result || "零"
}
