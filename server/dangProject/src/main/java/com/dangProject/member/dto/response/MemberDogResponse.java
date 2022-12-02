package com.dangProject.member.dto.response;

import com.dangProject.dog.dto.response.DogInfoResponse;
import com.dangProject.member.domain.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MemberDogResponse {

    private Long memberId;
    private String email;
    private String nickname;
    private List<DogInfoResponse> dogs;

    public static MemberDogResponse of(Member member) {
        return new MemberDogResponse(member.getId(), member.getEmail(), member.getNickname(),
                member.getDogList().stream()
                        .map(DogInfoResponse::of)
                        .collect(Collectors.toList()));
    }
}
