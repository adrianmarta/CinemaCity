package com.CinemaCity.CinemaCity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.List;

@Document(collection = "users")
@Data
//@AllArgsConstructor
@NoArgsConstructor
public class User {
    private String Name;
    private int age;
    private char gender;
    @Id
    private String email;
    private String password;
    @DocumentReference
    private List<Reviews> reviews;
    public User(String name, int age, char gender, String email, String password)
    {
        this.Name=name;
        this.age=age;
        this.email=email;
        this.gender=gender;
        this.password=password;

    }
}
