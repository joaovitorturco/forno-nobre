import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata: Metadata = {
  title: "Forno Nobre — Pedidos",
  description: "Sistema de pedidos da Pizzaria Forno Nobre",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="tricolor-bar" />
        <AuthProvider>{children}</AuthProvider>
        <ToastContainer position="top-right" autoClose={3500} theme="light" />
      </body>
    </html>
  );
}
