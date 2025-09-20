package com.gym.repository;

import com.gym.entity.Equipment;
import com.gym.entity.EquipmentStatus;
import com.gym.entity.EquipmentType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface EquipmentRepository extends JpaRepository<Equipment, Long> {
    Optional<Equipment> findBySerialNumber(String serialNumber);
    List<Equipment> findByType(EquipmentType type);
    List<Equipment> findByStatus(EquipmentStatus status);
    List<Equipment> findByLocation(String location);
    
    @Query("SELECT e FROM Equipment e WHERE e.nextMaintenanceDate <= :date")
    List<Equipment> findEquipmentNeedingMaintenance(LocalDate date);
    
    @Query("SELECT e FROM Equipment e WHERE e.status = 'AVAILABLE'")
    List<Equipment> findAvailableEquipment();
    
    @Query("SELECT COUNT(e) FROM Equipment e WHERE e.status = :status")
    long countByStatus(EquipmentStatus status);
    
    @Query("SELECT COUNT(e) FROM Equipment e WHERE e.type = :type")
    long countByType(EquipmentType type);
}