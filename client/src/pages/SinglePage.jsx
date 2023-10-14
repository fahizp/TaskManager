import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const SinglePage = () => {
  const [task, setTask] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchTask = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/task/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        setTask(result);
      } else {
        throw new Error("Failed to fetch task");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      const shouldDelete = window.confirm("Are you sure you want to delete?");
      if (!shouldDelete) {
        return;
      }
      const response = await fetch(`http://localhost:8080/api/v1/task/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        navigate("/");
      } else {
        throw new Error("Failed to delete task");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTask();
  }, [id]);
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
  if (!task) {
    return <div>Loading...</div>;
  }

  const { image, heading, date, description } = task[0];

  return (
    <main>
      <div>
        <div className="flex flex-col max-w-7xl mx-auto p-3 my-7 gap-4">
          <img
            className="w-full h-auto object-cover rounded-xl"
            src={`../../public/upload/${image}`}
            alt={image}
          />
          <p className="text-4xl font-semibold">{heading}</p>
          <p className="text-slate-800">
            <span className="font-semibold text-black">Description - </span>
            {description}
          </p>
          <div className="flex gap-5">
            <p className=" mt-1  text-slate-600 text-md">
              Date: {formatDate(date)}
            </p>
            <p className=" mt-1  text-slate-600 text-md">
              Time: {formatTime(date)}
            </p>
          </div>

          <div className="flex gap-4">
            <Link
              className="bg-[#33B89F] w-full max-w-[200px] text-white text-center p-1 rounded-md"
              to={`/update-task/${id}`}
            >
              <button>Edit</button>
            </Link>
            <button
              className="bg-red-600 w-full max-w-[200px] text-white text-center p-1 rounded-md"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SinglePage;
