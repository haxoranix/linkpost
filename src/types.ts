export type BlockType = 'text' | 'image';

export interface Branding {
  name: string;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  fontFamily: string;
}

export interface SlideBlock {
  id: string;
  type: BlockType;
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color?: string;
  fontSize?: number;
}

export interface Slide {
  id: string;
  title: string;
  blocks: SlideBlock[];
}

export interface CarouselProject {
  id: string;
  name: string;
  templateId: string;
  branding: Branding;
  slides: Slide[];
  updatedAt: string;
}

export interface CarouselTemplate {
  id: string;
  name: string;
  description: string;
  branding: Branding;
  slides: Slide[];
}
