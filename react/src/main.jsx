import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import router from "./router.jsx";
import {RouterProvider} from "react-router-dom";
import {ContextProvider} from "./contexts/ContextProvider.jsx";
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev/index.js";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ContextProvider>
            <DevSupport ComponentPreviews={ComponentPreviews}
                        useInitialHook={useInitial}
            >
                <RouterProvider router={router}/>
            </DevSupport>

        </ContextProvider>
    </React.StrictMode>,
)
