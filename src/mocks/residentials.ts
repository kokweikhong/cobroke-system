import { SelectResidential } from "@/types/listings";

export function generateMockResidentials(
  listingIds: string[]
): SelectResidential[] {
  const residentials: SelectResidential[] = [];
  for (const listingId of listingIds) {
    const residential: SelectResidential = {
      id: Math.floor(Math.random() * 100000),
      listingId: listingId,
      propertySubType: randomValue([
        "apartment",
        "condominium",
        "bungalow",
        "semi-detached",
        "terrace",
        "townhouse",
        "villa",
      ]) as any,
      bedrooms: Math.floor(Math.random() * 10),
      bathrooms: Math.floor(Math.random() * 10),
      carParks: Math.floor(Math.random() * 10),
      furnishing: randomValue(["fully", "partially", "unfurnished"]) as any,
    };
    residentials.push(residential);
  }
  return residentials;
}

function randomValue(values: string[]): string {
  return values[Math.floor(Math.random() * values.length)];
}
