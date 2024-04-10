package book.project.bookbuddy.main;



import book.project.bookbuddy.command.UserVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import book.project.bookbuddy.command.CategoryVO;
import book.project.bookbuddy.command.KeywordVO;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/book")
public class MainController {
// 로그인과 회원가입 등의 기능


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
    
    @GetMapping("/getAllCategories")
    public List<CategoryVO> getAllCategories(){
        return mainService.getAllCategories();
    }
    @GetMapping("/getAllKeywords")
    public List<KeywordVO> getAllKeywords(){
        return mainService.getAllKeywords();
    }

    @PostMapping("/checkDuplicateId")
    public boolean checkDuplicateId(@RequestBody Map<String,String> map) {
        int n = mainService.checkDuplicateId(map.get("id"));
        if(n>0) return false;
        else return true;
    }
    @PostMapping("/checkDuplicateNick")
    public boolean checkDuplicateNick(@RequestBody Map<String,String> map) {
        int n = mainService.checkDuplicateNick(map.get("nick"));
        if(n>0) return false;
        else return true;
    }

    @PostMapping("/join")
    public boolean joinMember(@RequestBody Map<String,Object> map){
        System.out.println("---------");
        System.out.println(map.toString());
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        long timestamp = 0;
        try {
            Date parsedDate = dateFormat.parse(String.valueOf(map.get("USER_BIRTH")));
            timestamp = parsedDate.getTime();
            System.out.println("Timestamp: " + timestamp);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        Timestamp timestamp2 = new Timestamp(timestamp);
        System.out.println(map.get("CATEGORY_NO"));
        System.out.println(map.get("KEYWORD_NO"));
        UserVO vo = new UserVO().builder().USER_ID(String.valueOf(map.get("USER_ID")))
                .USER_PWD(String.valueOf(map.get("USER_ID")))
                .USER_NICK(String.valueOf(map.get("USER_NICK")))
                .USER_PHONE(String.valueOf(map.get("USER_PHONE")))
                .USER_BIRTH(timestamp2)
                .USER_EMAIL(String.valueOf(map.get("USER_EMAIL"))).build();

        return true;
    }
    
    
}
