export function getOppositeListingType(listingType: string) {
  switch (listingType) {
    case "wts":
      return "wtb";
    case "wtb":
      return "wts";
    case "wtl":
      return "wtr";
    case "wtr":
      return "wts";
    default:
      return "";
  }
}

export function getReadableListingType(listingType: string) {
  switch (listingType) {
    case "wts":
      return "Want To Sell";
    case "wtb":
      return "Want To Buy";
    case "wtl":
      return "Want To Lease";
    case "wtr":
      return "Want To Rent";
    default:
      return "";
  }
}
