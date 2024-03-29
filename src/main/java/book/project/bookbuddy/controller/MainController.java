package book.project.bookbuddy.controller;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/book")
public class MainController {

    @RequestMapping("/main")
    public ResponseEntity<Map<String,Object>> getMain(@RequestParam("userId") String leaderId){
        Map<String,Object> map = new HashMap<>();
        return new ResponseEntity<>(map, HttpStatus.OK);
        /////
    }

}
