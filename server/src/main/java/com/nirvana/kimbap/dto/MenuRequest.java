package com.nirvana.kimbap.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MenuRequest {
    private String krName;
    private String image;
    private String bgColor;

    private String nameKo;
    private String nameEn;
    private String nameJa;
    private String nameZh;

    private String descKo;
    private String descEn;
    private String descJa;
    private String descZh;

    private Integer price;

    private Boolean isVegan;
    private Boolean isNoPork;
    private Boolean isBeef;
    private Boolean isSpicy;
    private Boolean isPopular;

    private String allergens;
    private Boolean enabled;
}
