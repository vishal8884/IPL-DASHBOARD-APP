package com.ipl.data;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.core.BatchStatus;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.JobExecutionListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ipl.model.Team;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

@Component
public class JobCompletionNotificationListener implements JobExecutionListener {

  private static final Logger log = LoggerFactory.getLogger(JobCompletionNotificationListener.class);

  private final EntityManager em;

  @Autowired
  public JobCompletionNotificationListener(EntityManager em) {
    this.em = em;
  }

  @Override
  @Transactional
  public void afterJob(JobExecution jobExecution) {
    if(jobExecution.getStatus() == BatchStatus.COMPLETED) {
      log.info("!!! JOB FINISHED! Time to verify the results");
      Map<String, Team> teamData = new HashMap<>();  //key = teamName   value = Team obj
      
      //1) for each teamName populate total matches and wins
      em.createQuery("select m.team1,count(*) from Match m group by m.team1",Object[].class)   
      .getResultList()   //retursn List<Object[]>  where obj[0] = team name  obj[1] = totalCountOfTeam1
      .stream()
      .map(res -> new Team((String)res[0], (long)res[1])) //return Team obj
      .forEach(team -> teamData.put(team.getTeamName(), team));
      
      em.createQuery("select m.team2,count(*) from Match m group by m.team2",Object[].class)
      .getResultList()
      .stream()
      .forEach(obj -> { //Object[]
    	  Team team = teamData.get((String)obj[0]);
    	  team.setTotalMatches(team.getTotalMatches() + (long)obj[1]);   
      });
      
      em.createQuery("select m.matchWinner, count(*) from Match m group by m.matchWinner",Object[].class)
      .getResultList()
      .stream()
      .forEach(obj -> { //Object[]
    	  Team team = teamData.get((String)obj[0]);
    	  
    	  if(null != team)  //handles NA/draw case
    		  team.setTotalWins((long)obj[1]);
    	  
      });
      
      //2) Save the team objects in DB
      teamData.values().forEach(team -> em.persist(team));
      
      //3) just printing purpose
      teamData.values().stream().sorted((a,b) -> {
    	  if(a.getTotalWins() > b.getTotalWins()) return 1;
    	  else return -1;
      }).forEach(e -> System.out.println(e));
      
    }
  }
}




