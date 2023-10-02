import "./App.css";
import { MatchPage } from "./pages/MatchPage";
import { TeamPage } from "./pages/TeamPage";
import {BrowserRouter,Routes,Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path = "/teams/:teamName" element = {<TeamPage/>}/>
          </Routes>
          <Routes>
            <Route path = "/teams/:teamName/matches/:year" element = {<MatchPage/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

