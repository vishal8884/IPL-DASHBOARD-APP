import {React} from 'react'
import { Link } from 'react-router-dom';
import './MatchSmallCard.scss'

export const MatchSmallCard = ({teamName, match}) => {
  if(!match) return null; 
  const otherTeam = teamName === match.team1 ? match.team2 : match.team1;
  const otherTeamRoute = `/teams/${otherTeam}`
  const isMatchWon = teamName === match.matchWinner;
  
  return (
    <div className={isMatchWon ? 'MatchSmallCard won-card' : 'MatchSmallCard lost-card'}>
      <span className="vs">vs</span>

      <h1> 
        <Link to = {otherTeamRoute} > {otherTeam} </Link>
      </h1>

      <p className="match-result">
          {match.matchWinner} Won by {match.resultMargin} {match.result}
      </p>
      
    </div>
  );
}

