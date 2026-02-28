import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./index.css";
import {MantineProvider} from "@mantine/core";
import {BrowserRouter} from "react-router-dom";
import App from "./App.tsx";
import "@mantine/core/styles.css";
import {Notifications} from "@mantine/notifications";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <MantineProvider defaultColorScheme="light">
            <Notifications position={"top-right"} />
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </MantineProvider>
    </StrictMode>,
);
