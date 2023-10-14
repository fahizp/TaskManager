import Header from "./components/Header";
import Home from "./pages/Home";
import { BrowserRouter, Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import CreateTask from "./pages/CreateTask";
import SinglePage from './pages/SinglePage';
import UpdateTask from "./components/UpdateTask"; 

const App = () => {
  return (
    <>
   <BrowserRouter>
    <Header />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/create-task' element={<CreateTask />} />
      <Route path='/update-task/:id' element={<UpdateTask />}/>
      <Route path='/task/:id' element={<SinglePage />} />

    </Routes>
  </BrowserRouter>
    </>
  );
};

export default App;
