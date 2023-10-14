import { Link } from "react-router-dom";

export default function ListingItem({ task }) {
  const formatDate = (dateTime) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateTime).toLocaleDateString(undefined, options);
  };

  const formatTime = (dateTime) => {
    const options = {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return new Date(dateTime).toLocaleTimeString(undefined, options);
  };

  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
      <Link to={`/task/${task.id}`}>
        <img
          src={`../../public/upload/${task.image}`}
          alt="listing cover"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="truncate text-3xl font-semibold text-slate-700">
            {task.heading}
          </p>
          <p className="text-md text-gray-600 line-clamp-2">
            {task.description}
          </p>
          <div className="flex items-center gap-1">
            <p className="text-sm text-gray-900 truncate w-full">
              Date: {formatDate(task.date)}
            </p>
            <p className="text-sm text-gray-900 truncate w-full">
              Time: {formatTime(task.date)}
            </p>
          </div>

          <div className={"border w-16 px-3 bg-black "}>
            <p className="text-sm text-white line-clamp-2 ">{task.priority}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
