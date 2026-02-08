import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Meal Planner",
  description: "Weekly meal planning made simple",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
        <nav
          className="sticky top-0 z-50 backdrop-blur-md px-4 py-3"
          style={{
            background: 'color-mix(in srgb, var(--background) 85%, transparent)',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <div className="max-w-2xl mx-auto flex items-center justify-between">
            <a href="/" className="text-xl font-bold" style={{ color: 'var(--primary)' }}>
              🍽️ Meal Planner
            </a>
            <a
              href="/recipes"
              className="text-sm font-medium px-3 py-1.5 rounded-lg transition-colors"
              style={{ color: 'var(--foreground-muted)' }}
            >
              All Recipes
            </a>
          </div>
        </nav>
        <main className="max-w-2xl mx-auto px-4 py-6">
          {children}
        </main>
      </body>
    </html>
  );
}
