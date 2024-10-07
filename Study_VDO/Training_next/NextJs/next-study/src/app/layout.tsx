import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-[100vh]">
        <p className="text-center bg-sky-700 p-2">header</p>
        <div className="p-2 h-[80vh]">{children}</div>
        <p className="text-center bg-sky-800 p-2">footer</p>
      </body>
    </html>
  );
}
