import { Link } from 'react-router-dom';

export default function ListingItem({ task }) {
  const formatDate = (dateTime) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return new Date(dateTime).toLocaleString(undefined, options);
  };

  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
      <Link to={`/task/${task.id}`}>
        <img
          src={`../../public/upload/${task.image}`}
          alt='listing cover'
          className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
        />
        <div className='p-3 flex flex-col gap-2 w-full'>
          <p className='truncate text-lg font-semibold text-slate-700'>{task.heading}</p>
          <div className='flex items-center gap-1'>
            <p className='text-sm text-gray-600 truncate w-full'>{formatDate(task.date)}</p>
          </div>
          <p className='text-sm text-gray-600 line-clamp-2'>{task.description}</p>
          <div className='border border-gray-300 w-9'>
          <p className='text-sm text-gray-600 line-clamp-2 '>{task.priority}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

