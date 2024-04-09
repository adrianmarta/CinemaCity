package com.CinemaCity.CinemaCity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public ResponseEntity<Party> createParty(@RequestBody Party party){
        return new ResponseEntity<>(partyService.createParty(party), HttpStatus.CREATED);}
}
