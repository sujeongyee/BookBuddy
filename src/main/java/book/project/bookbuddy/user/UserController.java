package book.project.bookbuddy.user;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import book.project.bookbuddy.command.FollowerVO;
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

  // 아이디로 userNo 조회하기
  @GetMapping("/getUserNo")
  public int getUserNo(@RequestParam("id") String id) {
    return userService.getUserNo(id);
  }
  // 안 읽은 알람 수 조회
  @GetMapping("/getUnReadNotification")
  public int getUnReadNotification(@RequestParam("userNo") String userNo) {
    return userService.getUnReadNotification(userNo);
  }
  // myPage 조회
  @GetMapping("/myPage")
  public Map<String,Object> getMyPage(@RequestParam("id") String id) {
      UserVO vo =  mainService.getVO(id);
      Map<String,Object> map = new HashMap<>();
      // int userNo = userService.getUserNo(id);
      FollowerVO fvo = userService.getFollow(vo.getUser_NO());
      map.put("vo", vo);
      map.put("follower",fvo.getFollower());
      map.put("following",fvo.getFollowing());
      return map;
  }
  // 개인 프로필 수정하기
  @PostMapping("/updateProfile")
  public Object updateProfile(@RequestBody UserVO userVo) {
      int n = userService.updateProfile(userVo);
      UserVO vo = mainService.getVO(userVo.getUser_ID());
      return n==1?vo:false;
  }
  // 특정 아이디에 해당 되는 게시글 조회 
  @GetMapping("/getPosts")
  public Map<String,Integer> getPosts(@RequestParam("id") String userId) {
    Map<String,Integer> map = new HashMap<>();
    int recommendPostCount = userService.getRecommendPostCount(userId);
    map.put("recommendPostCount", recommendPostCount);

    int reviewPostCount = userService.getReviewPostCount(userId);
    map.put("reviewPostCount", reviewPostCount);
    return map;
  }
  // 팔로우, 팔로워 리스트 조회
  @GetMapping("/getFollowList") 
  public List<UserVO> getFollowList(@RequestParam("id") String userId , @RequestParam("mode") String mode , @RequestParam(value = "userNo", required = false) String feedId) {
    int userNo = userService.getUserNo(userId);
    if(mode.equals("follower")){
      if(feedId!=null){
        int feedNo = userService.getUserNo(feedId);
        List<UserVO> list = userService.getFollowerList2(feedNo,userNo);
        return list;
      }else{
        List<UserVO> list = userService.getFollowerList(userNo);
        return list;
      }
      
    }else{
      if(feedId!=null){
        int feedNo = userService.getUserNo(feedId);
        List<UserVO> list = userService.getFollowingList2(feedNo,userNo);
        return list;
      }else{
        List<UserVO> list = userService.getFollowingList(userNo);
        for(UserVO vo : list){
          if(vo!=null)vo.setCheck_following(true);
        }
        return list;
      }
      
    }
  }
  // 팔로우 하기
  @GetMapping("/addFollow")
  public int addFollow(@RequestParam("id") String userId , @RequestParam("toUserNo") int toUserNo) {
    int userNo = userService.getUserNo(userId);
    return userService.addFollow(userNo, toUserNo);
  }
  // 팔로우 취소하기
  @GetMapping("/cancelFollow")
  public int cancelFollow(@RequestParam("id") String userId , @RequestParam("toUserNo") int toUserNo) {
    int userNo = userService.getUserNo(userId);
    return userService.cancelFollow(userNo, toUserNo);
  }
  // 팔로우 여부 체크
  @GetMapping("/checkFollow")
  public boolean checkFollow(@RequestParam("id") String userId , @RequestParam("toUserNo") String toUserNo) {
    int userNo = userService.getUserNo(userId);
    int userNo2 = userService.getUserNo(toUserNo);
    int check = userService.checkFollow(userNo,userNo2);
    if(check>0) return true;
    else return false;
  }
  
  
  
  


  
}
