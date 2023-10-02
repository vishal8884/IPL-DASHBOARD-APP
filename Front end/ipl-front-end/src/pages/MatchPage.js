import {React, useEffect, useState} from 'react'
import { MatchDetailCard } from '../components/MatchDetailCard';
import { MatchSmallCard } from '../components/MatchSmallCard';
import { useParams } from 'react-router-dom';

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
    []  //Reason for empty array is first param (fetchMatches) initializes only first time and when the code changes not every time (calls spring api)
                //update = we passed teamName ..first param initializes only first time and when teamName changes also (calls spring api)
    
  );

  

  return (
    <div className="MatchPage">
      <h1>Match Page</h1>     

      {/* <MatchDetailCard teamName = {teamName} match = {matches[0]}/> */}
      <h2></h2>
      {
          matches.map(match => <MatchDetailCard teamName = {teamName} match = {match} />)
      } 
      
    </div>
  );
}



//http://localhost:8080/Chennai Super Kings/matches/2019