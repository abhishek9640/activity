import Charity from "@/components/charity";
import Education from "@/components/education";
import Heading from "@/components/heading";
import Music from "@/components/music";
import Recreational from "@/components/recreational";
import Social from "@/components/social";



export default function Home() {
    
    
  return (
    <main className="flex flex-col items-center px-4">
      <Heading />
      <Social />
      <Charity />
      <Recreational />
      <Music />
      <Education />
    </main>
  );
}
