import {React, useEffect, useState} from 'react'
import { MatchDetailCard } from '../components/MatchDetailCard';
import { MatchSmallCard } from '../components/MatchSmallCard';
import { useParams } from 'react-router-dom';
import './MatchPage.scss'
import { YearSelector } from '../components/YearSelector';

export const MatchPage = () => {

  const[matches,setMatches] = useState([]);
  const {teamName,year} = useParams();

  useEffect(
    () => {
        const fetchMatches = async () => {
            const response = await fetch(`http://localhost:8080/team/${teamName}/matches?year=${year}`);  //This teamName and line 8 teamName should be same as pathVariable placeholder name
            const data = await response.json();

            console.log(data)
            setMatches(data);
        }
 
        fetchMatches();
    } , 
    [teamName,year]  //Reason for empty array is first param (fetchMatches) initializes only first time and when the code changes not every time (calls spring api)
                //update = we passed teamName ..first param initializes only first time and when teamName changes also (calls spring api)
                //if we dont put this then it will be infinite loop
    
  );

  

  return (
    <div className="MatchPage"> 
      <div className="year-selector">
        <h3>Select Year</h3>
          <YearSelector teamName = {teamName}/> 
      </div>
      <div>
          <h1 className="page-heading">{teamName} matches in year {year}</h1>
          {
              matches.map(match => <MatchDetailCard teamName = {teamName} match = {match} />)
          } 
      </div>
    </div>
  );
}



//http://localhost:8080/Chennai Super Kings/matches/2019