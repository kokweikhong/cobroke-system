import { SelectLand } from "@/types/listings";

export function generateMockLands(listingIds: string[]): SelectLand[] {
  const lands: SelectLand[] = [];
  for (const listingId of listingIds) {
    const land: SelectLand = {
      id: Math.floor(Math.random() * 100000),
      listingId: listingId,
      propertySubType: randomValue([
        "agricultural",
        "commercial",
        "industrial",
        "residential",
      ]) as any,
      status: randomValue(["for sale", "for rent"]) as any,
      reserve: randomValue(["bumi", "non-bumi"]) as any,
    };
    lands.push(land);
  }
  return lands;
}

function randomValue(values: string[]): string {
  return values[Math.floor(Math.random() * values.length)];
}
