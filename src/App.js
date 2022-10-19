import logo from './logo.svg';
import './App.scss';
import Layout from './components/Layout/Layout';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Tournaments from './pages/Tournaments/Tournaments';

const Pages = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Tournaments />} />
        <Route path="tournaments" element={<Tournaments />} />
      </Route>
    </Routes>
  )
};

function App() {
  return (
    <Router>
      <Layout>
        <Pages />
      </Layout>
    </Router>
  );
}

export default App;
