const isLocalizedText = (val) => typeof val === "object" &&
    val !== null &&
    "en" in val &&
    "ar" in val &&
    Object.keys(val).length === 2;
export const localizeDocument = (obj, lang) => {
    if (isLocalizedText(obj))
        return obj[lang];
    if (Array.isArray(obj))
        return obj.map((item) => localizeDocument(item, lang));
    if (typeof obj === "object" && obj !== null) {
        return Object.fromEntries(Object.entries(obj).map(([key, val]) => [key, localizeDocument(val, lang)]));
    }
    return obj;
};
