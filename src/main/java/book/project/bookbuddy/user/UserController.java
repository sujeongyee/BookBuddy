package book.project.bookbuddy.user;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import book.project.bookbuddy.command.UserVO;
import book.project.bookbuddy.main.MainService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/book/user")
public class UserController {

  @Autowired
  @Qualifier("userService")
  private UserService userService;

  @Autowired
  @Qualifier("mainService")
  private MainService mainService;

  @GetMapping("/myPage")
  public Map<String,Object> getMyPage(@RequestParam("id") String id) {
      UserVO vo =  mainService.getVO(id);
      Map<String,Object> map = new HashMap<>();
      map.put("vo", vo);
      return map;
  }

  @PostMapping("/updateProfile")
  public Object updateProfile(@RequestBody UserVO userVo) {
      int n = userService.updateProfile(userVo);
      UserVO vo = mainService.getVO(userVo.getUser_ID());
      return n==1?vo:false;
  }
  
  @GetMapping("/getPosts")
  public Map<String,Integer> getPosts(@RequestParam("id") String userId) {
    Map<String,Integer> map = new HashMap<>();
    int recommendPostCount = userService.getRecommendPostCount(userId);
    map.put("recommendPostCount", recommendPostCount);

    int reviewPostCount = userService.getReviewPostCount(userId);
    map.put("reviewPostCount", reviewPostCount);
    return map;
  }
  


  
}
