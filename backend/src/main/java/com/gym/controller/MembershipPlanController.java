package com.gym.controller;

import com.gym.entity.MembershipPlan;
import com.gym.service.MembershipPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/membership-plans")
public class MembershipPlanController {
    
    @Autowired
    private MembershipPlanService membershipPlanService;
    
    @GetMapping
    public ResponseEntity<List<MembershipPlan>> getAllMembershipPlans() {
        List<MembershipPlan> plans = membershipPlanService.getAllMembershipPlans();
        return ResponseEntity.ok(plans);
    }
    
    @GetMapping("/active")
    public ResponseEntity<List<MembershipPlan>> getActiveMembershipPlans() {
        List<MembershipPlan> plans = membershipPlanService.getActiveMembershipPlans();
        return ResponseEntity.ok(plans);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<MembershipPlan> getMembershipPlanById(@PathVariable Long id) {
        MembershipPlan plan = membershipPlanService.getMembershipPlanById(id);
        return ResponseEntity.ok(plan);
    }
    
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<MembershipPlan> createMembershipPlan(@RequestBody MembershipPlan plan) {
        MembershipPlan savedPlan = membershipPlanService.saveMembershipPlan(plan);
        return ResponseEntity.ok(savedPlan);
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<MembershipPlan> updateMembershipPlan(@PathVariable Long id, @RequestBody MembershipPlan plan) {
        plan.setId(id);
        MembershipPlan updatedPlan = membershipPlanService.saveMembershipPlan(plan);
        return ResponseEntity.ok(updatedPlan);
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteMembershipPlan(@PathVariable Long id) {
        membershipPlanService.deleteMembershipPlan(id);
        return ResponseEntity.ok().build();
    }
}