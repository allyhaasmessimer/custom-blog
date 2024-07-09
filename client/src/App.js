import "./App.css";
// import Post from "./Post";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import EditPost from "./pages/EditPost";
import { UserContextProvider } from "./UserContext";
import Post from "./Post";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";

function App() {
    return (
        <UserContextProvider>
            {" "}
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<IndexPage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/create" element={<CreatePost />} />
                    <Route path="/post/:id" element={<PostPage />} />
                    <Route path="/edit/:id" element={<EditPost />} />
                    <Route path="/about" element={<AboutPage />} />
                </Route>
            </Routes>{" "}
        </UserContextProvider>
    );
}

export default App;
