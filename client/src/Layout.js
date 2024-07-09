import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import "./App.css";

export default function Layout() {
    return (
        <>
            <Navbar />
            <div className="content">
                <main>
                    <Outlet />
                </main>
            </div>
        </>
    );
}
