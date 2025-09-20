package com.gym.service;

import com.gym.entity.Trainer;
import com.gym.entity.TrainerStatus;
import com.gym.repository.TrainerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class TrainerService {
    
    @Autowired
    private TrainerRepository trainerRepository;
    
    public List<Trainer> getAllTrainers() {
        return trainerRepository.findAll();
    }
    
    public Trainer getTrainerById(Long id) {
        return trainerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Trainer not found with id: " + id));
    }
    
    public Trainer saveTrainer(Trainer trainer) {
        if (trainer.getEmployeeId() == null) {
            trainer.setEmployeeId(generateEmployeeId());
        }
        return trainerRepository.save(trainer);
    }
    
    public void deleteTrainer(Long id) {
        trainerRepository.deleteById(id);
    }
    
    public List<Trainer> getTrainersByStatus(TrainerStatus status) {
        return trainerRepository.findByStatus(status);
    }
    
    public List<Trainer> getActiveTrainers() {
        return trainerRepository.findActiveTrainers();
    }
    
    public boolean isOwner(Long trainerId, String username) {
        Trainer trainer = getTrainerById(trainerId);
        return trainer.getUser().getUsername().equals(username);
    }
    
    private String generateEmployeeId() {
        return "TR" + UUID.randomUUID().toString().substring(0, 6).toUpperCase();
    }
}