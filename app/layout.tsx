import type { Metadata } from "next";
import {Rubik} from "next/font/google";
import "react-calendar/dist/Calendar.css";
import "./styles/calendar.css";
import "./globals.css";

const rubik = Rubik({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-rubik',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});


export const metadata: Metadata = {
  title: "LiftLog",
  description: "Your Growth Tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${rubik.variable} antialiased`} >
        {children}
      </body>
    </html>
  );
}
