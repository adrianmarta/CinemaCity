package com.CinemaCity.CinemaCity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PartyService {

    @Autowired
    public PartyRepository partyRepository;

    public List<Party> AllParties(){
        return partyRepository.findAll();
    }
    public Party createParty (Party party){return partyRepository.save(party);}
}
