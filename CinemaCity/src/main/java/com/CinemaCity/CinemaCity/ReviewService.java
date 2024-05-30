package com.CinemaCity.CinemaCity;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
@Service
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;
    @Autowired
    private PartyService partyService;
    @Autowired
    private UserService userService;
    public Optional<Review> getReview(ObjectId id){
        return reviewRepository.findReviewById(id);
    }
    @Transactional
    public Review createReview(Review review, ObjectId partyId) {
        Optional<User> reviewer = userService.getUserByEmail(review.getReviewer().getEmail());
        if(reviewer.isPresent()) {
            review.setReviewer(reviewer.get());
        } else {
            throw new IllegalStateException("The reviewer doesn't exist");
        }

        Optional<Party> party = partyService.getPartyById(partyId);
        if (party.isEmpty()) {
            throw new IllegalStateException("Can't find the party");
        } else {
            Review finalReview = reviewRepository.save(review);
            finalReview.setIdString(finalReview.getId().toHexString());
            party.get().getHostUser().getReviewId().add(finalReview.getIdString());
            userService.updateUser(party.get().getHostUser());
            return finalReview;
        }
    }
    public List<Review> getReviewsByUserEmail(String email) {
        return reviewRepository.findByReviewer_Email(email);
    }
}
