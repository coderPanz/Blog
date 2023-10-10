import "../styles/globals.scss";
import { Inter } from "next/font/google";
import { Header } from "@/components";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "coderpanz-blog",
  description: "coderPanz's bolg",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
