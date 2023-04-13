import React from "react";
import './styles/app.scss';
import Canvas from "./components/canvas";
import SettingBar from "./components/SettingBar";
import ToolBar from "./components/ToolBar";
import {createBrowserRouter,RouterProvider,redirect} from 'react-router-dom';


export default function App() {
  function loader({params}) {
    if(params.id === undefined) {
        return redirect(`/${(+new Date()).toString(16)}`);
    }
    return 'ok';
  }

  const router = createBrowserRouter([
    {
      path: '/:id?',
      loader: loader,
      element: <>
        <ToolBar/>
        <SettingBar/>
        <Canvas/>
      </>
    }
  ])

  return (
    <div className="app">
        <RouterProvider router={router} />
    </div>
  )
}