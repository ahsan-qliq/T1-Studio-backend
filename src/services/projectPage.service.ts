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
  lang?: "en" | "ar",
) => {
  const page = await ProjectPage.findOne({ slug });

  if (!page) {
    const error = new Error("Project page not found") as Error & {
      statusCode: number;
    };

    error.statusCode = 404;
    throw error;
  }

  const filterLang = lang ?? "en";

  const [categories, locations, completionYears] = await Promise.all([
    ProjectPage.distinct(
      `sections.projects.projects.category.${filterLang}`,
      { slug },
    ),

    ProjectPage.distinct(
      `sections.projects.projects.location.${filterLang}`,
      { slug },
    ),

    ProjectPage.distinct(
      `sections.projects.projects.completionYear.${filterLang}`,
      { slug },
    ),
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

/* ------------------------------------------------------------------ */
/*  STATS SECTIONS                                                      */
/* ------------------------------------------------------------------ */

const notFound = (msg: string) => {
  const error = new Error(msg) as Error & { statusCode: number };
  error.statusCode = 404;
  throw error;
};

const conflict = (msg: string) => {
  const error = new Error(msg) as Error & { statusCode: number };
  error.statusCode = 409;
  throw error;
};

export const getStatsSectionService = async (
  slug: string,
  category: string,
  lang?: "en" | "ar",
) => {
  const page = await ProjectPage.findOne({ slug });
  if (!page) notFound("Project page not found");

  const section = page!.sections?.stats?.find((s: any) => s.category === category);
  if (!section) notFound(`Stats section with category '${category}' not found`);

  const raw = JSON.parse(JSON.stringify(section));
  return lang ? localizeDocument(raw, lang) : raw;
};

export const addStatsSectionService = async (
  slug: string,
  data: Record<string, unknown>,
) => {
  const page = await ProjectPage.findOne({ slug });
  if (!page) notFound("Project page not found");

  const exists = page!.sections?.stats?.some((s: any) => s.category === data.category);
  if (exists) conflict(`Stats section with category '${data.category}' already exists`);

  const updated = await ProjectPage.findOneAndUpdate(
    { slug },
    { $push: { "sections.stats": data } },
    { new: true, runValidators: true },
  );

  return updated!.sections?.stats?.find((s: any) => s.category === data.category);
};

export const updateStatsSectionService = async (
  slug: string,
  category: string,
  data: Record<string, unknown>,
) => {
  const page = await ProjectPage.findOne({ slug });
  if (!page) notFound("Project page not found");

  const exists = page!.sections?.stats?.some((s: any) => s.category === category);
  if (!exists) notFound(`Stats section with category '${category}' not found`);

  const setFields: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data)) {
    setFields[`sections.stats.$.${key}`] = value;
  }

  const updated = await ProjectPage.findOneAndUpdate(
    { slug, "sections.stats.category": category },
    { $set: setFields },
    { new: true, runValidators: true },
  );

  return updated!.sections?.stats?.find((s: any) => s.category === category);
};

export const deleteStatsSectionService = async (slug: string, category: string) => {
  const page = await ProjectPage.findOne({ slug });
  if (!page) notFound("Project page not found");

  const exists = page!.sections?.stats?.some((s: any) => s.category === category);
  if (!exists) notFound(`Stats section with category '${category}' not found`);

  await ProjectPage.findOneAndUpdate(
    { slug },
    { $pull: { "sections.stats": { category } } },
  );
};

/* ------------------------------------------------------------------ */
/*  LOGOS SECTIONS                                                      */
/* ------------------------------------------------------------------ */

export const getLogosSectionService = async (
  slug: string,
  category: string,
  lang?: "en" | "ar",
) => {
  const page = await ProjectPage.findOne({ slug });
  if (!page) notFound("Project page not found");

  const section = page!.sections?.logos?.find((s: any) => s.category === category);
  if (!section) notFound(`Logos section with category '${category}' not found`);

  const raw = JSON.parse(JSON.stringify(section));
  return lang ? localizeDocument(raw, lang) : raw;
};

export const addLogosSectionService = async (
  slug: string,
  data: Record<string, unknown>,
) => {
  const page = await ProjectPage.findOne({ slug });
  if (!page) notFound("Project page not found");

  const exists = page!.sections?.logos?.some((s: any) => s.category === data.category);
  if (exists) conflict(`Logos section with category '${data.category}' already exists`);

  const updated = await ProjectPage.findOneAndUpdate(
    { slug },
    { $push: { "sections.logos": data } },
    { new: true, runValidators: true },
  );

  return updated!.sections?.logos?.find((s: any) => s.category === data.category);
};

export const updateLogosSectionService = async (
  slug: string,
  category: string,
  data: Record<string, unknown>,
) => {
  const page = await ProjectPage.findOne({ slug });
  if (!page) notFound("Project page not found");

  const exists = page!.sections?.logos?.some((s: any) => s.category === category);
  if (!exists) notFound(`Logos section with category '${category}' not found`);

  const setFields: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data)) {
    setFields[`sections.logos.$.${key}`] = value;
  }

  const updated = await ProjectPage.findOneAndUpdate(
    { slug, "sections.logos.category": category },
    { $set: setFields },
    { new: true, runValidators: true },
  );

  return updated!.sections?.logos?.find((s: any) => s.category === category);
};

export const deleteLogosSectionService = async (slug: string, category: string) => {
  const page = await ProjectPage.findOne({ slug });
  if (!page) notFound("Project page not found");

  const exists = page!.sections?.logos?.some((s: any) => s.category === category);
  if (!exists) notFound(`Logos section with category '${category}' not found`);

  await ProjectPage.findOneAndUpdate(
    { slug },
    { $pull: { "sections.logos": { category } } },
  );
};
