import type { Metadata } from "next";
import "./globals.css";
import { MainLayout } from "@/components/layout/MainLayout";
import { NexusProvider } from "@/context/NexusContext";
import { NotificationProvider } from "@/context/NotificationContext";
import { ToastContainer } from "@/components/common/ToastContainer";
import { AppProvider } from "@/context/AppContext";
export const metadata: Metadata = {
  title: "Nexus Supply Dashboard",
  description: "Premium Google-inspired enterprise SaaS product built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <NexusProvider>
            <NotificationProvider>
              <MainLayout>{children}</MainLayout>
              <ToastContainer />
            </NotificationProvider>
          </NexusProvider>
        </AppProvider>
      </body>
    </html>
  );
}
