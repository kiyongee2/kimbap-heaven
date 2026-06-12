package com.nirvana.kimbap.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "menus")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Menu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** 한국어 대표 이름 (파일명 기준) */
    @Column(nullable = false)
    private String krName;

    /** 이미지 경로 (예: /images/참치김밥.png) */
    private String image;

    /** 배경 색상 (hex) */
    private String bgColor;

    // ── 다국어 이름 ──────────────────────────────────────────────
    private String nameKo;
    private String nameEn;
    private String nameJa;
    private String nameZh;

    // ── 다국어 설명 ──────────────────────────────────────────────
    @Column(length = 500)
    private String descKo;
    @Column(length = 500)
    private String descEn;
    @Column(length = 500)
    private String descJa;
    @Column(length = 500)
    private String descZh;

    /** 가격 (원) */
    @Column(nullable = false)
    private Integer price;

    // ── 식이 속성 ─────────────────────────────────────────────────
    private Boolean isVegan;
    private Boolean isNoPork;
    private Boolean isBeef;
    private Boolean isSpicy;
    private Boolean isPopular;

    /** 알레르기 항목 (콤마 구분, 예: "Fish,Egg") */
    private String allergens;

    /** 메뉴 노출 여부 */
    @Column(nullable = false)
    @Builder.Default
    private Boolean enabled = true;
}
