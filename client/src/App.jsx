import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<AuthPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
