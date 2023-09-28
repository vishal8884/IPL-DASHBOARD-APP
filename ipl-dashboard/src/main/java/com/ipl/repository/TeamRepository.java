package com.ipl.repository;

import org.springframework.data.repository.CrudRepository;

import com.ipl.model.Team;

public interface TeamRepository extends CrudRepository<Team, Long>{

	Team findByTeamName(String teamName);
}
