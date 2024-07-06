package book.project.bookbuddy.main;



import book.project.bookbuddy.command.UserVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;

import book.project.bookbuddy.command.CategoryVO;
import book.project.bookbuddy.command.KeywordVO;
import book.project.bookbuddy.command.NotificationVO;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/book")
public class MainController { // 로그인과 회원가입 등의 기능

    @Autowired
    @Qualifier("mainService")
    private MainService mainService;

    // 로그인
    @PostMapping("/login")
    public Object login(@RequestBody Map<String,String> map){
        String user_id = map.get("USER_ID");
        UserVO vo = mainService.getVO(user_id);
        String user_pwd = map.get("USER_PWD");
        boolean n = mainService.checkUser(vo,user_pwd);
        vo.setUser_PWD("");
        vo.setUser_NO(null);
        if(n){
            return vo;
        }else{
            return "fail";
        }
    }
    // 카테고리 리스트 불러오기
    @GetMapping("/getAllCategories")
    public List<CategoryVO> getAllCategories(){
        return mainService.getAllCategories();
    }
    // 키워드 리스트 불러오기
    @GetMapping("/getAllKeywords")
    public List<KeywordVO> getAllKeywords(){
        return mainService.getAllKeywords();
    }
    // 아이디 중복 검사
    @PostMapping("/checkDuplicateId")
    public boolean checkDuplicateId(@RequestBody Map<String,String> map) {
        int n = mainService.checkDuplicateId(map.get("id"));
        if(n>0) return false;
        else return true;
    }
    // 닉네임 중복 검사
    @PostMapping("/checkDuplicateNick")
    public boolean checkDuplicateNick(@RequestBody Map<String,String> map) {
        int n = mainService.checkDuplicateNick(map.get("nick"));
        if(n>0) return false;
        else return true;
    }
    // 가입하기
    @PostMapping("/join")
    public boolean joinMember(@RequestBody UserVO vo){
        System.out.println(vo.toString());
        int n = mainService.joinBuddy(vo);
        if(n==1) return true;
        else return false;
    }
    // 모든 알림 불러오기
    @GetMapping("/getNoti")
    public List<NotificationVO> getNoti(@RequestParam("userNo") String userNo) {
        return mainService.getNoti(userNo);
    }

    @GetMapping("/getMenu")
    public Map<String,Object> getMenu() {
        Map<String,Object> map = new HashMap<>();
        map.put("category", mainService.getAllCategories());
        map.put("keyword", mainService.getAllKeywords());
        return map;
    }
    
    
    
}
