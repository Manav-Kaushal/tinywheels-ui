export const formatCurrency = (number: number) => {
  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });

  return formatter.format(number);
};

export function trimID(id: string) {
  if (typeof id !== "string") {
    throw new Error("Invalid ID format. Input must be a string.");
  }

  if (id.length < 8) {
    throw new Error(
      "Invalid ID length. Input must be at least 8 characters long."
    );
  }

  const firstPart = id.substring(0, 4);
  const lastPart = id.substring(id.length - 4);
  return `${firstPart}...${lastPart}`;
}

export function createURLFromFile(file: File) {
  if (!(file instanceof File)) {
    throw new Error("Input is not a valid File object");
  }

  return URL.createObjectURL(file);
}

export function slugifyProductName(productName: string) {
  const slug = productName
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

  return slug;
}
