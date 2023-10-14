import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const CreateTask = () => {
  const navigate = useNavigate();

  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [priority, setPriority] = useState("High");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleImageSubmit = async () => {
    if (file) {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file[0]);
  
      try {
        const response = await fetch("http://localhost:8080/api/v1/upload", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        setImage(data); 
        setUploading(false);
      } catch (error) {
        console.error("Error uploading image:", error);
        setUploading(false);
      }
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (heading && description && image && priority) {
      const form = {
        heading,
        description,
        image,
        priority,
        date: currentDateTime.toISOString(),
      };
      console.log(form);
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/api/v1/task", {
          method: "POST",
          body: JSON.stringify(form), 
          headers: {
            'Content-Type': 'application/json' 
          }
        });
  
        await response.json();
        alert("Success");
        navigate("/");
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please update with proper details");
    }
  }
  const handleRemoveImage = () => {
    setImage("")
  }
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 flex-1">
      <input
        type="text"
        placeholder="Heading"
        className="border p-3 rounded-lg"
        id="heading"
        name="heading"
        maxLength="62"
        minLength="10"
        required
        onChange={(e) => setHeading(e.target.value)} 
      />
      <textarea
        type="text"
        placeholder="Description"
        className="border p-3 rounded-lg"
        id="description"
        name="description"
        required
        onChange={(e) => setDescription(e.target.value)} // Corrected onChange usage
      />
      <div>
        <p className="font-semibold">Select Priority:</p>
        <select
          className="block w-auto py-4 px-4 border rounded-lg shadow-sm"
          onChange={(e) => setPriority(e.target.value)} // Corrected onChange usage
          name="priority"
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
    </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Date:
            <span className="font-normal text-gray-600 ml-1">
              {currentDateTime.toLocaleDateString()}
            </span>{" "}
            Time:
            <span className="font-normal text-gray-600 ml-1">
              {currentDateTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </p>
          <div className="flex gap-4">
            <input
              onChange={(e) => setFile(e.target.files)}
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              id="images"
              name="image"
              accept="image/*"
              multiple
            />
            <button
              type="button"
              disabled={uploading}
              onClick={handleImageSubmit}
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          {image !== "" && (
  <div className='flex justify-between p-3 border items-center'>
    <img
      src={`../../public/upload/${image}`}
      alt='listing image'
      className='w-20 h-20 object-contain rounded-lg'
    />
    <button
      type='button'
      onClick={handleRemoveImage}
      className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
    >
      Delete
    </button>
  </div>
)}
          <button
            disabled={loading || uploading}
            className="p-3 bg-[#33B89F] text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Creating..." : "Create task"}
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateTask;
