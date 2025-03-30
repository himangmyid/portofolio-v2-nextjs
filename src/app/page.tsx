import HomeOverlayComponent from "@/app/components/ul/HomeOverlayComponent";

export default function Home() {
  return (
    <div className="relative flex items-center justify-center font-geist-sans h-screen overflow-hidden">
      <main className="w-full mask-x-from-70% mask-x-to-100%">
        <HomeOverlayComponent />
      </main>
    </div>
  );
}
