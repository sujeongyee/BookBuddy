package book.project.bookbuddy.main;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/book")
public class MainController {

//    @Autowired
//    private PasswordEncoder passwordEncoder;

    @Autowired
    @Qualifier("mainService")
    private MainService mainService;

    @PostMapping("/login")
    public String login(@RequestBody Map<String,String> map){
        String user_id = map.get("USER_ID");
        String user_pwd = map.get("USER_PWD");
        int n = mainService.checkUser(user_id,user_pwd);
        if(n>0){
            return "success";
        }else{
            return "fail";
        }
    }

}
