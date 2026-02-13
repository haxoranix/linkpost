import { CarouselTemplate } from '../types';

interface TemplatePickerProps {
  templates: CarouselTemplate[];
  selectedTemplateId: string;
  onSelect: (templateId: string) => void;
}

export const TemplatePicker = ({ templates, selectedTemplateId, onSelect }: TemplatePickerProps) => (
  <section className="panel">
    <h2>1) Choose a template</h2>
    <div className="template-grid">
      {templates.map((template) => (
        <button
          type="button"
          key={template.id}
          className={`template-card ${selectedTemplateId === template.id ? 'active' : ''}`}
          onClick={() => onSelect(template.id)}
        >
          <h3>{template.name}</h3>
          <p>{template.description}</p>
        </button>
      ))}
    </div>
  </section>
);
