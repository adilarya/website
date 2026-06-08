// ── Research Papers ──────────────────────────────────────────────────────────
// Fill these in. Each opens a popup. Shape:
//   { slug, title, authors, venue, year, abstract, tags: [], links: { arxiv, pdf, doi } }
export const PAPERS = [
  // {
  //   slug: 'imitation-of-imitations',
  //   title: 'Imitation of Imitations: Model Collapse under Synthetic Training Data',
  //   authors: 'A. Arya',
  //   venue: 'arXiv preprint (in preparation)',
  //   year: '2026',
  //   abstract: 'A paragraph or two describing the work — shown in the popup.',
  //   tags: ['LLMs', 'Synthetic Data', 'Model Collapse'],
  //   links: { arxiv: '#', pdf: '#' },
  // },
]

// ── Other Projects ───────────────────────────────────────────────────────────
// Shape: { slug, title, year, tags: [], description, links: { github, demo } }
export const PROJECTS = [
  {
    slug: 'ray-tracer',
    title: 'Ray Tracer',
    year: '2026',
    tags: ['C++', 'Graphics', 'Rendering'],
    description:
      'A ray tracer written from scratch — ray–object intersection, Phong shading, reflections, and physically-based lighting, all from first principles.',
    links: { github: 'https://github.com/adilarya/raytracer' },
  },
  {
    slug: 'mapreduce',
    title: 'MapReduce',
    year: '2026',
    tags: ['C', 'Distributed Systems', 'Parallelism'],
    description:
      'A MapReduce engine built from scratch in C: work is split across parallel mapper and reducer processes, with mappers turning log files into intermediate results and reducers aggregating IP-address counts by range — all backed by a custom hash table for fast counting.',
    links: { github: 'https://github.com/Eshwar-R-97/mapreduce' },
  },
  {
    slug: 'nn-from-scratch',
    title: 'Handwritten Digit Classification — Neural Networks From Scratch',
    year: '2025',
    tags: ['Python', 'NumPy', 'Deep Learning'],
    description:
      'Four neural-network architectures implemented entirely from scratch in NumPy to classify MNIST digits — a linear and softmax perceptron, a multi-layer perceptron, and a CNN. Every forward/backward pass, backpropagation step, and mini-batch SGD update is written by hand, with no ML frameworks.',
    links: { github: 'https://github.com/adilarya/mnist-numpy-neural-networks' },
  },
  {
    slug: 'scene-recognition',
    title: 'Scene Recognition',
    year: '2025',
    tags: ['Python', 'Computer Vision', 'SIFT', 'SVM'],
    description:
      'A classical computer-vision pipeline that sorts images into 15 scene categories three different ways: tiny-image with k-nearest neighbors, bag-of-words over dense SIFT with k-NN, and bag-of-words with a linear SVM — including visual-vocabulary construction via K-means and confusion-matrix evaluation.',
    links: { github: 'https://github.com/adilarya/scene-recognition' },
  },
  {
    slug: 'image-registration',
    title: 'Affine Image Registration and Tracking with SIFT & RANSAC',
    year: '2025',
    tags: ['Python', 'Computer Vision', 'RANSAC'],
    description:
      'An end-to-end image-registration pipeline that tracks a template across video frames using SIFT feature matching, RANSAC for robust geometric estimation, image warping, and inverse-compositional alignment for iterative refinement.',
    links: { github: 'https://github.com/adilarya/multiframe-tracking' },
  },
  {
    slug: 'hog-face-detection',
    title: 'Histogram of Oriented Gradients (HOG) & Face Detection',
    year: '2025',
    tags: ['Python', 'Computer Vision', 'HOG'],
    description:
      'A full Histogram of Oriented Gradients (HOG) descriptor pipeline paired with a template-based face detector — Sobel differential filtering to build the HOG features, normalized cross-correlation to match template against target, and non-maximum suppression to prune overlapping detections.',
    links: { github: 'https://github.com/adilarya/face-detection' },
  },
]
