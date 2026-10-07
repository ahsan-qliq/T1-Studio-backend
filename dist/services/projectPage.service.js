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
