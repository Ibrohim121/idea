import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "./contexts/ToastContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ProfileOverridesProvider } from "./contexts/ProfileOverrides";
import ToastClient from "./components/ToastClient";
import { SessionProvider } from "./components/SessionProvider";
import { ConvexClientProvider } from "./components/ConvexClientProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Logistika",
  description: "Logistika boshqaruv tizimi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <SessionProvider>
            <ConvexClientProvider>
              <ProfileOverridesProvider>
                <ToastProvider>
                  {children}
                  <ToastClient />
                </ToastProvider>
              </ProfileOverridesProvider>
            </ConvexClientProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
