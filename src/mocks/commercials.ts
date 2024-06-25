import { SelectCommercial } from "@/types/listings";

export function generateMockCommercials(
  listingIds: string[]
): SelectCommercial[] {
  const commercials: SelectCommercial[] = [];
  for (const listingId of listingIds) {
    const commercial: SelectCommercial = {
      id: Math.floor(Math.random() * 100000),
      listingId: listingId,
      propertySubType: randomValue([
        "office",
        "retail",
        "industrial",
        "land",
      ]) as any,
      furnishing: randomValue(["fully", "partially", "unfurnished"]) as any,
    };
    commercials.push(commercial);
  }
  return commercials;
}

function randomValue(values: string[]): string {
  return values[Math.floor(Math.random() * values.length)];
}
