// Shared experience data — used by the list page (/experience) and the popup.
// Descriptions sourced from public/resume.pdf. Add new roles here.
export const EXPERIENCE = [
  {
    slug: 'divertica',
    company: 'Divertica Inc.',
    role: 'Computer Vision Intern',
    period: 'Jun 2025 – Aug 2025',
    type: 'Computer Vision',
    location: 'Remote',
    logo: '/logos/divertica.jpg',
    logo3d: 'divertica',
    initials: 'DV',
    current: false,
    summary: 'Built an end-to-end computer-vision system turning 4K in-store video into shelf-level retail planograms.',
    bullets: [
      'Built an end-to-end CV pipeline converting 4K/60fps in-store video into structured retail planograms via frame stitching, object detection, and OCR.',
      'Benchmarked YOLOv8s and YOLOv12s (fine-tuned on SKU110K), ResNet50, and ImageNet-pretrained OCR, reaching 0.87 F1 / 0.90 mAP50 on shelf detection.',
      'Found YOLOv12 offered no meaningful gain over YOLOv8 and surfaced a classification bottleneck at ~630K SKU classes, proposing a retrieval-based alternative.',
    ],
  },
]

export const getExperience = (slug) => EXPERIENCE.find(e => e.slug === slug)
