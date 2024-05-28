package com.CinemaCity.CinemaCity;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.server.ResponseStatusException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@CrossOrigin(origins = "http://localhost:3000")

public class PartyService {
    private static final Logger logger = LoggerFactory.getLogger(PartyService.class);

    @Autowired
    private PartyRepository partyRepository;
    @Autowired
    private UserService userService;

    public List<Party> AllParties(){
        return partyRepository.findAll();
    }
    public Party createParty(Party party) {
        validateParty(party);
        try {
            if (party.getHostUser() != null) {
                Optional<User> optionalHost = userService.getUserByEmail(party.getHostUser().getEmail());
                if (optionalHost.isPresent()) {
                    party.setHostUser(optionalHost.get());
                    party.setJoined_participants(new ArrayList<>());
                    return partyRepository.save(party);
                } else {
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "The host doesn't exist!");
                }
            } else {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Host user must be set!");
            }
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
    public void joinParty(Party party, User user, String goodie) {
        logger.info("Attempting to join user {} to party {}", user.getEmail(), party.getObjectId());
        logger.debug("Party before joining: {}", party);

        if (party.getJoined_participants() != null && party.getJoined_participants().contains(user)) {
            throw new IllegalStateException("User already joined");
        }
        if (party.getHostUser().equals(user)) {
            throw new IllegalStateException("You are the host and you can't join as a new outside participant");
        }

        assert party.getJoined_participants() != null;
        party.getJoined_participants().add(user);

        if (goodie != null && !goodie.isEmpty()) {
            List<String> goodies = party.getGoodies() != null ? party.getGoodies() : new ArrayList<>();
            goodies.add(goodie);
            party.setGoodies(goodies);
            logger.info("Added goodie {} to party {}", goodie, party.getObjectId());
        }

        partyRepository.save(party);

        logger.info("User {} joined to party {}", user.getEmail(), party.getObjectId());
        logger.debug("Party after joining: {}", party);
    }
    public List<Party> getPartiesByUser(String email){
        List<Party> allParties = partyRepository.findAll();
        List<Party> userParties = new ArrayList<>();
        for (Party party : allParties) {
            if (party.getJoined_participants().stream().anyMatch(user -> user.getEmail().equals(email))) {
                userParties.add(party);
            }
        }
        return userParties;
    }

   /* public void leaveReview(ObjectId partyId, String review) {
        Optional<Party> optionalParty = partyRepository.findPartyByObjectId(partyId);
        if (optionalParty.isPresent()) {
            Party party = optionalParty.get();
            // Assume Party class has a reviews field
            if (party.getReviews() == null) {
                party.setReviews(new ArrayList<>());
            }
            party.getReviews().add(review);
            partyRepository.save(party);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Party not found");
        }
    }*/
    public void cancelParticipation(ObjectId partyId, String email) {
        Optional<Party> optionalParty = partyRepository.findPartyByObjectId(partyId);
        if (optionalParty.isPresent()) {
            Party party = optionalParty.get();
            party.getJoined_participants().removeIf(user -> user.getEmail().equals(email));
            partyRepository.save(party);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Party not found");
        }
    }

}
