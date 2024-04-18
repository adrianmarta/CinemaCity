package com.CinemaCity.CinemaCity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.OptionalLong;
@CrossOrigin("http://localhost:3000/signin")
@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers()
    {
        return new ResponseEntity<List<User>>(userService.AllUsers(), HttpStatus.OK);
    }
    @PostMapping()
    public ResponseEntity<User> createUser(@RequestBody User user) {
        Optional<User> existingUser = userService.singleUserByEmail(user.getEmail());
        if(existingUser.isPresent()){
            throw new ResponseStatusException(HttpStatus.CONFLICT,"The email already exists!");
        }
        else {
            User newUser = userService.createUser(user);
            return new ResponseEntity<>(newUser, HttpStatus.CREATED);}
    }
    @GetMapping("/{SignIn}")
    public ResponseEntity<Optional<User>> findUserByEmail(@PathVariable String SignIn){
        return new ResponseEntity<Optional<User>>(userService.singleUserByEmail(SignIn),HttpStatus.OK);
    }
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        Optional<User> existingUser = userService.singleUserByEmail(loginRequest.getEmail());
        if (existingUser.isPresent()) {
            User user = existingUser.get();
            if (user.getPassword().equals(loginRequest.getPassword())) {
                // Passwords match, login successful
                return ResponseEntity.ok("Login successful");
            } else {
                // Passwords don't match, login failed
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect password");
            }
        } else {
            // User with provided email not found
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }
   /* @PostMapping()
    public ResponseEntity<?> joinParty(@RequestBody LoginRequest loginRequest, @RequestBody Party party){
        Optional<User> existingUser=userService.singleUserByEmail(loginRequest.getEmail());
        if(existingUser.isPresent()){
            userService.joinParty(party, existingUser.get());
            return ResponseEntity.ok("User found and joined the party");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
    }*/
}

