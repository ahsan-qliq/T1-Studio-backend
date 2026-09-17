const CLOUDFRONT_URL = process.env.CLOUDFRONT_URL!;

export const resolveImageUrls = (data: any): any => {
  if (!data) return data;

  if (Array.isArray(data)) {
    return data.map((item) => resolveImageUrls(item));
  }

  if (typeof data === "object") {
    // Detect your imageSchema
    if (
      Object.prototype.hasOwnProperty.call(data, "key") &&
      Object.prototype.hasOwnProperty.call(data, "url")
    ) {
      data.url = data.key
        ? `${CLOUDFRONT_URL}/${data.key}`
        : "";

      return data;
    }

    Object.keys(data).forEach((property) => {
      data[property] = resolveImageUrls(data[property]);
    });
  }

  return data;
};