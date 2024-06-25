export function validateValue(value: string): boolean {
  return value.length > 0;
}

export function validateNumber(value: string): boolean {
  return !isNaN(Number(value)) && value.length > 0;
}
