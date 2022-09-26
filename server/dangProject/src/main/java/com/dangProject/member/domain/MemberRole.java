package com.dangProject.member.domain;

import org.springframework.security.core.GrantedAuthority;

public enum MemberRole implements GrantedAuthority {
    UNCERTIFIED, CERTIFIED;

    @Override
    public String getAuthority() {
        return this.name();
    }
}
