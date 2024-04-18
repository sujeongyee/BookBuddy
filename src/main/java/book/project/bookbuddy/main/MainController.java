package book.project.bookbuddy.main;



import book.project.bookbuddy.command.UserVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;

import book.project.bookbuddy.command.CategoryVO;
import book.project.bookbuddy.command.KeywordVO;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/book")
public class MainController { // 로그인과 회원가입 등의 기능

    @Autowired
    @Qualifier("mainService")
    private MainService mainService;

    @PostMapping("/login")
    public Object login(@RequestBody Map<String,String> map){
        String user_id = map.get("USER_ID");
        UserVO vo = mainService.getVO(user_id);
        String user_pwd = map.get("USER_PWD");
        boolean n = mainService.checkUser(vo,user_pwd);
        if(n){
            return vo;
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
    public boolean joinMember(@RequestBody Map<String,String> map){
        
        Timestamp birth =  mainService.getTimeStamp(String.valueOf(map.get("USER_BIRTH")));

        UserVO vo = new UserVO().builder().USER_ID(String.valueOf(map.get("USER_ID")))
                .USER_PWD(map.get("USER_PWD"))
                .USER_NICK(map.get("USER_NICK"))
                .USER_PHONE(map.get("USER_PHONE"))
                .USER_BIRTH(birth)
                .USER_EMAIL(map.get("USER_EMAIL"))
                .CATEGORY_NO(map.get("CATEGORY_NO"))
                .KEYWORD_NO(map.get("KEYWORD_NO"))
                .PROFILE_URL(map.get("PROFILE_URL"))
                .build();
        System.out.println(vo.toString());
        int n = mainService.joinBuddy(vo);
        if(n==1) return true;
        else return false;
    }
    
    
}
