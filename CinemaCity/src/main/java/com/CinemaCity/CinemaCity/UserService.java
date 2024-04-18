package com.CinemaCity.CinemaCity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> AllUsers() {
        return userRepository.findAll();
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public Optional<User> singleUserByEmail(String email) {
        return userRepository.findUserByEmail(email);
    }
    @Transactional
    public void joinParty(Party party,User user){
        if(party == null) throw new IllegalArgumentException("Party doesn't exist");
        if(party.getJoined_participants() != null && party.getJoined_participants().contains(user))
            throw new IllegalStateException("User already joined");
        party.getJoined_participants().add(user);
    }
}