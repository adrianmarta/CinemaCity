package com.CinemaCity.CinemaCity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Document(collection = "users")
@Getter
@Setter
public class User implements UserDetails {
    private String name;
    private int age;
    private String gender;
    @Id
    private String email;
    private String password;
    private List<String> reviewId;


    public User(String name, int age, String gender, String email, String password) {
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.email = email;
        this.password = password;
    }

    // Getters and Setters
    // ... (existing getters and setters)

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
