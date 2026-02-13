import { Branding } from '../types';

interface BrandingEditorProps {
  branding: Branding;
  onChange: (branding: Branding) => void;
}

const fonts = ['Inter', 'Poppins', 'Montserrat', 'Merriweather', 'Lato'];

export const BrandingEditor = ({ branding, onChange }: BrandingEditorProps) => {
  const update = <K extends keyof Branding>(key: K, value: Branding[K]) => {
    onChange({ ...branding, [key]: value });
  };

  return (
    <section className="panel">
      <h2>2) Branding setup</h2>
      <div className="form-grid">
        <label>
          Brand name
          <input value={branding.name} onChange={(e) => update('name', e.target.value)} />
        </label>
        <label>
          Font family
          <select value={branding.fontFamily} onChange={(e) => update('fontFamily', e.target.value)}>
            {fonts.map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </select>
        </label>
        <label>
          Primary color
          <input type="color" value={branding.primaryColor} onChange={(e) => update('primaryColor', e.target.value)} />
        </label>
        <label>
          Secondary color
          <input type="color" value={branding.secondaryColor} onChange={(e) => update('secondaryColor', e.target.value)} />
        </label>
        <label>
          Background color
          <input
            type="color"
            value={branding.backgroundColor}
            onChange={(e) => update('backgroundColor', e.target.value)}
          />
        </label>
      </div>
    </section>
  );
};
