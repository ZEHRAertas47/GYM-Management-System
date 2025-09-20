package com.gym.service;

import com.gym.entity.Member;
import com.gym.entity.MembershipStatus;
import com.gym.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
public class MemberService {
    
    @Autowired
    private MemberRepository memberRepository;
    
    public List<Member> getAllMembers() {
        return memberRepository.findAll();
    }
    
    public Member getMemberById(Long id) {
        return memberRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Member not found with id: " + id));
    }
    
    public Member saveMember(Member member) {
        if (member.getMembershipNumber() == null) {
            member.setMembershipNumber(generateMembershipNumber());
        }
        return memberRepository.save(member);
    }
    
    public void deleteMember(Long id) {
        memberRepository.deleteById(id);
    }
    
    public List<Member> getMembersByStatus(MembershipStatus status) {
        return memberRepository.findByMembershipStatus(status);
    }
    
    public List<Member> getExpiredMemberships() {
        return memberRepository.findExpiredMemberships(LocalDate.now());
    }
    
    public boolean isOwner(Long memberId, String username) {
        Member member = getMemberById(memberId);
        return member.getUser().getUsername().equals(username);
    }
    
    private String generateMembershipNumber() {
        return "GYM" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }
}