
package com.CinemaCity.CinemaCity;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User,String> {
     Optional<User> findUserByEmail(String email);
}
