import ScrollStack, {
  ScrollStackItem,
} from "@/Components/ScrollStack/ScrollStack";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  return (
    <div
      id="projects"
      className="h-screen flex flex-col justify-center items-center"
    >
      <ScrollStack className="w-full h-full flex flex-col items-center justify-center">
        <ScrollStackItem>
          <ProjectCard />
        </ScrollStackItem>
        <ScrollStackItem>
          <ProjectCard />
        </ScrollStackItem>
        <ScrollStackItem>
          <ProjectCard />
        </ScrollStackItem>
        <ScrollStackItem>
          <ProjectCard />
        </ScrollStackItem>
        <ScrollStackItem>
          <ProjectCard />
        </ScrollStackItem>
      </ScrollStack>
    </div>
  );
}
