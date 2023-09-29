import {React, useEffect, useState} from 'react'
import { MatchDetailCard } from '../components/MatchDetailCard';
import { MatchSmallCard } from '../components/MatchSmallCard';

export const TeamPage = () => {
  const [team, setTeam] = useState({matches : []}); //{} is to initialize team with empty ..matches also
  const reptiles = ["alligator", "snake", "lizard"];

  useEffect(
    () => {
        const fetchMatches = async () => {
            const response = await fetch('http://localhost:8080/team/Chennai%20Super%20Kings');
            const data = await response.json();
            setTeam(data);
        }

        fetchMatches();
    } , []  //Reason for empty array is first param initializes only first time and when the code changes not every ti,e
    
  );


  return (
    <div className="TeamPage">
      <h1>{team.teamName}</h1>     
      <MatchDetailCard match = {team.matches[0]}/>
      

      {team.matches.slice(1).map(match => <MatchSmallCard match = {match} />)}   
      {/* Slice remove 1st entry */}

    </div>
  );
}

