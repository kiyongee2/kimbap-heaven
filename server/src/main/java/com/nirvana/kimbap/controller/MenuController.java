package com.nirvana.kimbap.controller;

import com.nirvana.kimbap.dto.MenuDto;
import com.nirvana.kimbap.dto.MenuRequest;
import com.nirvana.kimbap.service.MenuService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/menus")
@RequiredArgsConstructor
public class MenuController {

    private final MenuService menuService;

    /** GET /api/menus — 활성 메뉴 목록 (고객용) */
    @GetMapping
    public List<MenuDto> getActiveMenus() {
        return menuService.getActiveMenus();
    }

    /** GET /api/menus/admin — 전체 메뉴 목록 (관리자용, 비활성 포함) */
    @GetMapping("/admin")
    public List<MenuDto> getAllMenus() {
        return menuService.getAllMenus();
    }

    /** GET /api/menus/{id} */
    @GetMapping("/{id}")
    public ResponseEntity<MenuDto> getMenu(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(menuService.getMenu(id));
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    /** POST /api/menus */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public MenuDto createMenu(@RequestBody MenuRequest req) {
        return menuService.createMenu(req);
    }

    /** PUT /api/menus/{id} */
    @PutMapping("/{id}")
    public ResponseEntity<MenuDto> updateMenu(@PathVariable Long id,
                                               @RequestBody MenuRequest req) {
        try {
            return ResponseEntity.ok(menuService.updateMenu(id, req));
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    /** DELETE /api/menus/{id} */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMenu(@PathVariable Long id) {
        try {
            menuService.deleteMenu(id);
            return ResponseEntity.noContent().build();
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
