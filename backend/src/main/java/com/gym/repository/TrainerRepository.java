package com.gym.repository;

import com.gym.entity.Specialization;
import com.gym.entity.Trainer;
import com.gym.entity.TrainerStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TrainerRepository extends JpaRepository<Trainer, Long> {
    Optional<Trainer> findByEmployeeId(String employeeId);
    Optional<Trainer> findByUserId(Long userId);
    List<Trainer> findByStatus(TrainerStatus status);
    
    @Query("SELECT t FROM Trainer t WHERE :specialization MEMBER OF t.specializations")
    List<Trainer> findBySpecialization(Specialization specialization);
    
    @Query("SELECT t FROM Trainer t WHERE t.status = 'ACTIVE'")
    List<Trainer> findActiveTrainers();
    
    @Query("SELECT COUNT(t) FROM Trainer t WHERE t.status = :status")
    long countByStatus(TrainerStatus status);
}