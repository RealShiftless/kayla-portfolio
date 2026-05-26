import type { CollectionEntry } from "astro:content";

type Project = CollectionEntry<"projects">;

function getStartTime(project: Project) {
  return project.data.startDate ? Date.parse(project.data.startDate) : 0;
}

function compareTitle(a: Project, b: Project) {
  return a.data.title.localeCompare(b.data.title);
}

export function sortTopLevelProjects(projects: Project[]) {
  return [...projects].sort((a, b) => {
    const aRank = a.data.showcaseRank;
    const bRank = b.data.showcaseRank;

    if (aRank !== undefined || bRank !== undefined) {
      if (aRank === undefined) return 1;
      if (bRank === undefined) return -1;
      return aRank - bRank || compareTitle(a, b);
    }

    const aTime = getStartTime(a);
    const bTime = getStartTime(b);

    if (aTime !== bTime) {
      if (aTime === 0) return 1;
      if (bTime === 0) return -1;
      return bTime - aTime;
    }

    return a.data.order - b.data.order || compareTitle(a, b);
  });
}

export function sortChildProjects(projects: Project[]) {
  return [...projects].sort(
    (a, b) => a.data.order - b.data.order || compareTitle(a, b)
  );
}

export function formatProjectStartDate(startDate?: string) {
  if (!startDate) return "";

  const date = new Date(`${startDate}T00:00:00`);
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(date);
}

export function formatProjectStartShort(startDate?: string) {
  if (!startDate) return "";

  const date = new Date(`${startDate}T00:00:00`);
  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric"
  }).format(date);
}
