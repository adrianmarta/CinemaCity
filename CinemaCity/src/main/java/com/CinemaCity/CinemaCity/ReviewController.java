package com.CinemaCity.CinemaCity;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("http://localhost:3000/review")
@RestController
@RequestMapping("/review")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;
    @GetMapping("/{id}")
    public ResponseEntity<Review> getReview(@PathVariable ObjectId id) {
        Optional<Review> review = reviewService.getReview(id);
        return review.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
    @GetMapping("/user/{email}")
    public ResponseEntity<List<Review>> getReviewsByUserEmail(@PathVariable String email) {
        List<Review> reviews = reviewService.getReviewsByUserEmail(email);
        if (reviews.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(reviews, HttpStatus.OK);
    }
    @PostMapping("/{partyId}")
    public ResponseEntity<?> createReview(@RequestBody Review review, @PathVariable ObjectId partyId){
        try{
            Review review1 = reviewService.createReview(review, partyId);
            return new ResponseEntity<>(review1, HttpStatus.CREATED);
        }catch(IllegalStateException e){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

}
