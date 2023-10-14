import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const SinglePage = () => {
  const [task, setTask] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchTask = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/task/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        setTask(result); 
      } else {
        throw new Error('Failed to fetch task');
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleDelete = async () => {
    try {
      const shouldDelete = window.confirm('Are you sure you want to delete?');
      if (!shouldDelete) {
        return;
      }
      const response = await fetch(`http://localhost:8080/api/v1/task/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        navigate('/');
      } else {
        throw new Error('Failed to delete task');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTask();
  }, [id]);

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
          <p className="flex items-center mt-1 gap-2 text-slate-600 text-sm">
            {date}
          </p>
          <p className="text-slate-800">
            <span className="font-semibold text-black">Description - </span>
            {description}
          </p>
          <div className="flex gap-4">
            <Link className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md" to={`/update-task/${id}`}>
              <button >
                Edit
              </button>
            </Link>
            <button
              className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md"
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
