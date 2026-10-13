import ProjectPage from "../models/projectPage.model.js";
import { localizeDocument } from "../utils/localizeDocument.js";
import { resolveImageUrls } from "../utils/resolveImageUrls.js";
export const createProjectPageService = async (data) => {
    const existing = await ProjectPage.findOne({ slug: data.slug });
    if (existing) {
        const error = new Error("ProjectPage with this slug already exists");
        error.statusCode = 409;
        throw error;
    }
    return ProjectPage.create(data);
};
// export const getProjectPageService = async (slug: string, lang?: "en" | "ar") => {
//   const page = await ProjectPage.findOne({ slug });
//   if (!page) {
//     const error = new Error("Project page not found") as Error & { statusCode: number };
//     error.statusCode = 404;
//     throw error;
//   }
//   const raw = JSON.parse(JSON.stringify(page.toObject()));
//   const data = lang ? localizeDocument(raw, lang) : raw;
//   return resolveImageUrls(data);
// };
export const getProjectPageService = async (slug, lang) => {
    const page = await ProjectPage.findOne({ slug });
    if (!page) {
        const error = new Error("Project page not found");
        error.statusCode = 404;
        throw error;
    }
    const filterLang = lang ?? "en";
    const [categories, locations, completionYears] = await Promise.all([
        ProjectPage.distinct(`sections.projects.projects.category.${filterLang}`, { slug }),
        ProjectPage.distinct(`sections.projects.projects.location.${filterLang}`, { slug }),
        ProjectPage.distinct(`sections.projects.projects.completionYear.${filterLang}`, { slug }),
    ]);
    const raw = JSON.parse(JSON.stringify(page.toObject()));
    const data = lang ? localizeDocument(raw, lang) : raw;
    const resolvedData = resolveImageUrls(data);
    return {
        ...resolvedData,
        filters: {
            categories: categories
                .filter(Boolean)
                .sort(),
            locations: locations
                .filter(Boolean)
                .sort(),
            completionYears: completionYears
                .filter(Boolean)
                .sort((a, b) => Number(b) - Number(a)),
        },
    };
};
export const updateProjectPageService = async (slug, data) => {
    const page = await ProjectPage.findOneAndUpdate({ slug }, { $set: data }, { new: true, runValidators: true });
    if (!page) {
        const error = new Error("Project page not found");
        error.statusCode = 404;
        throw error;
    }
    return page;
};
export const deleteProjectPageService = async (slug) => {
    const page = await ProjectPage.findOneAndDelete({ slug });
    if (!page) {
        const error = new Error("Project page not found");
        error.statusCode = 404;
        throw error;
    }
    return page;
};
/* ------------------------------------------------------------------ */
/*  STATS SECTIONS                                                      */
/* ------------------------------------------------------------------ */
const notFound = (msg) => {
    const error = new Error(msg);
    error.statusCode = 404;
    throw error;
};
const conflict = (msg) => {
    const error = new Error(msg);
    error.statusCode = 409;
    throw error;
};
export const getStatsSectionService = async (slug, category, lang) => {
    const page = await ProjectPage.findOne({ slug });
    if (!page)
        notFound("Project page not found");
    const section = page.sections?.stats?.find((s) => s.category === category);
    if (!section)
        notFound(`Stats section with category '${category}' not found`);
    const raw = JSON.parse(JSON.stringify(section));
    return lang ? localizeDocument(raw, lang) : raw;
};
export const addStatsSectionService = async (slug, data) => {
    const page = await ProjectPage.findOne({ slug });
    if (!page)
        notFound("Project page not found");
    const exists = page.sections?.stats?.some((s) => s.category === data.category);
    if (exists)
        conflict(`Stats section with category '${data.category}' already exists`);
    const updated = await ProjectPage.findOneAndUpdate({ slug }, { $push: { "sections.stats": data } }, { new: true, runValidators: true });
    return updated.sections?.stats?.find((s) => s.category === data.category);
};
export const updateStatsSectionService = async (slug, category, data) => {
    const page = await ProjectPage.findOne({ slug });
    if (!page)
        notFound("Project page not found");
    const exists = page.sections?.stats?.some((s) => s.category === category);
    if (!exists)
        notFound(`Stats section with category '${category}' not found`);
    const setFields = {};
    for (const [key, value] of Object.entries(data)) {
        setFields[`sections.stats.$.${key}`] = value;
    }
    const updated = await ProjectPage.findOneAndUpdate({ slug, "sections.stats.category": category }, { $set: setFields }, { new: true, runValidators: true });
    return updated.sections?.stats?.find((s) => s.category === category);
};
export const deleteStatsSectionService = async (slug, category) => {
    const page = await ProjectPage.findOne({ slug });
    if (!page)
        notFound("Project page not found");
    const exists = page.sections?.stats?.some((s) => s.category === category);
    if (!exists)
        notFound(`Stats section with category '${category}' not found`);
    await ProjectPage.findOneAndUpdate({ slug }, { $pull: { "sections.stats": { category } } });
};
/* ------------------------------------------------------------------ */
/*  LOGOS SECTIONS                                                      */
/* ------------------------------------------------------------------ */
export const getLogosSectionService = async (slug, category, lang) => {
    const page = await ProjectPage.findOne({ slug });
    if (!page)
        notFound("Project page not found");
    const section = page.sections?.logos?.find((s) => s.category === category);
    if (!section)
        notFound(`Logos section with category '${category}' not found`);
    const raw = JSON.parse(JSON.stringify(section));
    return lang ? localizeDocument(raw, lang) : raw;
};
export const addLogosSectionService = async (slug, data) => {
    const page = await ProjectPage.findOne({ slug });
    if (!page)
        notFound("Project page not found");
    const exists = page.sections?.logos?.some((s) => s.category === data.category);
    if (exists)
        conflict(`Logos section with category '${data.category}' already exists`);
    const updated = await ProjectPage.findOneAndUpdate({ slug }, { $push: { "sections.logos": data } }, { new: true, runValidators: true });
    return updated.sections?.logos?.find((s) => s.category === data.category);
};
export const updateLogosSectionService = async (slug, category, data) => {
    const page = await ProjectPage.findOne({ slug });
    if (!page)
        notFound("Project page not found");
    const exists = page.sections?.logos?.some((s) => s.category === category);
    if (!exists)
        notFound(`Logos section with category '${category}' not found`);
    const setFields = {};
    for (const [key, value] of Object.entries(data)) {
        setFields[`sections.logos.$.${key}`] = value;
    }
    const updated = await ProjectPage.findOneAndUpdate({ slug, "sections.logos.category": category }, { $set: setFields }, { new: true, runValidators: true });
    return updated.sections?.logos?.find((s) => s.category === category);
};
export const deleteLogosSectionService = async (slug, category) => {
    const page = await ProjectPage.findOne({ slug });
    if (!page)
        notFound("Project page not found");
    const exists = page.sections?.logos?.some((s) => s.category === category);
    if (!exists)
        notFound(`Logos section with category '${category}' not found`);
    await ProjectPage.findOneAndUpdate({ slug }, { $pull: { "sections.logos": { category } } });
};
