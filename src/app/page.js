import Navbar from "./components/Navbar";
import About from "./components/About";
import Projects from "./components/Projects";
import ProjectCard from "./components/ProjectCard";

export default function Home() {
  return (
    <div>
      <Navbar />
      <About />
      <ProjectCard />
      <Projects />
    </div>
  );
}
