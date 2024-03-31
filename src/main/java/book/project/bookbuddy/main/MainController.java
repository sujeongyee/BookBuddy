package book.project.bookbuddy.main;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/book")
public class MainController {

    @Autowired
    private PasswordEncoder passwordEncoder;
    @PostMapping("/login")
    public String login(@RequestBody Map<String, String> map){
        String userid  = map.get("userid");
        String password = map.get("password");
        return "성공";
    }


}
