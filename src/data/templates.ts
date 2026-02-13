import { CarouselTemplate } from '../types';

const uid = () => crypto.randomUUID();

export const templateCatalog: CarouselTemplate[] = [
  {
    id: 'professional-insights',
    name: 'Professional Insights',
    description: 'Great for thought leadership and educational carousels.',
    branding: {
      name: 'Corporate Blue',
      primaryColor: '#0A66C2',
      secondaryColor: '#004182',
      backgroundColor: '#F6FAFF',
      fontFamily: 'Inter'
    },
    slides: [
      {
        id: uid(),
        title: 'Hook Slide',
        blocks: [
          {
            id: uid(),
            type: 'text',
            content: '5 Lessons I Learned Leading Remote Teams',
            x: 8,
            y: 14,
            width: 84,
            height: 25,
            fontSize: 48,
            color: '#004182'
          }
        ]
      },
      {
        id: uid(),
        title: 'Body Slide',
        blocks: [
          {
            id: uid(),
            type: 'text',
            content: 'Lesson 1: Prioritize written communication for alignment and accountability.',
            x: 10,
            y: 15,
            width: 80,
            height: 40,
            fontSize: 34,
            color: '#0A66C2'
          }
        ]
      }
    ]
  },
  {
    id: 'minimal-story',
    name: 'Minimal Story',
    description: 'A clean layout for concise storytelling and case studies.',
    branding: {
      name: 'Minimal Mono',
      primaryColor: '#111827',
      secondaryColor: '#4B5563',
      backgroundColor: '#FFFFFF',
      fontFamily: 'Poppins'
    },
    slides: [
      {
        id: uid(),
        title: 'Cover Slide',
        blocks: [
          {
            id: uid(),
            type: 'text',
            content: 'How We Increased Qualified Leads by 3x in 90 Days',
            x: 10,
            y: 22,
            width: 80,
            height: 26,
            fontSize: 44,
            color: '#111827'
          }
        ]
      }
    ]
  }
];
