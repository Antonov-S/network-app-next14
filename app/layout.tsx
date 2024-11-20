import type { Metadata } from "next";
import "./globals.css";
import "@mantine/core/styles.css";
import { Inter } from "next/font/google";
import "@mantine/notifications/styles.css";
import "@mantine/tiptap/styles.css";
import "@/styles/editor.css";

import { ColorSchemeScript, createTheme, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Network App",
  description:
    "A simplified aplication designed for professionals to connect, share updates, and explore career opportunities."
};

const theme = createTheme({
  defaultRadius: "md",
  primaryColor: "blue"
});

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <MantineProvider theme={theme} defaultColorScheme="dark">
          <Notifications />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
