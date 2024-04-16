package com.CinemaCity.CinemaCity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

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
                return partyRepository.save(party);
            } else throw new ResponseStatusException(HttpStatus.NOT_FOUND, "The host doesn't exist!");
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }
    public void validateParty(Party party){
        if(party.getMax_participants()<=0)throw new RuntimeException("Maximum participants must be greater than 0!");
    }
}
