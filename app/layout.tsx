import type { Metadata } from "next";
import "./globals.css";
import { Rowdies } from "next/font/google";

// Import Rowdies font
const rowdies = Rowdies({
  subsets: ["latin"],
  weight: ["300", "400", "700"], // Include the weights you might need
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bhoomi Sakhrani || Personal Portfolio",
  description: "Creative developer and designer | Explore my projects, skills, and experience.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${rowdies.className} antialiased bg-black text-white`}>
        {children}
      </body>
    </html>
  );
}
