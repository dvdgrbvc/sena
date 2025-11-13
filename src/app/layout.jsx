import Script from "next/script"
import "./globals.css"

export const metadata = {
  title: "Sena Sener — Official",
  description: "Music, tour dates, and contact.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-black text-white">
      <head>
        {/* Preload hero video */}
        <link rel="preload" href="/sena-hero.mp4" as="video" type="video/mp4" />

        {/* GOOGLE ADSENSE VERIFICATION */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4960948940164213"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>

      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
