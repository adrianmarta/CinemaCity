package com.CinemaCity.CinemaCity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.ArrayList;
import java.util.List;

@Data
@Document(collection= "party")
@AllArgsConstructor
@NoArgsConstructor
public class Party {
    @Id
    private ObjectId objectId;
    private String objectIdString;
    private String party_planer_name;
    private String film_name, description, location, restrictions;
    private List<String> goodies;
    private int max_participants;
    @DocumentReference
    private User hostUser;
    @DocumentReference
    private List<User> joined_participants;
    private List<String> imageUrls;

    //private location?

}
