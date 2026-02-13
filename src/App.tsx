import { useMemo, useRef, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { BrandingEditor } from './components/BrandingEditor';
import { ProjectLibrary } from './components/ProjectLibrary';
import { SlideEditor } from './components/SlideEditor';
import { SlidePreview } from './components/SlidePreview';
import { TemplatePicker } from './components/TemplatePicker';
import { templateCatalog } from './data/templates';
import { exportSlidesToPdf } from './lib/pdf';
import { deleteProject, loadProjects, upsertProject } from './lib/storage';
import { CarouselProject, Slide } from './types';

const createProjectFromTemplate = (templateId: string): CarouselProject => {
  const template = templateCatalog.find((item) => item.id === templateId) ?? templateCatalog[0];
  return {
    id: crypto.randomUUID(),
    name: `${template.name} Draft`,
    templateId: template.id,
    branding: structuredClone(template.branding),
    slides: structuredClone(template.slides),
    updatedAt: new Date().toISOString()
  };
};

function App() {
  const [project, setProject] = useState<CarouselProject>(() => createProjectFromTemplate(templateCatalog[0].id));
  const [savedProjects, setSavedProjects] = useState<CarouselProject[]>(() => loadProjects());
  const [selectedSlideId, setSelectedSlideId] = useState<string>(project.slides[0].id);
  const previewRefs = useRef<(HTMLDivElement | null)[]>([]);

  const selectedTemplateId = project.templateId;

  const activeSlideList: Slide[] = useMemo(() => project.slides, [project.slides]);

  const selectTemplate = (templateId: string) => {
    const nextProject = createProjectFromTemplate(templateId);
    setProject(nextProject);
    setSelectedSlideId(nextProject.slides[0].id);
  };

  const saveCurrentProject = () => {
    const next = { ...project, updatedAt: new Date().toISOString() };
    upsertProject(next);
    setProject(next);
    setSavedProjects(loadProjects());
  };

  const handleExport = async () => {
    const slides = previewRefs.current.filter(Boolean) as HTMLDivElement[];
    await exportSlidesToPdf(slides, project.name);
  };

  return (
    <div className="app-shell">
      <header>
        <h1>LinkedIn Carousel Maker</h1>
        <nav>
          <Link to="/">Editor</Link>
          <Link to="/preview">Preview</Link>
        </nav>
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <main className="layout editor-layout">
              <section>
                <label>
                  Project name
                  <input
                    value={project.name}
                    onChange={(e) => setProject({ ...project, name: e.target.value })}
                    placeholder="My LinkedIn Carousel"
                  />
                </label>

                <TemplatePicker
                  templates={templateCatalog}
                  selectedTemplateId={selectedTemplateId}
                  onSelect={(templateId) => {
                    const template = templateCatalog.find((item) => item.id === templateId) ?? templateCatalog[0];
                    const slides = structuredClone(template.slides);
                    setProject((prev) => ({
                      ...prev,
                      templateId,
                      branding: structuredClone(template.branding),
                      slides
                    }));
                    setSelectedSlideId(slides[0]?.id ?? '');
                  }}
                />

                <div className="inline-actions">
                  <button type="button" onClick={() => selectTemplate(selectedTemplateId)}>
                    Reset to template defaults
                  </button>
                  <button type="button" onClick={saveCurrentProject}>
                    Save to localStorage
                  </button>
                </div>

                <BrandingEditor
                  branding={project.branding}
                  onChange={(branding) => setProject({ ...project, branding })}
                />

                <SlideEditor
                  slides={project.slides}
                  selectedSlideId={selectedSlideId}
                  onSelectSlide={setSelectedSlideId}
                  onChangeSlides={(slides) => setProject({ ...project, slides })}
                />
              </section>

              <aside>
                <ProjectLibrary
                  projects={savedProjects}
                  onLoad={(savedProject) => {
                    setProject(savedProject);
                    setSelectedSlideId(savedProject.slides[0]?.id ?? '');
                  }}
                  onDelete={(projectId) => {
                    deleteProject(projectId);
                    setSavedProjects(loadProjects());
                  }}
                />
              </aside>
            </main>
          }
        />

        <Route
          path="/preview"
          element={
            <main className="layout preview-layout">
              <section className="panel">
                <h2>4) Preview & export</h2>
                <p>Each slide is exported as one A4 PDF page with your current branding and layout.</p>
                <button type="button" onClick={handleExport}>
                  Export PDF
                </button>
              </section>

              <section className="preview-stack">
                {activeSlideList.map((slide, index) => (
                  <SlidePreview
                    key={slide.id}
                    slide={slide}
                    branding={project.branding}
                    pageIndex={index}
                    ref={(element) => {
                      previewRefs.current[index] = element;
                    }}
                  />
                ))}
              </section>
            </main>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
