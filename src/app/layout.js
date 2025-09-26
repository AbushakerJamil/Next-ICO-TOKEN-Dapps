import "./globals.css";
import { Providers } from "../app/providers";

export const metadata = {
  title: "Token ICO Dapps",
  description: "Token ICO Dapps",
  icons: {
    icon: "/logo.png", 
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
