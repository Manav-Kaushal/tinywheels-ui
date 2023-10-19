export function formatCurrency(number: number) {
  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });

  return formatter.format(number);
}

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

const isObject = (value: any): boolean => {
  return value !== null && typeof value === "object" && !Array.isArray(value);
};

const buildFormData = (formData: FormData, data: any, keyPrefix = ""): void => {
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const currentKey = keyPrefix ? `${keyPrefix}[${key}]` : key;
      const value = data[key];

      if (Array.isArray(value)) {
        value.forEach((item: any, index: number) => {
          if (item instanceof File) {
            formData.append(currentKey, item);
          } else {
            buildFormData(formData, item, `${currentKey}[${index}]`);
          }
        });
      } else if (isObject(value)) {
        buildFormData(formData, value, currentKey);
      } else {
        formData.append(currentKey, value);
      }
    }
  }
};

export const convertObjectToFormData = (data: any): FormData => {
  const formData = new FormData();
  buildFormData(formData, data);
  return formData;
};

export const getPdpUrl = (slug: string) => {
  return "/product-view/" + slug;
};
