package com.dangProject.member.dto.response;

import com.dangProject.member.domain.Member;
import com.dangProject.member.domain.MemberRole;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MemberResponse {

    private Long memberId;
    private String email;
    private String nickname;
    private MemberRole memberRole;

    public static MemberResponse of(Member member) {
        return new MemberResponse(member.getId(), member.getEmail(), member.getNickname(), member.getRole());
    }

}
