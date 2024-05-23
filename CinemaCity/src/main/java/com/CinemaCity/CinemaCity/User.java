package com.CinemaCity.CinemaCity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Document(collection = "users")
@Data
//@AllArgsConstructor
@NoArgsConstructor

public class User  {
    private String Name;
    private int age;
    private String gender;
    @Id
    private String email;
    private String password;
    @DocumentReference
    private List<Review> reviews;

    public User(String name, int age, String gender, String email, String password) {
        this.Name = name;
        this.age = age;

        this.gender = gender;
        this.email = email;
        this.password = password;

    }
}
