import logo from './logo.svg';
import './App.scss';
import Layout from './components/Layout/Layout';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DataLoad from './pages/DataLoad/DataLoad';
import Clients from './pages/Clients/Clients';
import Products from './pages/Products/Products';
import Purchases from './pages/Purchases/Purchases';
import Queries from './pages/Queries/Queries';


const Pages = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<DataLoad />} />
        <Route path="data-load" element={<DataLoad />} />
        <Route path="clients" element={<Clients />} />
        <Route path="products" element={<Products />} />
        <Route path="purchases" element={<Purchases />} />
        <Route path="queries" element={<Queries />} />
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
