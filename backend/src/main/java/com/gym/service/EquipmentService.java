package com.gym.service;

import com.gym.entity.Equipment;
import com.gym.entity.EquipmentStatus;
import com.gym.entity.EquipmentType;
import com.gym.repository.EquipmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
public class EquipmentService {
    
    @Autowired
    private EquipmentRepository equipmentRepository;
    
    public List<Equipment> getAllEquipment() {
        return equipmentRepository.findAll();
    }
    
    public Equipment getEquipmentById(Long id) {
        return equipmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Equipment not found with id: " + id));
    }
    
    public Equipment saveEquipment(Equipment equipment) {
        if (equipment.getSerialNumber() == null) {
            equipment.setSerialNumber(generateSerialNumber());
        }
        return equipmentRepository.save(equipment);
    }
    
    public void deleteEquipment(Long id) {
        equipmentRepository.deleteById(id);
    }
    
    public List<Equipment> getEquipmentByType(EquipmentType type) {
        return equipmentRepository.findByType(type);
    }
    
    public List<Equipment> getEquipmentByStatus(EquipmentStatus status) {
        return equipmentRepository.findByStatus(status);
    }
    
    public List<Equipment> getAvailableEquipment() {
        return equipmentRepository.findAvailableEquipment();
    }
    
    public List<Equipment> getEquipmentNeedingMaintenance() {
        return equipmentRepository.findEquipmentNeedingMaintenance(LocalDate.now());
    }
    
    private String generateSerialNumber() {
        return "EQ" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }
}