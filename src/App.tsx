import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import ProjectsPage from "./ProjectsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/websites" element={<ProjectsPage />} />
        <Route path="/projects/games" element={<ProjectsPage />} />
        <Route path="/projects/other" element={<ProjectsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
