package com.gym.service;

import com.gym.entity.MembershipPlan;
import com.gym.repository.MembershipPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MembershipPlanService {
    
    @Autowired
    private MembershipPlanRepository membershipPlanRepository;
    
    public List<MembershipPlan> getAllMembershipPlans() {
        return membershipPlanRepository.findAll();
    }
    
    public List<MembershipPlan> getActiveMembershipPlans() {
        return membershipPlanRepository.findActivePlans();
    }
    
    public MembershipPlan getMembershipPlanById(Long id) {
        return membershipPlanRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Membership plan not found with id: " + id));
    }
    
    public MembershipPlan saveMembershipPlan(MembershipPlan plan) {
        return membershipPlanRepository.save(plan);
    }
    
    public void deleteMembershipPlan(Long id) {
        membershipPlanRepository.deleteById(id);
    }
}