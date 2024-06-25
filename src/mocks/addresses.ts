import { SelectPropertyAddress } from "@/types/listings";

export function generateMockAddresses(
  listingIds: string[]
): SelectPropertyAddress[] {
  const addresses: SelectPropertyAddress[] = [];
  for (const listingId of listingIds) {
    const address: SelectPropertyAddress = {
      id: Math.floor(Math.random() * 100000),
      listingId: listingId,
      addressLine1: "Address Line 1 " + Math.random() * 1000,
      addressLine2: "Address Line 2 " + Math.random() * 1000,
      city: "City " + Math.random() * 10,
      state: randomState(),
      postalCode: Math.floor(Math.random() * 100000).toString(),
    };
    addresses.push(address);
  }
  return addresses;
}

function randomState(): string {
  const states = [
    "Johor",
    "Kedah",
    "Kelantan",
    "Kuala Lumpur",
    "Labuan",
    "Melaka",
    "Negeri Sembilan",
    "Pahang",
    "Perak",
    "Perlis",
    "Pulau Pinang",
    "Putrajaya",
    "Sabah",
    "Sarawak",
    "Selangor",
    "Terengganu",
  ];
  return states[Math.floor(Math.random() * states.length)];
}
