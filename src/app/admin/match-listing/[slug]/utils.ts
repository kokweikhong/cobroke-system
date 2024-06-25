export function renderValueByPercentage(
  value: string,
  percentage: string,
  unit: string
): string {
  const valueNumber = parseFloat(value);
  const percentageNumber = parseFloat(percentage);
  if (percentageNumber === 0) {
    return `${valueNumber.toFixed(2)} ${unit}`;
  }
  const min = valueNumber - valueNumber * (percentageNumber / 100);
  const max = valueNumber + valueNumber * (percentageNumber / 100);
  return `${min.toFixed(2)} ${unit} - ${max.toFixed(2)} ${unit}`;
}
