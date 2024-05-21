package com.CinemaCity.CinemaCity;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileUploadService {

    private static final String UPLOAD_DIR = "CinemaCity/uploads/";

    public String uploadFile(MultipartFile file) throws IOException {
        String originalFilename = file.getOriginalFilename();
        String newFilename = UUID.randomUUID().toString() + "_" + originalFilename;
        Path destinationPath = Paths.get(UPLOAD_DIR, newFilename);
        Files.copy(file.getInputStream(), destinationPath);
        return destinationPath.toAbsolutePath().toString();
    }
}
