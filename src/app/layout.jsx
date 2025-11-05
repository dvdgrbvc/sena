export const metadata = {
  title: "Sena Sener — Official",
  description: "Music, tour dates, and contact.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

import "./globals.css"

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-black text-white">
      <head>
        {/* Optional: preloading hero video improves LCP */}
        <link rel="preload" href="/sena-hero.mp4" as="video" type="video/mp4" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
