package com.gym.repository;

import com.gym.entity.MembershipPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MembershipPlanRepository extends JpaRepository<MembershipPlan, Long> {
    Optional<MembershipPlan> findByName(String name);
    
    @Query("SELECT mp FROM MembershipPlan mp WHERE mp.active = true")
    List<MembershipPlan> findActivePlans();
    
    @Query("SELECT mp FROM MembershipPlan mp WHERE mp.active = true ORDER BY mp.price ASC")
    List<MembershipPlan> findActivePlansByPriceAsc();
}