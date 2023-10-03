import { React, useEffect, useState } from "react";
import { MatchDetailCard } from "../components/MatchDetailCard";
import { MatchSmallCard } from "../components/MatchSmallCard";
import { useParams } from "react-router-dom";
import "./TeamPage.scss";
import { PieChart } from 'react-minimal-pie-chart';

export const TeamPage = () => {
  const [team, setTeam] = useState({ matches: [] }); //{} is to initialize team with empty ..matches also
  const { teamName } = useParams(); //we give const { } when we want a object ...for array we use const [ ]

  useEffect(
    () => {
      const fetchMatches = async () => {
        const response = await fetch(`http://localhost:8080/team/${teamName}`); //This teamName and line 8 teamName should be same as pathVariable placeholder name
        const data = await response.json();
        setTeam(data);
      };

      fetchMatches();
    },
    [teamName] //Reason for empty array is first param (fetchMatches) initializes only first time and when the code changes not every time (calls spring api)
    //update = we passed teamName ..first param initializes only first time and when teamName changes also (calls spring api)
  );

  if (!team || !team.teamName) return <h1>Team not found</h1>;

  return (
    <div className="TeamPage">
      <div className="team-name-section">
        <h1 className="team-name">{team.teamName}</h1>
      </div>
      <div 
          className="win-loss-section">Wins/Losses
          <PieChart
          data={[
               { title: 'Losses', value: team.totalMatches - team.totalWins, color: '#C13C37' },
               { title: 'Wins', value: team.totalWins, color: '#4DA375' },
          ]}
          />
      </div>

      

      <h3>Latest matches</h3>
      <div className="match-detail-section">
        <MatchDetailCard teamName={team.teamName} match={team.matches[0]} />
      </div>

      {team.matches.slice(1).map((match) => (
        <MatchSmallCard teamName={team.teamName} match={match} />
      ))}
      {/* Slice remove 1st entry */}

      <div className="more-link">
        <a href="#">More `{'<'}`</a>
      </div>
    </div>
  );
};
