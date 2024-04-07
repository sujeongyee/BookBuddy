package book.project.bookbuddy.main;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import org.springframework.web.bind.annotation.*;

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
    public boolean checkDuplicateId(@RequestBody String id) {    
        int n = mainService.checkDuplicateId(id);
        if(n>0) return false;
        else return true;
    }
    
    
}
