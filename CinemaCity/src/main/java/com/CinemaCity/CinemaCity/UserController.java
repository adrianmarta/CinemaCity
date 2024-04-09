package com.CinemaCity.CinemaCity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.OptionalLong;

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
    public ResponseEntity<Optional<User>> findUserByEmail(@PathVariable String email){
        return new ResponseEntity<Optional<User>>(userService.singleUserByEmail(email),HttpStatus.OK);
    }
}
