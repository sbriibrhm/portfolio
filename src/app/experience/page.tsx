"use client";

import { PageLayout } from "@/components/ui/page-layout";
import { PageSection } from "@/components/ui/page-section";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { RainbowButton } from "@/components/ui/rainbow-button";
import type { ExperienceItemType } from "@/components/work-experience";
import { WorkExperience } from "@/components/work-experience";

const WORK_EXPERIENCE: ExperienceItemType[] = [
  {
    id: "maagroup",
    companyName: "HRD Corp Malaysia",
    companyLogo: "/logos/hrdcorp-logo.png",
    positions: [
      {
        id: "maagroup-1",
        title: "Certified Trainer",
        employmentPeriod: "Jun 2025 - Present",
        employmentType: "Part-time",
        icon: "education",
        description: `- **Certified under Malaysia’s HRD Corp(Human Resource Development Corporation) TTT program**, delivering training in **AI, design thinking, and digital productivity**.
- Develop and conduct **HRD-claimable courses** for vocational educators and professionals, focusing on **AI integration, automation, and creative workflows**.
- Collaborate with institutions and corporate clients to **design outcome-based learning modules** that bridge technology and human capability.`,
        skills: [
          "Training",
          "AI for Educators",
          "Learning Design",
          "Workforce Development",
          "HRD Corp Certified",
          "Education",
          "AI & Automation",
          "Upskilling",
        ],
        isExpanded: true,
      }
    ],
    isCurrentEmployer: true,
  },
  {
    id: "sabriibrahim",
    companyName: "sabriibrahim.com",
    companyLogo: "/avatar.jpg",
    positions: [
      {
        id: "sabriibrahim-1",
        title: "Product Designer",
        employmentPeriod: "Jun 2025 - Present",
        employmentType: "Part-time",
        icon: "business",
        description: `- Operate as a **multidisciplinary studio** focusing on **product design, AI workflow design, and creative experimentation**.
- Design and engineer user interfaces and experiences.
- Build and maintain sabriibrahim.com as a public portfolio and playground to explore **AI-assisted tools**, and **storytelling through design**.`,
        skills: [
          "Next.js",
          "Vercel",
          "Cursor",
          "Claude Code",
          "OpenAI Codex",
          "Tailwind CSS",
          "Shadcn/UI",
          "Figma",
          "React",
          "TypeScript",
          "Framer Motion",  
          "Frontend Engineering",
          "Design Systems",
        ],
        isExpanded: false,
      },
    ],
    isCurrentEmployer: true,
  },
  {
    id: "sabbatical",
    companyName: "Independent",
    positions: [
      {
        id: "sabbatical-1",
        title: "Sabbatical",
        employmentPeriod: "Feb 2024 - Jun 2025",
        employmentType: "Time-off",
        icon: "sabbatical",
        description: `- Took a planned year-long break to **experiment with mini-retirement and personal rewirement,** focusing on reflection, creative renewal, and recalibrating long-term goals.
- **Explored the F&B industry,** gaining hands-on experience in operations and learning practical business management to broaden entrepreneurial perspective.
- Invested time in **creative hobbies** — from music production, building Gundam models and design tinkering to scooter customization — as a way to reconnect curiosity with craft.`,
        skills: [],
        isExpanded: false,
      },
    ],
    isCurrentEmployer: false,
  },
  {
    id: "delivery-hero",
    companyName: "Delivery Hero",
    companyLogo: "/logos/dh-small.png",
    positions: [
      {
        id: "dh-1",
        title: "Senior Product Designer — Adtech",
        employmentPeriod: "Jun 2022 — Feb 2024",
        employmentType: "Full-time",
        icon: "design",
        description: `- Led the design of **ad components on the consumer app**, improving discoverability and engagement across global food delivery brands.
- Designed a centralized **AI-driven AdTech** platform empowering long-tail vendors to create, manage, and optimize campaigns with minimal effort.
- Pioneered an **AI-powered marketing automation system** that optimized restaurant ad spend and delivered **€XXM in incremental annual non-commission revenue** through targeted deal personalization.`,
        skills: [
          "UI/UX Design",
          "Prototyping",
          "Product Strategy",
          "User Flows",
          "Figma",
        ],
        isExpanded: true,
      },
      {
        id: "dh-2",
        title: "Senior Product Designer — Vendor Growth",
        employmentPeriod: "Sep 2019 — Jun 2022",
        employmentType: "Full-time",
        icon: "design",
        description: `- Spearheaded the end-to-end design of a unified global menu management system serving over **500,000 restaurants**, enabling seamless migration of **Talabat, Hunger Station, and PedidosYa** into one centralized platform.
- Partnered with product and engineering leads to drive a **40-point increase in vendor NPS**, improving communication flows, menu update experiences, and mobile usability across regions.
- Defined and executed the **product design strategy** for menu self-service and quality initiatives — **tested and validated with Foodpanda** before scaling across Delivery Hero’s global markets.`,
        skills: [
          "Product Design",
          "UX Strategy",
          "Data Analysis",
          "Cross-Platform Design",
          "Prototyping",
          "Figma",
          "Self-Service Design",
        ],
        isExpanded: true,
      }
    ],
    isCurrentEmployer: false,
  },
  {
    id: "vara",
    companyName: "Vara",
    companyLogo: "/logos/vara-logo.jpeg",
    positions: [
      {
        id: "vara-1",
        title: "Lead Product Designer",
        employmentPeriod: "Feb 2021 — Jun 2021",
        employmentType: "Contract",
        icon: "design",
        description: `- Led the design vision for Vara’s mission to **make labor frictionless through modernizing human capital workflows.
- Partnered with product and engineering teams to **streamline workforce management tools**, improving usability and adoption across enterprise clients.
- Defined **design systems and interaction patterns** that supported rapid iteration and consistent experience across web and mobile platforms.
- Collaborated directly with founders to **shape product strategy**, ensuring alignment between user needs, business goals, and technical feasibility.`,
        skills: [
          "UI/UX Design",
          "Design Leadership",
          "Team Management",
          "Product Strategy",
          "Figma",
        ],
        isExpanded: false,
      },
    ],
    isCurrentEmployer: false,
  },
  {
    id: "zinier",
    companyName: "Zinier",
    companyLogo: "/logos/zinier.jpeg",
    positions: [
      {
        id: "zinier-1",
        title: "Senior Product Designer",
        employmentPeriod: "Aug 2020 — December 2020",
        employmentType: "Full-time",
        icon: "design",
        description: `- **Migrated the design system from Sketch to Figma**, creating scalable and consistent components across mobile and web applications.
- **Designed and launched a drag-and-drop workflow builder**, enabling non-developers to automate tasks and customize workflows directly within the platform.
- **Led end-to-end design validation**, from early prototyping through final user testing, ensuring product quality, usability, and design consistency across teams.`,
        skills: [
          "Design Systems",
          "Dashboard Design",
          "Data Visualization",
          "Figma",
          "Sketch",
          "UX Design",
          "UI Design",
          "Enterprise SaaS",
          "Workflow Automation",
        ],
        isExpanded: false,
      },
    ],
    isCurrentEmployer: false,
  },
  {
    id: "grab",
    companyName: "Grab",
    companyLogo: "/logos/grab.svg",
    positions: [
      {
        id: "grab-1",
        title: "Lead Product Designer — Marketplace",
        employmentPeriod: "Jan 2019 — July 2020",
        employmentType: "Full-time",
        icon: "design",
        description: `- **Led design for driver marketplace experiences**, improving acceptance and reducing cancellations through **Gems** and **Team Missions**.
- Launched **Grab Challenges** across all markets, driving sustained engagement and retention among driver-partners.
- **Increased ads-driven EBITDA** by empowering long-tail merchants to advertise on the Grab platform via self-serve tools.`,
        skills: [
          "Product Design",
          "UX Strategy",
          "Incentive Systems",
          "AdTech",
          "Experimentation",
          "Cross-Market Collaboration",
          "Sketch",
          "Framer"
        ],
        isExpanded: true,
      },
      {
        id: "grab-2",
        title: "Senior Product Designer — Economics",
        employmentPeriod: "Jan 2017 – Jan 2019",
        employmentType: "Full-time",
        icon: "design",
        description: `- Designed and launched the **Unified Incentives Platform**, optimizing supply utilization and earnings transparency for millions of drivers.
- Created **Driver Heatmaps and Location Insights**, enabling smarter decisions and better alignment of supply and demand.
- Served as a core contributor to **Grab Design System (GDS)**, maintaining consistency and scalability across platforms.`,
        skills: [
          "Design Systems",
          "UX Strategy",
          "UX Research",
          "Interaction Design",
          "Product Analytics",
          "Sketch",
          "Framer"
        ],
        isExpanded: true,
      },
      {
        id: "grab-3",
        title: "Product Designer — Driver Experience",
        employmentPeriod: "Oct 2015 – Jan 2017",
        employmentType: "Full-time",
        icon: "code",
        description: `- Improved **passenger match rate by 18%** and **reduced driver cancellations by 34%** through a redesigned booking experience.
- **Scaled onboarding 5x** via a new online driver-onboarding platform adopted region-wide.
- Created and launched **GrabChat**, reducing cancellations and strengthening driver–passenger communication.`,
        skills: [
          "Mobile UX",
          "Onboarding Experience",
          "Interaction Design",
          "Conversion Optimization",
        ],
        isExpanded: true,
      },
      {
        id: "grab-4",
        title: "Front-End Developer — Product (MyTeksi)",
        employmentPeriod: "Feb 2014 – Oct 2015",
        employmentType: "Full-time",
        icon: "code",
        description: `- Built and maintained **regional MyTeksi websites** across six countries in Southeast Asia.
- Developed **Share My Ride**, a passenger safety feature enhancing trust and transparency.
- Created **internal booking tools** that improved operational efficiency for support teams.`,
        skills: [
          "Front-End Development",
          "JavaScript",
          "PHP",
          "HTML/CSS",
          "UI Implementation",
          "Responsive Design",
          "Ruby on Rails",
        ],
        isExpanded: true,
      },
    ],
    isCurrentEmployer: false,
  },
  {
    id: "wool-candy",
    companyName: "Wool & Candy",
    companyLogo: "/logos/wnc-logo.png",
    positions: [
      {
        id: "wool-candy-1",
        title: "Co-founder / Front End Developer",
        employmentPeriod: "Sept 2013 — Sept 2017",
        employmentType: "Full-time",
        icon: "business",
        description: `- Founded a small creative agency delivering digital products and brand experiences; led product development and front-end design for client projects.`,
        skills: [
          "Entrepreneurship",
          "Frontend Development",
          "Co-founder",
          "JavaScript",
          "CSS",
          "HTML",
        ],
        isExpanded: false,
      },
    ],
    isCurrentEmployer: false,
  },
  {
    id: "smobble",
    companyName: "Smobble",
    companyLogo: "/logos/smobble-logo.svg",
    positions: [
      {
        id: "smobble-1",
        title: "UI and Web Designer",
        employmentPeriod: "Nov 2012 — Feb 2014",
        employmentType: "Full-time",
        icon: "design",
        description: `- Designed and developed marketing websites across gaming, self-development, and evergreen niches. 
- Created branding and visual concepts for high-converting sales pages, while contributing to strategic decisions and client solutions to improve campaign performance.`,
        skills: [],
        isExpanded: false,
      },
    ],
    isCurrentEmployer: false,
  },
  {
    id: "education",
    companyName: "Education",
    positions: [
      {
        id: "uitm-shah-alam",
        title: "UiTM - Universiti Teknologi MARA, Shah Alam (BA Hons, Graphic Design, Digital Media)",
        employmentPeriod: "2010 - 2012",
        employmentType: undefined,
        icon: "education",
        description: undefined,
        skills: [],
        isExpanded: false,
      },
      {
        id: "uitm-kota-samarahan",
        title: "UiTM - Universiti Teknologi MARA, Kota Samarahan (Diploma, Graphic Design and Digital Media)",
        employmentPeriod: "2007 - 2010",
        employmentType: undefined,
        icon: "education",
        description: undefined,
        skills: [],
        isExpanded: false,
      },
    ],
    isCurrentEmployer: false,
  },
];

export default function Experience() {
  return (
    <PageLayout showHeroCard={false}>
      {/* Experience Section */}
      <PageSection>
        <PageHeader 
          badge="Experience & Education"
          headline="Work Experience"
          subheadline="10+ years of building products end-to-end, crafting UX and prompts that drive growth."
        />

            <WorkExperience
              className="w-full rounded-lg border"
              experiences={WORK_EXPERIENCE}
            />

            {/* CTA */}
            <div className="flex justify-start mt-8 sm:mt-12">
              <RainbowButton
                size="lg"
                className="px-8 sm:px-12 py-3 sm:py-4 text-sm sm:text-base font-medium h-auto"
                onClick={() => window.open('/resume.pdf', '_blank')}
              >
                Download Resume (PDF)
              </RainbowButton>
            </div>
      </PageSection>
    </PageLayout>
  );
}

