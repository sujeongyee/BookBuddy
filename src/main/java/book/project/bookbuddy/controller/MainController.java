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
    @RequestMapping("/login")
    public String login(@RequestParam String userid, @RequestParam String password){
        System.out.println("오는지 확인");
        System.out.println(userid + " " + password);
        //db 확인 작업
        if ("correctUsername".equals(userid) && "correctPassword".equals(password)) {
            return "로그인 성공";
        } else {
            return "로그인 실패";
        }
    }

//    @RequestMapping("/main")
//    public ResponseEntity<Map<String,Object>> getMain(@RequestParam("userId") String leaderId){
//        Map<String,Object> map = new HashMap<>();
//        return new ResponseEntity<>(map, HttpStatus.OK);
//        /////
//    }

}
