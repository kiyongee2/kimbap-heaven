package com.nirvana.kimbap.dto;

import com.nirvana.kimbap.entity.Menu;
import lombok.Builder;
import lombok.Getter;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Getter
@Builder
public class MenuDto {

    private Long id;
    private String krName;
    private String image;
    private String bgColor;

    private Map<String, String> name;
    private Map<String, String> description;

    private Integer price;

    private Map<String, Boolean> dietary;
    private List<String> allergens;
    private Boolean enabled;

    public static MenuDto from(Menu m) {
        return MenuDto.builder()
                .id(m.getId())
                .krName(m.getKrName())
                .image(m.getImage())
                .bgColor(m.getBgColor())
                .name(Map.of(
                        "ko", orEmpty(m.getNameKo()),
                        "en", orEmpty(m.getNameEn()),
                        "ja", orEmpty(m.getNameJa()),
                        "zh", orEmpty(m.getNameZh())
                ))
                .description(Map.of(
                        "ko", orEmpty(m.getDescKo()),
                        "en", orEmpty(m.getDescEn()),
                        "ja", orEmpty(m.getDescJa()),
                        "zh", orEmpty(m.getDescZh())
                ))
                .price(m.getPrice())
                .dietary(Map.of(
                        "vegan",   boolVal(m.getIsVegan()),
                        "noPork",  boolVal(m.getIsNoPork()),
                        "beef",    boolVal(m.getIsBeef()),
                        "spicy",   boolVal(m.getIsSpicy()),
                        "popular", boolVal(m.getIsPopular())
                ))
                .allergens(parseAllergens(m.getAllergens()))
                .enabled(m.getEnabled())
                .build();
    }

    private static String orEmpty(String s) {
        return s != null ? s : "";
    }

    private static boolean boolVal(Boolean b) {
        return b != null && b;
    }

    private static List<String> parseAllergens(String raw) {
        if (raw == null || raw.isBlank()) return List.of();
        return Arrays.stream(raw.split(","))
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .toList();
    }
}
