package com.example.feedbackservice.service;

import com.example.feedbackservice.entity.Feedback;
import java.util.List;

public interface FeedbackService {
    Feedback saveFeedback(Feedback feedback);
    List<Feedback> getAllFeedback();
    Feedback updateFeedback(Long id, Feedback feedback);
    void deleteFeedback(Long id);
}
