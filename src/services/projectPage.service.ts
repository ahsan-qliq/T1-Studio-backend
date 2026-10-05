import ProjectPage from "../models/projectPage.model.ts";
import { localizeDocument } from "../utils/localizeDocument.ts";
import { resolveImageUrls } from "../utils/resolveImageUrls.ts";

export const createProjectPageService = async (data: Record<string, unknown>) => {
  const existing = await ProjectPage.findOne({ slug: data.slug as string });
  if (existing) {
    const error = new Error("ProjectPage with this slug already exists") as Error & { statusCode: number };
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

export const getProjectPageService = async (
  slug: string,
  lang: "en" | "ar" = "en",
) => {
  const page = await ProjectPage.findOne({ slug });

  if (!page) {
    const error = new Error("Project page not found") as Error & {
      statusCode: number;
    };

    error.statusCode = 404;
    throw error;
  }

  const [categories, locations, completionYears] = await Promise.all([
    ProjectPage.distinct(
      `sections.projects.projects.category.${lang}`,
      { slug },
    ),

    ProjectPage.distinct(
      `sections.projects.projects.location.${lang}`,
      { slug },
    ),

    ProjectPage.distinct(
      `sections.projects.projects.completionYear.${lang}`,
      { slug },
    ),
  ]);

  console.log("categories", categories);
  console.log("locations", locations);
  console.log("completionYears", completionYears);

  const raw = JSON.parse(JSON.stringify(page.toObject()));
  const data = localizeDocument(raw, lang);
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

export const updateProjectPageService = async (slug: string, data: Record<string, unknown>) => {
  const page = await ProjectPage.findOneAndUpdate({ slug }, { $set: data }, { new: true, runValidators: true });
  if (!page) {
    const error = new Error("Project page not found") as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  return page;
};

export const deleteProjectPageService = async (slug: string) => {
  const page = await ProjectPage.findOneAndDelete({ slug });
  if (!page) {
    const error = new Error("Project page not found") as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  return page;
};
