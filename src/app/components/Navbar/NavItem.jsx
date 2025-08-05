export default function NavItem({ item }) {
  return (
    <div className="m-4 px-4 py-1 text-xl animate font-bold nav-item cursor-pointer clickable-white transition-colors duration-300">
      {item}
    </div>
  );
}
