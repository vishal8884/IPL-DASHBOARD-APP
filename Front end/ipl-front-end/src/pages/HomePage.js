import { React, useEffect, useState } from "react";
import { MatchDetailCard } from "../components/MatchDetailCard";
import { MatchSmallCard } from "../components/MatchSmallCard";
import { useParams,Link } from "react-router-dom";
import "./HomePage.scss";
import { PieChart } from 'react-minimal-pie-chart';
import { TeamTile } from "../components/TeamTile";

export const HomePage = () => {
  const [teams, setTeam] = useState([]); //{} is to initialize team with empty 

  useEffect(
    () => {
      const fetchAllTeams = async () => {
        const response = await fetch(`http://localhost:8080/teams`); 
        const data = await response.json();
        setTeam(data);
      };

      fetchAllTeams();
    },
    [] 
  );


  return (
    <div className="HomePage">
      <div className="header-section">
        <h1 className="app-name">IPL Dashboard</h1>
      </div>
      <div className="team-grid">
          {teams.map(team => <TeamTile teamName = {team.teamName}/>)}
      </div>
    </div>
  );
};
