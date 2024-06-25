import { SelectIndustrial } from "@/types/listings";

export function generateMockIndustrials(
  listingIds: string[]
): SelectIndustrial[] {
  const industrials: SelectIndustrial[] = [];
  for (const listingId of listingIds) {
    const industrial: SelectIndustrial = {
      id: Math.floor(Math.random() * 100000),
      listingId: listingId,
      propertySubType: randomValue(["warehouse", "factory", "land"]) as any,
      floorLoading: (Math.random() * 100).toFixed(2),
      eavesHeight: (Math.random() * 100).toFixed(2),
      powerSupply: (Math.random() * 1000).toFixed(2),
      isGasSupply: Math.random() > 0.5,
      usage: randomValue([
        "manufacturing",
        "storage",
        "logistics",
        "others",
      ]) as any,
    };
    industrials.push(industrial);
  }
  return industrials;
}

function randomValue(values: string[]): string {
  return values[Math.floor(Math.random() * values.length)];
}
