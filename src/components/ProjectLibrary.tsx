import { CarouselProject } from '../types';

interface ProjectLibraryProps {
  projects: CarouselProject[];
  onLoad: (project: CarouselProject) => void;
  onDelete: (projectId: string) => void;
}

export const ProjectLibrary = ({ projects, onLoad, onDelete }: ProjectLibraryProps) => (
  <section className="panel">
    <h2>Saved projects</h2>
    {projects.length === 0 ? <p>No saved drafts yet.</p> : null}
    <div className="project-list">
      {projects.map((project) => (
        <article key={project.id} className="project-item">
          <div>
            <strong>{project.name}</strong>
            <p>Updated {new Date(project.updatedAt).toLocaleString()}</p>
          </div>
          <div className="inline-actions">
            <button type="button" onClick={() => onLoad(project)}>
              Load
            </button>
            <button type="button" onClick={() => onDelete(project.id)}>
              Delete
            </button>
          </div>
        </article>
      ))}
    </div>
  </section>
);
