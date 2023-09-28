package com.ipl.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Team {

	@Id
	private long id;
	private String teamName;
	private long totalMatches;
	private long totalWins;
	
	
	
}
