package com.CinemaCity.CinemaCity;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;
@CrossOrigin("http://localhost:3000/parties")
@RestController
@RequestMapping("/parties")
public class PartyController {
    @Autowired
    private PartyService partyService;
    @GetMapping
    public ResponseEntity<List<Party>> getAllParties(){
        return new ResponseEntity<>(partyService.AllParties(), HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<Party> createParty( @RequestBody Party party){
        return new ResponseEntity<>(partyService.createParty(party), HttpStatus.CREATED);}
    @GetMapping("/{partyId}")
    public ResponseEntity<Party> partyDetails(@PathVariable ObjectId partyId){
        //ObjectId objectId = new ObjectId(partyId);
        Optional<Party> p = partyService.getPartyById(partyId);
        return p.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
