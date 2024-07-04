import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Layout from "./layouts/Layout.jsx";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route exact path="/" element={<Index />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
