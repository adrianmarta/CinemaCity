package com.CinemaCity.CinemaCity;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PartyService {

    @Autowired
    public PartyRepository partyRepository;
    @Autowired
    private UserService userService;

    public List<Party> AllParties(){
        return partyRepository.findAll();
    }
    public Party createParty (Party party) {
        Optional<User> optionalHost = userService.singleUserByEmail(party.getHostUser().getEmail());
        validateParty(party);
        try {
            if (optionalHost.isPresent()) {
                party.setHostUser(optionalHost.get());
                party.setJoined_participants(new ArrayList<>());
                return partyRepository.save(party);
            } else throw new ResponseStatusException(HttpStatus.NOT_FOUND, "The host doesn't exist!");
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }
    private void validateParty(Party party){
        if(party.getMax_participants()<=0)throw new RuntimeException("Maximum participants must be greater than 0!");
    }
    public Optional<Party> getPartyById(ObjectId partyId){
        return partyRepository.findPartyByObjectId(partyId);
    }
    @Transactional
    public void joinParty(Party party,User user){
        //System.out.println("Attempting to join user " + user.getEmail() + " to party " + party.getObjectId());
        //System.out.println("Party before joining: " + party);
        if(party.getJoined_participants() != null && party.getJoined_participants().contains(user))
            throw new IllegalStateException("User already joined");
        party.getJoined_participants().add(user);
        partyRepository.save(party);
    }
}
