import { Link } from "react-router-dom";
export default function Header() {
  return (
    <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
      <Link to ="/">
      <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
        <span className="text-[#33B89F]">Task</span>
        <span className="text-black">Manager</span>
      </h1>
      </Link>
      <Link
        to="/create-task"
        className="font-Space-Grotesk font-medium bg-[#33B89F] text-white px-4 py-2 rounded-md"
      >
        Create
      </Link>
    </header>
  );
}
