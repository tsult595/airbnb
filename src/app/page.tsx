
import { Suspense } from "react";
import MainComponent from "../components/mainPage/MainComponent";

export default function Home() {
  return (
    <div className="container w-full flex items-center justify-center p-4">
      <Suspense>
        <MainComponent />
      </Suspense>
    </div>
  );
}