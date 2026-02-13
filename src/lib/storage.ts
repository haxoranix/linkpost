import { CarouselProject } from '../types';

const KEY = 'linkedin-carousel-projects';

export const loadProjects = (): CarouselProject[] => {
  const raw = localStorage.getItem(KEY);
  if (!raw) {
    return [];
  }

  try {
    return JSON.parse(raw) as CarouselProject[];
  } catch {
    return [];
  }
};

export const saveProjects = (projects: CarouselProject[]) => {
  localStorage.setItem(KEY, JSON.stringify(projects));
};

export const upsertProject = (project: CarouselProject) => {
  const current = loadProjects();
  const existingIndex = current.findIndex((item) => item.id === project.id);
  const next = [...current];

  if (existingIndex >= 0) {
    next[existingIndex] = project;
  } else {
    next.unshift(project);
  }

  saveProjects(next);
};

export const deleteProject = (projectId: string) => {
  const filtered = loadProjects().filter((project) => project.id !== projectId);
  saveProjects(filtered);
};
