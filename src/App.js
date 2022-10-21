import logo from './logo.svg';
import './App.scss';
import Layout from './components/Layout/Layout';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Tournaments from './pages/Tournaments/Tournaments';
import Matches from './pages/Matches/Matches';
import IndexTournament from './pages/Tournament/IndexTournament';

const Pages = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Tournaments />} />
        <Route path="tournaments" element={<Tournaments />} />
        <Route path="new-tournament" element={<IndexTournament tournament={null} />} />
        <Route path="matches" element={<Matches />} />
      </Route>
    </Routes>
  )
};

function App() {
  const name = "partidos";
  return (
    <Router>
      <Layout >
        <Pages />
      </Layout>
    </Router>
  );
}

export default App;
