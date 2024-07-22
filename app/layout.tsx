import { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import Provider from "@/utils/provider";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Toaster />
        <div>
          <Provider>{children}</Provider>
        </div>
      </body>
    </html>
  );
}
