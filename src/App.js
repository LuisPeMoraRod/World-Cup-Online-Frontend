import { useEffect } from "react";
import logo from "./logo.svg";
import "./App.scss";
import Layout from "./components/Layout/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Tournaments from "./pages/Tournaments/Tournaments";
import Matches from "./pages/Matches/Matches";
import IndexTournament from "./pages/NewTournament/IndexTournament";
import { useDispatch } from "react-redux";
import { fetchCatalogs } from "./store/slices/catalogs/actions";
import { useIsMount } from "./hooks/useIsMount";
import NewMatch from "./pages/NewMatch/NewMatch";

const Pages = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Tournaments />} />
        <Route path="tournaments" element={<Tournaments />} />
        <Route
          path="new-tournament"
          element={<IndexTournament tournament={null} />}
        />
        {/* <Route path="matches" element={<Matches />} /> */}
        <Route
          path="tournaments/:tournamentId/matches"
          element={<Matches />}
        ></Route>
        <Route
          path="tournaments/:tournamentId/new-match"
          element={<NewMatch />}
        ></Route>
      </Route>
    </Routes>
  );
};

function App() {
  const isMount = useIsMount(); // hook to check if component has been mounted (rendered once)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCatalogs()); //fetch all catalogs data from API
  }, []);

  return (
    <Router>
      <Layout>
        <Pages />
      </Layout>
    </Router>
  );
}

export default App;
