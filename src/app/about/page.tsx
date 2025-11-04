"use client";

import Image from "next/image";
import { PageLayout } from "@/components/ui/page-layout";
import { PageSection } from "@/components/ui/page-section";
import { PageHeader } from "@/components/ui/page-header";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { Highlighter } from "@/components/ui/highlighter";

export default function About() {
  return (
    <PageLayout showHeroCard={false}>
      {/* About Section */}
      <PageSection>
        <PageHeader 
          badge="Available for Work"
          showAvailableDot={true}
          headline="About Me"
          badgeBelowHeadline={true}
        />

        {/* Image */}
        <div className="mb-8 sm:mb-12">
          <div className="w-full max-w-md">
            <Image
              src="/hellosabri.jpg"
              alt="Sabri Ibrahim"
              width={384}
              height={384}
              className="w-full h-auto object-cover object-top rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8 sm:space-y-12 mb-8 sm:mb-12">
          
          {/* The Inside Story */}
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              🎉 Sabri's Final "Inside Story" Profile
            </h2>
            
            <p className="text-base text-muted-foreground leading-6 mb-8 max-w-2xl">
              I'm Sabri, a Product Designer with a decade of experience designing and scaling digital products from end-to-end. While my resume details the big-ticket items—like global platforms and AI systems—this page is the inside story. It's the journey of what happens after the Figma file closes: the struggles, the lessons, and the genuine curiosity that drives my design work.
            </p>

            <p className="text-base text-muted-foreground leading-6 mb-8 max-w-2xl">
              That curiosity was born in Sabah, Malaysia, pushing me to explore the world. My professional foundation was truly forged during six intense years in Singapore where I was working with Grab. I loved my time there, even if I was an "idiot" for not securing PR before COVID hit—it was a tough lesson learned! (Seriously, a Singaporean spouse might be my only way back. Call me!)
            </p>

            <p className="text-base text-muted-foreground leading-6 mb-8 max-w-2xl">
              My time at Delivery Hero in Berlin was an unforgettable experience. It was more than just a job; it was an appreciation for traveling and immersing myself in a different world. I got to experience a new set of vibrant culture, challenging myself to be a fast-learner, and enjoying seasons I'd never known before. That flexibility and cultural immersion allows me to connect and collaborate anywhere.
            </p>

            <p className="text-base text-muted-foreground leading-6 mb-8 max-w-2xl">
              The only downside to all that rapid cultural code-switching? The occasional, spectacular multilingual brainfart. If I'm not fully caffeinated, you might ask for a product roadmap update and get a deeply earnest response with a TikTok viral sound effect. It's chaotic, but hey, it means my brain is always running in layers.
            </p>

            <p className="text-base text-muted-foreground leading-6 mb-8 max-w-2xl">
              Ultimately, though, my most fluent dialect is the one that really ships complex products: the universal language of <Highlighter action="highlight" color="var(--primary)" strokeWidth={3} animationDuration={800} padding={5}>Influence Without Authority</Highlighter>—a concept my previous manager insisted I master. That, I've found, is the real secret.
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-border" />

          {/* The Sabbatical */}
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              📅 The Sabbatical: A Necessary Pivot
            </h2>
            
            <p className="text-base text-muted-foreground leading-6 mb-8 max-w-2xl">
              After two years of working remotely with Delivery Hero and waiting for a successful relocation back to Singapore, I was eventually offered a permanent, in-office role in Berlin. Unfortunately, the relocation didn't work out, and I was subsequently retrenched. This unexpected professional shift led me to take a year-long sabbatical to pursue a different kind of growth: a family mini-venture.
            </p>

            <p className="text-base text-muted-foreground leading-6 mb-8 max-w-2xl">
              I started EzyKopitiam with my brother, serving complex local classics like Ngiu Chap and Dim Sum. The learning curve for running a physical business was brutal. After eight months of non-stop effort, we got the venture running on autopilot, but it was clear my brother was far more natural with the operations than I was.
            </p>

            <p className="text-base text-muted-foreground leading-6 mb-8 max-w-2xl">
              While the experience taught me priceless lessons about operational friction and real-world efficiency, it confirmed my professional passion: I deeply missed working on bigger, more complex digital projects and the challenge of scaling systems for large, global companies.
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-border" />

          {/* Design Philosophy */}
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              🧠 My Design Philosophy: The Currency Exchange Model
            </h2>
            
            <p className="text-base text-muted-foreground leading-6 mb-8 max-w-2xl">
              After a decade building for giants, I've learned that a Senior Designer's job isn't about power—it's about mastering influence. My core philosophy is simple: Forget the org chart. The real mission is turning great UX into business impact by mastering strategic exchange. I lead laterally, not from above.
            </p>

            <p className="text-base text-muted-foreground leading-6 mb-8 max-w-2xl font-semibold">
              The Sabri Confession: The Mission is Influence
            </p>

            <p className="text-base text-muted-foreground leading-6 mb-8 max-w-2xl">
              Shipping a massive change—whether it's unifying the menu system for 500,000 restaurants or pioneering an AI-driven AdTech platform—isn't a design challenge; it's an influence challenge. I treat every major project as a series of strategic exchanges.
            </p>

            <h3 className="text-xl sm:text-2xl font-bold text-foreground mt-6">
              1. Understanding Currencies (Empathy is ROI)
            </h3>

            <p className="text-base text-muted-foreground leading-6 mb-8 max-w-2xl">
              I don't ask what my partners need; I ask what their currency is.
            </p>

            {/* Currency Table */}
            <div className="overflow-x-auto my-6">
              <table className="w-full border-collapse text-sm sm:text-base">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 font-bold text-foreground">Exchange Partner</th>
                    <th className="text-left p-3 font-bold text-foreground">Their "Currency" (What they Value)</th>
                    <th className="text-left p-3 font-bold text-foreground">My "Offer" (The Design Exchange)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="p-3 text-foreground">Engineering</td>
                    <td className="p-3 text-foreground/80">Reduced risk, Simplicity, and clean code</td>
                    <td className="p-3 text-foreground/80">I offer modular, well-documented designs (thanks to a Design System) that save them time and prevent costly mistakes.</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="p-3 text-foreground">Product Leadership</td>
                    <td className="p-3 text-foreground/80">Incremental Revenue, Scalability</td>
                    <td className="p-3 text-foreground/80">I contributed UX solutions that directly drove multi-million Euro revenue, supporting our AI-powered growth track record.</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="p-3 text-foreground">Regional Operations</td>
                    <td className="p-3 text-foreground/80">Operational Efficiency, Less Support Work</td>
                    <td className="p-3 text-foreground/80">I offer self-service tools and simplified flows to help them make their jobs easier, which scaled user onboarding 5x.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-foreground mt-6">
              The NPS Turnaround Story:
            </h3>

            <p className="text-base text-muted-foreground leading-6 mb-8 max-w-2xl">
              When I joined Delivery Hero, I was genuinely shocked to learn our menu management system had a vendor NPS of -49. My initial mandate was humble: just get us to NPS 0. To achieve this, I focused intensely on what vendors change most often and redesigned that flow within two months. That 40-point increase was about realizing the vendor's currency was control and transparency and baking that trust right into the platform.
            </p>

            <h3 className="text-xl sm:text-2xl font-bold text-foreground mt-6">
              2. Credibility is the Foundation of the Exchange
            </h3>

            <p className="text-base text-muted-foreground leading-6 mb-8 max-w-2xl">
              The power to persuade rests entirely on Trust and Credibility. Coming from a Front-End Developer background, I have instant respect from engineers because I speak their language and know exactly how much a rushed design costs.
            </p>

            <p className="text-base text-muted-foreground leading-6 mb-8 max-w-2xl">
              This background lets me go beyond a static Figma file: I can mock a working prototype to show the concept with engineers, moving discussions from abstract ideas to concrete, executable solutions in minutes.
            </p>

            <p className="text-base text-muted-foreground leading-6 mb-8 max-w-2xl">
              Ultimately, this technical fluency means I can joke with my engineers in their "language." When they find the code funny (or at least appreciate the clean documentation), they're excited to help me solve the problem.
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-border" />

          {/* AI Frontier */}
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              🤖 The AI Frontier: Architecture and Automation
            </h2>
            
            <p className="text-base text-muted-foreground leading-6 mb-8 max-w-2xl">
              Right now, my biggest obsession is the AI + Design frontier. I see AI as the ultimate test of the Influence model—we have to persuade an opaque black box to deliver coherent, human-centered results.
            </p>

            <h3 className="text-xl sm:text-2xl font-bold text-foreground mt-6">
              Humility Check: The Struggle is Real
            </h3>

            <p className="text-base text-muted-foreground leading-6 mb-8 max-w-2xl">
              This pursuit is not seamless; it's a constant, humbling grind. My journey started with experimenting—like using AI to write a hip-hop song and generate abstract videos.
            </p>

            <p className="text-base text-muted-foreground leading-6 mb-8 max-w-2xl">
              I fail constantly. It is unbelievably hard to prompt a coherent UI or nail the perfect "vibecoding." For every small win, I hit a dozen token limits, struggle with syntax, and watch the AI confidently generate pure nonsense. The secret isn't genius; it's taking little wins at every milestone, ruthlessly iterating, and watching hundreds of hours of tutorials to see what actually works.
            </p>

            <p className="text-base text-muted-foreground leading-6 mb-8 max-w-2xl">
              Then, I stumbled into tools that truly changed my workflow: Cursor, which feels familiar like my favorite IDE VS Code, and later, Claude Code. Using Claude Code on the terminal made me fall in love with the command line again. It forces me to think deeply about the context of the code, rather than getting distracted by a graphical user interface (GUI). This focus on context is critical for truly leveraging AI and crafting better prompts.
            </p>

            <h3 className="text-xl sm:text-2xl font-bold text-foreground mt-6">
              The Architect of Prompts: Learning By Doing
            </h3>

            <p className="text-base text-muted-foreground leading-6 mb-8 max-w-2xl">
              I run my studio (sabriibrahim.com) as a personal lab focused on AI workflow design. This lab is dedicated to the ultimate technical challenge: learning to articulate my thoughts with machine precision by doing the work every day.
            </p>

            <p className="text-base text-muted-foreground leading-6 mb-8 max-w-2xl">
              I actively pursue the Cohen-Bradford step of Gaining Clarity on a technical level: I craft both the user experience (UX) and the prompts that power it. I treat Large Language Models (LLMs) like demanding partners whose currency is structure and context. I'm constantly hitting the token limit because I'm chasing the ultimate reciprocal exchange with the machine—refining my own thinking through the process of writing code and prompts.
            </p>

            <p className="text-base text-muted-foreground leading-6 mb-8 max-w-2xl">
              My ultimate goal? To find a role within a larger company where I can serve my craving for collaboration with brilliant people. I want to work with smart, demanding teams where I can keep learning, refining, and applying these structured, scalable processes.
            </p>

            <h3 className="text-xl sm:text-2xl font-bold text-foreground mt-6">
              The Educator's Proof: Involve Me and I Learn
            </h3>

            <p className="text-base text-muted-foreground leading-6 mb-8 max-w-2xl">
              As Benjamin Franklin said, "Tell me and I forget. Teach me and I remember. Involve me and I learn."
            </p>

            <p className="text-base text-muted-foreground leading-6 mb-8 max-w-2xl">
              This desire to be involved and to learn by doing is why I became an HRD Corp Certified Trainer in AI and design thinking. This training allows me to connect with many professionals in Malaysia who are likely facing similar learning curves and challenges, ensuring my expertise is always grounded in real-world application.
            </p>
          </div>

        </div>

        {/* CTA */}
        <div className="flex justify-start mb-8 sm:mb-12">
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

