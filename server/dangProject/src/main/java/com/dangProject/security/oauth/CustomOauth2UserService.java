package com.dangProject.security.oauth;

import com.dangProject.member.domain.MemberType;
import com.dangProject.member.dto.request.MemberRequestDto;
import com.dangProject.member.dto.response.MemberResponse;
import com.dangProject.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CustomOauth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final MemberService memberService;
    private final OAuth2AttributeRepository oAuth2AttributeRepository;

    @Override
    @Transactional
    public OAuth2User loadUser(OAuth2UserRequest request) throws OAuth2AuthenticationException {
        OAuth2UserService<OAuth2UserRequest, OAuth2User> userService = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = userService.loadUser(request);

        OAuth2Attribute oAuth2Attribute = OAuth2Attribute.of(request, oAuth2User);
        MemberResponse member;

        if (memberService.existsByEmail(oAuth2Attribute.getEmail())) {
            member = memberService.findMemberByEmail(oAuth2Attribute.getEmail());
        } else {
            MemberRequestDto registerRequest =  new MemberRequestDto(oAuth2Attribute.getEmail(), "", oAuth2Attribute.getNickname());
            MemberType memberType = MemberType.valueOf(oAuth2Attribute.getProvider().toUpperCase());
            member = memberService.registerSocial(registerRequest, memberType);
            oAuth2AttributeRepository.save(oAuth2Attribute);

        }
        return CustomOAuth2User.of(member.getMemberId(), oAuth2Attribute);
    }
}
