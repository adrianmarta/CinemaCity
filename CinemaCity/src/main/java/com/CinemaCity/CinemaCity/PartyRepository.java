package com.CinemaCity.CinemaCity;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PartyRepository extends MongoRepository<Party, ObjectId> {
    Optional<Party> findPartyByObjectId(ObjectId objectId);
}
