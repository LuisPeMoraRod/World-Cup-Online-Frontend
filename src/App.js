import { useEffect } from "react";
import logo from "./logo.svg";
import "./App.scss";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import Layout from "./components/Layout/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Tournaments from "./pages/Tournaments/Tournaments";
import Matches from "./pages/Matches/Matches";
import Match from "./pages/Match/Match";
import IndexTournament from "./pages/NewTournament/IndexTournament";
import { useDispatch, useSelector } from "react-redux";
import { fetchCatalogs } from "./store/slices/catalogs/actions";
import { useIsMount } from "./hooks/useIsMount";
import NewMatch from "./pages/NewMatch/NewMatch";
import LogIn from "./pages/LogIn/LogIn";
import { selectUser } from "./store/slices/user/userSlice";
import LayoutNew from "./components/LayoutNew/LayoutNew";
import Register from "./pages/Register/Register";
import TermsAndConds from "./pages/Term&Conds/TermsAndConds";
import Rankings from "./pages/Rankings/Rankings"

const Pages = () => {
  return (

    <>
      <Route index element={<Layout><Tournaments /></Layout>} />
      <Route path="tournaments" element={<Layout>
        <Tournaments />
      </Layout>} />
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
    </>
  );
};


function App() {
  const isMount = useIsMount(); // hook to check if component has been mounted (rendered once)
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCatalogs()); //fetch all catalogs data from API
  }, []);

  return (
    <Routes>
      <Route path="/" element={<LayoutNew />}>
        {/* public routes */}
        <Route path="logIn" element={<LogIn />} />
        <Route path="register" element={<Register />} />
        <Route path="terms&conditions" element={<TermsAndConds />} />
        {/* protected admin routes */}
        <Pages />
      </Route>
    </Routes>

  );
}

export default App;
