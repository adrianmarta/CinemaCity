package com.CinemaCity.CinemaCity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection= "party")
@AllArgsConstructor
@NoArgsConstructor
public class Party {
    @Id
    private String party_planer_name, film_name, description, location, restrictions;
    private List<String> goodies;
    private int max_participants;
    private User hostUser;
    private List<User> joined_participants;

    //private location?

}
