import CircularText from "@/components/CircularText";

export default function Home() {
  return (
    <main className="h-screen w-screen bg-black flex items-center justify-center">
      <CircularText
        text="AIBEL AIBEL AIBEL"
        spinDuration={15}
        onHover="goBonkers"
        className="text-white"
      />
    </main>
  );
}
