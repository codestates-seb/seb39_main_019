package com.dangProject.board.region;

import com.dangProject.common.EnumModel;

public enum RegionName implements EnumModel {

    //25개의 서울 지역구 추가 완료

    GANGNAM_GU("강남구"),
    GANGDONG_GU("강동구"),
    GANGBUK_GU("강북구"),
    GANGSEO_GU("강서구"),
    GWANAK_GU("관악구"),
    GWANGJIN_GU("광진구"),
    GURO_GU("구로구"),
    GEUMCHEON_GU("금천구"),
    NOWON_GU("노원구"),
    DOBONG_GU("도봉구"),
    DONGDAEMUN_GU("동대문구"),
    DONGJAK_GU("동작구"),
    MAPO_GU("마포구"),
    SEODAEMUN_GU("서대문구"),
    SEOCHO_GU("서초구"),
    SUNGDONG_GU("성동구"),
    SUNGBUK_GU("성북구"),
    SONGPA_GU("송파구"),
    YANGCHEON_GU("양천구"),
    YONGDEUNGPO_GU("영등포구"),
    YONGSAN_GU("용산구"),
    EUNPYEONG_GU("은평구"),
    JONGNO_GO("종로구"),
    JUNG_GU("중구"),
    JUNGNANG_GU("중랑구");


    public String value;

    RegionName(String value) {
        this.value = value;
    }

    @Override
    public String getKey() {
        return name();
    }

    @Override
    public String getValue() {
        return value;
    }
}
