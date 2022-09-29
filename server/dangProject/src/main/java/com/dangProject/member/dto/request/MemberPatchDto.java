package com.dangProject.member.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MemberPatchDto {
    public Long id;
    public String nickname;

    public void setId(Long id) {
        this.id = id;
    }
}
