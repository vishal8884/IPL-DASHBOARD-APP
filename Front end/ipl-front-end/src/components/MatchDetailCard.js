import {React} from 'react'

export const MatchDetailCard = ({match}) => {
  if(!match) return null;  //If this is removed will get error

  return (
    <div className="MatchDetailCard">
      <h3>Latest matches</h3>
      <h4>Match Details</h4>
      <h4>{match.team1} vs {match.team2}</h4>
      
    </div>
  );
}

