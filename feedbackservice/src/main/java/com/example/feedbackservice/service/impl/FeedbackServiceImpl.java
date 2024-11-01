package com.example.feedbackservice.service.impl;

import com.example.feedbackservice.entity.Feedback;
import com.example.feedbackservice.repository.FeedbackRepository;
import com.example.feedbackservice.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackServiceImpl implements FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Override
    public Feedback saveFeedback(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }

    @Override
    public List<Feedback> getAllFeedback() {
        return feedbackRepository.findAll();
    }

    @Override
    public Feedback updateFeedback(Long id, Feedback feedback) {
        Feedback existingFeedback = feedbackRepository.findById(id).orElseThrow(() -> new RuntimeException("Feedback not found"));
        existingFeedback.setName(feedback.getName());
        existingFeedback.setEmail(feedback.getEmail());
        existingFeedback.setFeedback(feedback.getFeedback());
        return feedbackRepository.save(existingFeedback);
    }

    @Override
    public void deleteFeedback(Long id) {
        feedbackRepository.deleteById(id);
    }
}
