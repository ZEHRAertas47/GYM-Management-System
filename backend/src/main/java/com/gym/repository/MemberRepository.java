package com.gym.repository;

import com.gym.entity.Member;
import com.gym.entity.MembershipStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByMembershipNumber(String membershipNumber);
    Optional<Member> findByUserId(Long userId);
    List<Member> findByMembershipStatus(MembershipStatus status);
    
    @Query("SELECT m FROM Member m WHERE m.membershipEndDate < :date AND m.membershipStatus = 'ACTIVE'")
    List<Member> findExpiredMemberships(LocalDate date);
    
    @Query("SELECT m FROM Member m WHERE m.membershipEndDate BETWEEN :startDate AND :endDate")
    List<Member> findMembershipsExpiringBetween(LocalDate startDate, LocalDate endDate);
    
    @Query("SELECT COUNT(m) FROM Member m WHERE m.membershipStatus = :status")
    long countByMembershipStatus(MembershipStatus status);
    
    @Query("SELECT COUNT(m) FROM Member m WHERE m.joinDate = :date")
    long countNewMembersToday(LocalDate date);
}