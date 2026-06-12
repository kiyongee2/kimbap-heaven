package com.nirvana.kimbap.service;

import com.nirvana.kimbap.dto.MenuDto;
import com.nirvana.kimbap.dto.MenuRequest;
import com.nirvana.kimbap.entity.Menu;
import com.nirvana.kimbap.repository.MenuRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MenuService {

    private final MenuRepository menuRepository;

    /** 전체 메뉴 (활성 메뉴만) */
    public List<MenuDto> getActiveMenus() {
        return menuRepository.findAllByEnabledTrue()
                .stream().map(MenuDto::from).toList();
    }

    /** 전체 메뉴 (관리자 — 비활성 포함) */
    public List<MenuDto> getAllMenus() {
        return menuRepository.findAll()
                .stream().map(MenuDto::from).toList();
    }

    /** 단건 조회 */
    public MenuDto getMenu(Long id) {
        return menuRepository.findById(id)
                .map(MenuDto::from)
                .orElseThrow(() -> new NoSuchElementException("Menu not found: " + id));
    }

    /** 메뉴 생성 */
    @Transactional
    public MenuDto createMenu(MenuRequest req) {
        Menu menu = toEntity(req, new Menu());
        return MenuDto.from(menuRepository.save(menu));
    }

    /** 메뉴 수정 */
    @Transactional
    public MenuDto updateMenu(Long id, MenuRequest req) {
        Menu menu = menuRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Menu not found: " + id));
        toEntity(req, menu);
        return MenuDto.from(menuRepository.save(menu));
    }

    /** 메뉴 삭제 (물리 삭제) */
    @Transactional
    public void deleteMenu(Long id) {
        if (!menuRepository.existsById(id)) {
            throw new NoSuchElementException("Menu not found: " + id);
        }
        menuRepository.deleteById(id);
    }

    // ── 내부 헬퍼 ────────────────────────────────────────────────

    private Menu toEntity(MenuRequest req, Menu menu) {
        if (req.getKrName()   != null) menu.setKrName(req.getKrName());
        if (req.getImage()    != null) menu.setImage(req.getImage());
        if (req.getBgColor()  != null) menu.setBgColor(req.getBgColor());
        if (req.getNameKo()   != null) menu.setNameKo(req.getNameKo());
        if (req.getNameEn()   != null) menu.setNameEn(req.getNameEn());
        if (req.getNameJa()   != null) menu.setNameJa(req.getNameJa());
        if (req.getNameZh()   != null) menu.setNameZh(req.getNameZh());
        if (req.getDescKo()   != null) menu.setDescKo(req.getDescKo());
        if (req.getDescEn()   != null) menu.setDescEn(req.getDescEn());
        if (req.getDescJa()   != null) menu.setDescJa(req.getDescJa());
        if (req.getDescZh()   != null) menu.setDescZh(req.getDescZh());
        if (req.getPrice()    != null) menu.setPrice(req.getPrice());
        if (req.getIsVegan()  != null) menu.setIsVegan(req.getIsVegan());
        if (req.getIsNoPork() != null) menu.setIsNoPork(req.getIsNoPork());
        if (req.getIsBeef()   != null) menu.setIsBeef(req.getIsBeef());
        if (req.getIsSpicy()  != null) menu.setIsSpicy(req.getIsSpicy());
        if (req.getIsPopular()!= null) menu.setIsPopular(req.getIsPopular());
        if (req.getAllergens() != null) menu.setAllergens(req.getAllergens());
        if (req.getEnabled()  != null) menu.setEnabled(req.getEnabled());
        return menu;
    }
}
