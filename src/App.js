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
import Register from "./pages/Register/Register";
import TermsAndConds from "./pages/Term&Conds/TermsAndConds";

const Pages = () => {
  return (
    <Routes>
      <Route path="/">
        <Route path="register" element={<Register/>} />
        <Route path="terms&conditions" element={<TermsAndConds/>} />
        <Route index element={<Tournaments />} />
        <Route path="tournaments" element={<Tournaments />} />
        <Route
          path="new-tournament"
          element={
            <Layout>
              <IndexTournament tournament={null} />
            </Layout>
          }
        />
        <Route
          path="tournaments/:tournamentId/matches"
          element={
            <Layout>
              <Matches />
            </Layout>
          }
        ></Route>
        <Route
          path="tournaments/:tournamentId/new-match"
          element={
            <Layout>
              <NewMatch />
            </Layout>
          }
        ></Route>
        <Route
          path="tournaments/:tournamentId/:matchId"
          element={
            <Layout>
              <Match />
            </Layout>
          }
        ></Route>
        <Route
          path="rankings"
          element={
            <Layout>
              <Rankings />
            </Layout>
          }
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
      <Pages/>
    </Router>
  );
}

export default App;
