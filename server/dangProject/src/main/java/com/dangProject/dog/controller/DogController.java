package com.dangProject.dog.controller;

import com.dangProject.dog.dto.DogPostDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

@RestController
@RequiredArgsConstructor
@RequestMapping("/dogs")
public class DogController {

    @PostMapping("/validation")
    public ResponseEntity registerDogNum(@RequestBody DogPostDto dogPostDto) throws IOException {
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
