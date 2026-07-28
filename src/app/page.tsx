
import { Suspense } from "react";
import MainComponent from "../components/mainPage/MainComponent";

export default function Home() {
  return (
    <div className="container w-full flex items-center justify-center p-4">
      <Suspense fallback={<div className="min-h-screen bg-amber-50 text-black flex items-center justify-center">Загрузка ленты Oxu.az...</div>}>
        <MainComponent />
      </Suspense>
    </div>
  );
}