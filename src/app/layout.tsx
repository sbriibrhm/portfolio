import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { CommandPalette, CommandPaletteProvider } from "@/components/command-palette";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Sabri Ibrahim — Product & UX Designer, AI Trainer",
  description: "Product designer who codes. Case studies, process, and AI training—research to production with clear metrics.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/avatar.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="antialiased"
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CommandPaletteProvider>
            {children}
            <CommandPalette />
          </CommandPaletteProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
