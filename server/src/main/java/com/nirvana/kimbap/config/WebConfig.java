package com.nirvana.kimbap.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.File;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    /**
     * CORS — 개발 환경의 Vite 개발서버(5173) 허용
     * 프론트 빌드 배포 시에는 실제 도메인으로 변경
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins(
                        "http://localhost:5173",  // Vite dev server
                        "http://localhost:5174",  // Vite dev server (fallback port)
                        "http://localhost:4173",  // Vite preview
                        "http://localhost:3000",  // 추가 개발 포트
                        "https://kimbap-ui-jwvd.onrender.com"  // Render 배포 UI
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .maxAge(3600);
    }

    /**
     * 이미지 정적 리소스 — ui/public/images 폴더를 직접 제공
     * mvn spring-boot:run 실행 위치(server/)에서 ../ui/public/images 경로 참조
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String imagesPath = resolveImagesPath();
        registry.addResourceHandler("/images/**")
                .addResourceLocations(imagesPath);
    }

    private String resolveImagesPath() {
        // server/ 디렉토리 기준 상대 경로로 ui/public/images 탐색
        File relative = new File("../ui/public/images/");
        if (relative.exists()) {
            return "file:" + relative.getAbsolutePath().replace("\\", "/") + "/";
        }
        // fallback: 클래스패스 내 static/images
        return "classpath:/static/images/";
    }
}
