import TaskCard from "../components/TaskCard";
import { useEffect, useState } from "react";
import "../index.css";
const Home = () => {
  const [allTasks, setAllTasks] = useState(null);
  const [selectedPriority, setSelectedPriority] = useState("All");
  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/task", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const result = await response.json();

        if (result) {
          setAllTasks(result);
        }
      }
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handlePriorityChange = (event) => {
    setSelectedPriority(event.target.value);
  };

  const filteredTasks =
    selectedPriority === "All"
      ? allTasks
      : allTasks.filter((task) => task.priority === selectedPriority);
  return (
    <section className="max-w mx-20 ">
      <div className="mt-10 flex flex-col  items-center text-center ">
        <h1 className="font-extrabold new_gradient text-[60px] max-w-[800px] ">
          Welcome to Task Manager{" "}
          <span className="showcase break-after-right">Simplifying </span>{" "}
          Workload
        </h1>
        <p className="mt-4 font-medium text-[#497696] text-[18px] max-w-[800px]">
          We provide a user-friendly platform to efficiently manage tasks with
          image and priority management capabilities. Please note, while we
          strive to offer a seamless user experience.
        </p>
      </div>
      <div className="flex flex-col gap-5 my-10">
        <select
          className="block w-40 px-4 py-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          value={selectedPriority}
          onChange={handlePriorityChange}
        >
          <option value="All" className="py-1">
            All
          </option>
          <option value="High" className="py-1">
            High
          </option>
          <option value="Medium" className="py-1">
            Medium
          </option>
          <option value="Low" className="py-1">
            Low
          </option>
        </select>
      </div>
      <div className="flex flex-wrap gap-5 ">
        {filteredTasks &&
          filteredTasks.map((task, index) => (
            <TaskCard key={index} task={task} />
          ))}
      </div>
    </section>
  );
};

export default Home;
