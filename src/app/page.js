import Navbar from "./components/Navbar";
import About from "./components/About";
import Projects from "./components/Projects";

export default function Home() {
  return (
    <div>
      <Navbar />
      <About />
      <Projects />
      <About />
      <About />
    </div>
  );
}
