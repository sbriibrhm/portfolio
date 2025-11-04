# 🎨 Sabri Ibrahim - Portfolio

A modern, performant portfolio website built with Next.js 16, showcasing my work as a Product Designer and Creative Technologist. Built with AI-assisted development tools including Cursor and Claude.

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🎯 **Modern Design System** - Built with shadcn/ui components and Tailwind CSS
- 📱 **Fully Responsive** - Mobile-first design with optimized layouts for all devices
- 🌗 **Dark Mode** - Seamless theme switching with system preference detection
- 📝 **MDX Blog** - Write content in Markdown with React component support
- 🎬 **Smooth Animations** - Framer Motion powered interactions and transitions
- ⚡ **Optimized Performance** - Server-side rendering, image optimization, and code splitting
- 🔍 **SEO Friendly** - Dynamic metadata, sitemap, and semantic HTML
- 🎨 **Interactive UI** - Custom hover effects, glitch effects, and micro-interactions
- 📊 **Table of Contents** - Auto-generated TOC for blog posts
- 🎵 **Audio Pronunciation** - Name pronunciation feature
- 📧 **Contact Integration** - Direct email links throughout the site

## 🛠️ Tech Stack

### Core
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)

### Content & Animations
- **MDX**: [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Syntax Highlighting**: [Shiki](https://shiki.matsu.io/)

### Development Tools
- **AI Coding**: [Cursor](https://cursor.sh/)
- **AI Assistant**: [Claude (Anthropic)](https://www.anthropic.com/)
- **Package Manager**: npm
- **Version Control**: Git

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/sbriibrhm/portfolio.git
cd portfolio
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
portfolio/
├── public/                  # Static assets
│   ├── audio/              # Audio files (name pronunciation)
│   ├── images/             # Images and blog covers
│   │   ├── blog/          # Blog post images
│   │   └── ...
│   └── logos/              # Company logos
├── content/                # MDX content
│   ├── blog/              # Blog posts
│   └── projects/          # Project case studies
├── src/
│   ├── app/               # Next.js app directory
│   │   ├── about/         # About page
│   │   ├── blog/          # Blog pages
│   │   ├── experience/    # Experience page
│   │   └── api/           # API routes
│   ├── components/        # React components
│   │   ├── ui/           # UI components (shadcn)
│   │   └── ...           # Custom components
│   └── lib/              # Utility functions
├── components.json        # shadcn/ui configuration
├── next.config.ts        # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## 📝 Content Management

### Adding a Blog Post

Create a new `.mdx` file in `content/blog/`:

```mdx
---
title: "Your Blog Post Title"
description: "A brief description of your post"
date: "2025-01-27"
cover: "/images/blog/your-cover.jpg"
tags: ["design", "development"]
---

Your blog post content here...
```

### Adding a Project

Create a new `.mdx` file in `content/projects/`:

```mdx
---
title: "Project Name"
description: "Project description"
date: "2025-01-27"
cover: "/images/projects/project-cover.jpg"
---

Your project case study here...
```

## 🎨 Customization

### Colors & Theme

Edit `tailwind.config.ts` to customize the color scheme:

```typescript
colors: {
  primary: {
    // Your custom colors
  }
}
```

### Components

UI components are built with shadcn/ui. Add new components:

```bash
npx shadcn-ui@latest add [component-name]
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/sbriibrhm/portfolio)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Configure environment variables (if any)
4. Deploy!

### Build for Production

```bash
npm run build
npm run start
```

## 📊 Performance

- ⚡ **Lighthouse Score**: 95+ across all metrics
- 🎯 **Core Web Vitals**: Optimized for LCP, FID, and CLS
- 📦 **Bundle Size**: Code-split and optimized
- 🖼️ **Images**: Next.js Image optimization with lazy loading

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/sbriibrhm/portfolio/issues).

## 📧 Contact

**Sabri Ibrahim**
- Email: [sbriibrhm@gmail.com](mailto:sbriibrhm@gmail.com)
- Portfolio: [Your portfolio URL]
- GitHub: [@sbriibrhm](https://github.com/sbriibrhm)

## 📄 License

This project is [MIT](LICENSE) licensed.

---

<div align="center">
  <p>Built with ❤️ using Next.js and AI-assisted development</p>
  <p>Designed and developed by <a href="mailto:sbriibrhm@gmail.com">Sabri Ibrahim</a></p>
</div>
