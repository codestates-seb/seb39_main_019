package com.dangProject.security.oauth;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OAuth2AttributeRepository extends JpaRepository<OAuth2Attribute, Long> {
}
