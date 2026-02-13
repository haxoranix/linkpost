import { forwardRef } from 'react';
import { Branding, Slide } from '../types';

interface SlidePreviewProps {
  slide: Slide;
  branding: Branding;
  pageIndex: number;
}

export const SlidePreview = forwardRef<HTMLDivElement, SlidePreviewProps>(({ slide, branding, pageIndex }, ref) => (
  <div className="slide-page" ref={ref} style={{ backgroundColor: branding.backgroundColor, fontFamily: branding.fontFamily }}>
    <div className="slide-index">{pageIndex + 1}</div>
    {slide.blocks.map((block) => (
      <div
        key={block.id}
        className={`preview-block ${block.type}`}
        style={{
          left: `${block.x}%`,
          top: `${block.y}%`,
          width: `${block.width}%`,
          height: `${block.height}%`,
          color: block.color ?? branding.primaryColor,
          fontSize: block.fontSize ? `${block.fontSize}px` : '16px',
          borderColor: branding.secondaryColor
        }}
      >
        {block.type === 'text' ? <p>{block.content}</p> : <img src={block.content} alt="carousel block" />}
      </div>
    ))}
    <footer style={{ color: branding.secondaryColor }}>{branding.name}</footer>
  </div>
));

SlidePreview.displayName = 'SlidePreview';
