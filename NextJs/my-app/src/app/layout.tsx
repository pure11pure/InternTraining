import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div>header</div>
        <main>{children}</main>
        <div>footer</div>
      </body>
    </html>
  )
}
