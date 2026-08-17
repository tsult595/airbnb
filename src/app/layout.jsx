import "./globals.css";
import ReactQueryProvider from "../providers";
import 'leaflet/dist/leaflet.css';

export const metadata = {
  title: "RBNB — поиск жилья",
  description: "Поиск и бронирование жилья",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ru"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
