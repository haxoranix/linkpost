import { Slide, SlideBlock } from '../types';

interface SlideEditorProps {
  slides: Slide[];
  selectedSlideId: string;
  onSelectSlide: (slideId: string) => void;
  onChangeSlides: (slides: Slide[]) => void;
}

const createTextBlock = (): SlideBlock => ({
  id: crypto.randomUUID(),
  type: 'text',
  content: 'New text block',
  x: 10,
  y: 15,
  width: 70,
  height: 20,
  color: '#111827',
  fontSize: 32
});

const createImageBlock = (): SlideBlock => ({
  id: crypto.randomUUID(),
  type: 'image',
  content: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
  x: 10,
  y: 45,
  width: 80,
  height: 40
});

export const SlideEditor = ({ slides, selectedSlideId, onSelectSlide, onChangeSlides }: SlideEditorProps) => {
  const selectedSlide = slides.find((slide) => slide.id === selectedSlideId) ?? slides[0];

  const updateSelectedSlide = (nextSlide: Slide) => {
    onChangeSlides(slides.map((slide) => (slide.id === nextSlide.id ? nextSlide : slide)));
  };

  return (
    <section className="panel">
      <h2>3) Build slides</h2>
      <div className="slide-toolbar">
        {slides.map((slide, index) => (
          <button
            type="button"
            key={slide.id}
            className={slide.id === selectedSlide.id ? 'active' : ''}
            onClick={() => onSelectSlide(slide.id)}
          >
            {index + 1}
          </button>
        ))}
        <button
          type="button"
          onClick={() => {
            const newSlide: Slide = {
              id: crypto.randomUUID(),
              title: `Slide ${slides.length + 1}`,
              blocks: [createTextBlock()]
            };
            onChangeSlides([...slides, newSlide]);
            onSelectSlide(newSlide.id);
          }}
        >
          + Add slide
        </button>
      </div>

      <label>
        Slide title
        <input
          value={selectedSlide.title}
          onChange={(e) => updateSelectedSlide({ ...selectedSlide, title: e.target.value })}
        />
      </label>

      <div className="inline-actions">
        <button
          type="button"
          onClick={() => updateSelectedSlide({ ...selectedSlide, blocks: [...selectedSlide.blocks, createTextBlock()] })}
        >
          + Text block
        </button>
        <button
          type="button"
          onClick={() => updateSelectedSlide({ ...selectedSlide, blocks: [...selectedSlide.blocks, createImageBlock()] })}
        >
          + Image block
        </button>
      </div>

      {selectedSlide.blocks.map((block) => (
        <article className="block-editor" key={block.id}>
          <div className="block-head">
            <strong>{block.type.toUpperCase()}</strong>
            <button
              type="button"
              onClick={() =>
                updateSelectedSlide({
                  ...selectedSlide,
                  blocks: selectedSlide.blocks.filter((item) => item.id !== block.id)
                })
              }
            >
              Delete
            </button>
          </div>

          <label>
            {block.type === 'text' ? 'Text content' : 'Image URL'}
            <textarea
              value={block.content}
              rows={block.type === 'text' ? 3 : 2}
              onChange={(e) =>
                updateSelectedSlide({
                  ...selectedSlide,
                  blocks: selectedSlide.blocks.map((item) =>
                    item.id === block.id ? { ...item, content: e.target.value } : item
                  )
                })
              }
            />
          </label>

          <div className="form-grid">
            <label>
              X (%)
              <input
                type="number"
                min={0}
                max={100}
                value={block.x}
                onChange={(e) =>
                  updateSelectedSlide({
                    ...selectedSlide,
                    blocks: selectedSlide.blocks.map((item) =>
                      item.id === block.id ? { ...item, x: Number(e.target.value) } : item
                    )
                  })
                }
              />
            </label>
            <label>
              Y (%)
              <input
                type="number"
                min={0}
                max={100}
                value={block.y}
                onChange={(e) =>
                  updateSelectedSlide({
                    ...selectedSlide,
                    blocks: selectedSlide.blocks.map((item) =>
                      item.id === block.id ? { ...item, y: Number(e.target.value) } : item
                    )
                  })
                }
              />
            </label>
            <label>
              Width (%)
              <input
                type="number"
                min={1}
                max={100}
                value={block.width}
                onChange={(e) =>
                  updateSelectedSlide({
                    ...selectedSlide,
                    blocks: selectedSlide.blocks.map((item) =>
                      item.id === block.id ? { ...item, width: Number(e.target.value) } : item
                    )
                  })
                }
              />
            </label>
            <label>
              Height (%)
              <input
                type="number"
                min={1}
                max={100}
                value={block.height}
                onChange={(e) =>
                  updateSelectedSlide({
                    ...selectedSlide,
                    blocks: selectedSlide.blocks.map((item) =>
                      item.id === block.id ? { ...item, height: Number(e.target.value) } : item
                    )
                  })
                }
              />
            </label>
            {block.type === 'text' && (
              <>
                <label>
                  Font size
                  <input
                    type="number"
                    min={12}
                    max={120}
                    value={block.fontSize ?? 32}
                    onChange={(e) =>
                      updateSelectedSlide({
                        ...selectedSlide,
                        blocks: selectedSlide.blocks.map((item) =>
                          item.id === block.id ? { ...item, fontSize: Number(e.target.value) } : item
                        )
                      })
                    }
                  />
                </label>
                <label>
                  Text color
                  <input
                    type="color"
                    value={block.color ?? '#111827'}
                    onChange={(e) =>
                      updateSelectedSlide({
                        ...selectedSlide,
                        blocks: selectedSlide.blocks.map((item) =>
                          item.id === block.id ? { ...item, color: e.target.value } : item
                        )
                      })
                    }
                  />
                </label>
              </>
            )}
          </div>
        </article>
      ))}
    </section>
  );
};
