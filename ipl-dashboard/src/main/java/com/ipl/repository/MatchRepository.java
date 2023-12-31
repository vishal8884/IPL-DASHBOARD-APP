package com.ipl.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.ipl.model.Match;

public interface MatchRepository extends CrudRepository<Match, Long>{

	@Query(nativeQuery = true,value = "select * from Match where team1 = ?1 or team2 = ?1 order by date desc")
	public List<Match> findByTeamName(String teamName,Pageable pageable);
	
	public List<Match> findByTeam1OrTeam2OrderByDateDesc(String team1,String team2,Pageable pageable);  //same as above
	
	@Query(nativeQuery = true, value = "Select * from Match where (team1 = ?1 or team2 = ?1) and date between ?2 AND ?3 order by date desc")
	public List<Match> findMatchesByTeamBetweenDates(String teamName,LocalDate date1,LocalDate date2);
	//public List<Match> findByTeam1OrTeam2AndDateBetweenOrderByDateDesc(String teamName1,String teamName2, LocalDate date1,LocalDate date2);
	
	default List<Match> findLatestMatchesByTeam(String teamName,int count){
		return findByTeam1OrTeam2OrderByDateDesc(teamName, teamName, PageRequest.of(0, count));
	}
}
