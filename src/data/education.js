// Shared education data — used by the list and the popup. Sourced from
// public/resume.pdf.
export const EDUCATION = [
  {
    slug: 'columbia',
    school: 'Columbia University',
    degree: 'MS in Artificial Intelligence, Concentration in Robotics & Perception',
    concentration: null,
    period: 'Sep 2026 – Dec 2028',
    status: 'Incoming',
    location: 'New York, NY',
    logo: '/logos/columbia.jpg',
    logo3d: 'columbia',
    initials: 'CU',
    gpa: null,
    honors: [],
    coursework: [],
    description:
      'Incoming graduate student at Columbia Engineering, concentrating in robotics and perception within the AI program.',
  },
  {
    slug: 'university-of-minnesota',
    school: 'University of Minnesota',
    degree: 'BS in Computer Science',
    concentration: null,
    period: 'Sep 2024 – May 2026',
    status: 'Completed in two years',
    location: 'Minneapolis, MN',
    logo: '/logos/umn.jpg',
    logo3d: 'umn',
    initials: 'UMN',
    transcript: '/SSR_TSRPT.pdf',
    gpa: '3.912 / 4.0',
    honors: ['High Honors', '5× CSE Dean’s List', 'Tau Beta Pi'],
    coursework: [
      'Algorithms & Data Structures', 'Operating Systems', 'Machine Learning',
      'Computer Vision', 'Robotics', 'NLP', 'Artificial Intelligence I & II',
    ],
    clubs: [
      { position: 'Technical Lead',        name: 'UMN AI Club',                          period: '2025–2026' },
      { position: 'Bass / Soloist',        name: 'Minnesota Fitoor',                      period: '2024–2026' },
      { position: 'Coding Subgroup Lead',  name: 'Engineers Without Borders — Guatemala', period: '2025' },
      { position: 'Tables Subgroup Lead',  name: 'Engineers Without Borders — Local',     period: '2024–2025' },
      { position: 'Member',                name: 'Science & Engineering Board',           period: '2024–2025' },
    ],
    description: 'Completed a computer-science degree on an accelerated two-year track.',
  },
]

export const getEducation = (slug) => EDUCATION.find(e => e.slug === slug)
