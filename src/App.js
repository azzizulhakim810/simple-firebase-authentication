import './App.css';
import app from './firebase.init';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './components/Layout/Main';
import Register from './components/Register/Register';
import Login from './components/Login/Login';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Main>0</Main>,
    children: [
    {
      path:'/',
      element:<Register></Register>,
    },
    {
      path:'/register',
      element:<Register></Register>,
    },
    {
      path:'/login',
      element:<Login></Login>
    }
  ],
} 
])

function App() {

  

  return (

    <div>

      <div>
      <RouterProvider router={router}></RouterProvider>
      </div>
      
    </div>
    


  );
}

export default App;
