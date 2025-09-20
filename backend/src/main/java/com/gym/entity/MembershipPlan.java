package com.gym.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "membership_plans")
public class MembershipPlan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(unique = true)
    private String name;

    private String description;

    @NotNull
    @Positive
    private BigDecimal price;

    @NotNull
    @Positive
    @Column(name = "duration_months")
    private Integer durationMonths;

    @Column(name = "access_hours")
    private String accessHours; // e.g., "24/7", "06:00-22:00"

    @Column(name = "includes_personal_trainer")
    private Boolean includesPersonalTrainer = false;

    @Column(name = "includes_group_classes")
    private Boolean includesGroupClasses = true;

    @Column(name = "max_freeze_days")
    private Integer maxFreezeDays = 0;

    private Boolean active = true;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();

    // Constructors
    public MembershipPlan() {}

    public MembershipPlan(String name, String description, BigDecimal price, Integer durationMonths) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.durationMonths = durationMonths;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public Integer getDurationMonths() { return durationMonths; }
    public void setDurationMonths(Integer durationMonths) { this.durationMonths = durationMonths; }

    public String getAccessHours() { return accessHours; }
    public void setAccessHours(String accessHours) { this.accessHours = accessHours; }

    public Boolean getIncludesPersonalTrainer() { return includesPersonalTrainer; }
    public void setIncludesPersonalTrainer(Boolean includesPersonalTrainer) { this.includesPersonalTrainer = includesPersonalTrainer; }

    public Boolean getIncludesGroupClasses() { return includesGroupClasses; }
    public void setIncludesGroupClasses(Boolean includesGroupClasses) { this.includesGroupClasses = includesGroupClasses; }

    public Integer getMaxFreezeDays() { return maxFreezeDays; }
    public void setMaxFreezeDays(Integer maxFreezeDays) { this.maxFreezeDays = maxFreezeDays; }

    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}