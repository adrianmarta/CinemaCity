package com.CinemaCity.CinemaCity;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:3000")

@RestController
@RequestMapping("/parties")
public class PartyController {
    @Autowired
    private PartyService partyService;
    @Autowired
    private UserService userService;
    @Autowired
    private FileUploadService fileUploadService;

    @GetMapping
    public ResponseEntity<List<Party>> getAllParties(){
        List<Party> parties = partyService.AllParties();
        for (Party party : parties) {
            party.setObjectIdString(party.getObjectId().toString());
        }
        return new ResponseEntity<>(parties, HttpStatus.OK);
    }
    @GetMapping("/user-parties/{email}")
    public ResponseEntity<List<Party>> getUserParties(@PathVariable String email){
        List<Party> parties = partyService.getPartiesByUser(email);
        for (Party party : parties) {
            party.setObjectIdString(party.getObjectId().toString());
        }
        return new ResponseEntity<>(parties, HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<Party> createParty(@RequestPart("party") Party party,
                                             @RequestPart(value = "image", required = false) MultipartFile image) {
        try {
            if (image != null && !image.isEmpty()) {
                party.setImages(new ArrayList<>());
                party.getImages().add(image.getBytes());
            }
            return new ResponseEntity<>(partyService.createParty(party), HttpStatus.CREATED);
        } catch (IOException e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/{partyId}")
    public ResponseEntity<Party> partyDetails(@PathVariable ObjectId partyId){
        //ObjectId objectId = new ObjectId(partyId);
        Optional<Party> optionalParty = partyService.getPartyById(partyId);
        if (optionalParty.isPresent()) {
            Party party = optionalParty.get();
            party.setObjectIdString(party.getObjectId().toString());
            return ResponseEntity.ok(party);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PostMapping("/join_party/{objectId}")
    public ResponseEntity<?> joinParty( @RequestBody JoinRequest joinRequest,  @PathVariable ObjectId objectId) {
        String s = "-->unable to join the user";
        try {
            Optional<User> existingUser = userService.getUserByEmail(joinRequest.getEmail());
            String goodie = joinRequest.getGoodie();
            Optional<Party> existingParty = partyService.getPartyById(objectId);
            if (existingUser.isEmpty()) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User with this mail: \"" + joinRequest.getEmail() + "\" not found :(");
            if(existingParty.isEmpty()) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Party not found");
            partyService.joinParty(existingParty.get(), existingUser.get(),goodie);
            return ResponseEntity.ok("User joined the party");
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage() + s);
        }
    }
    @PostMapping("/cancel-participation/{partyId}")
    public ResponseEntity<?> cancelParticipation(@PathVariable ObjectId partyId, @RequestBody User user) {
        try {
            Optional<User> participant = userService.getUserByEmail(user.getEmail());
            if(participant.isEmpty()){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User with this mail: \"" + user.getEmail() + "\" not found :(");
            }
            partyService.cancelParticipation(partyId, participant.get());
            return ResponseEntity.ok("Participation canceled");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error canceling participation: "+e.getMessage());
        }
    }
}