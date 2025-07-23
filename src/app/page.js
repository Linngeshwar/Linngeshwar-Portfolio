import Navbar from "./components/Navbar";
import About from "./components/About";
import Projects from "./components/Projects";
import MaybeProjects from "./components/MaybeProjects";
import KoalaType from "./components/KoalaType";

export default function Home() {
  return (
    <div>
      <Navbar />
      <About />
      {/* <Projects /> */}
      <MaybeProjects />
      <KoalaType />
    </div>
  );
}
