package book.project.bookbuddy.post;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import book.project.bookbuddy.command.GridVO;
import book.project.bookbuddy.command.RecommendVO;
import book.project.bookbuddy.command.ReviewVO;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/book/post")
public class PostController {

  @Autowired
  @Qualifier("postService")
  private PostService postService;
  // 비로그인 유저의 메인페이지 게시글 불러오기
  @GetMapping("/getNotLogin")
  public Map<String,Object> getNotLogin(@RequestParam("reviewPage") int reviewPage,
                                          @RequestParam("recommendPage") int recommendPage) {
    Map<String,Object> map = new HashMap<>();
    List<RecommendVO> list =  postService.getNotLoginRecommend(recommendPage*5);
    List<ReviewVO> list2 =  postService.getNotLoginReview(reviewPage*5);
    map.put("recommendList", list);
    map.put("reviewList", list2);
    return map;
  }
  // 추천 게시글 작성
  @PostMapping("/writeRecommendPost")
  public ResponseEntity<Integer> writeRecommendPost(@RequestBody RecommendVO vo) {
    int n = postService.writeRecommendPost(vo);
    int userNo = vo.getUser_NO();
    int rcmNo=0;
    if(n==1){
      rcmNo = postService.getRecommendNo(userNo);
    }else{
      rcmNo=-1;
    }
    return new ResponseEntity<>(rcmNo,HttpStatus.OK);
  }
  // 리뷰 게시글 작성
  @PostMapping("/writeReviewPost")
  public ResponseEntity<Integer> writeReviewPost(@RequestBody ReviewVO vo) {
    int n = postService.writeReviewPost(vo);
    int userNo = vo.getUser_NO();
    int rcmNo=0;
    if(n==1){
      rcmNo = postService.getReviewNo(userNo);
    }else{
      rcmNo=-1;
    }
    return new ResponseEntity<>(rcmNo,HttpStatus.OK);
  }
  // 마이페이지에서 추천 게시글 불러오기
  @GetMapping("/getRcmPostMyPage")
  public Object getRcmPostMyPage(@RequestParam("id") String userId, @RequestParam("type") String type) {
    if(type.equals("grid")){
      List<GridVO> vos = postService.getRcmPostGrid(userId);
      return vos;
    }else{
      List<RecommendVO> list = postService.getRcmPostMyPage(userId);
      return list;
    }
  }
  // 마이페이지에서 리뷰 게시글 불러오기 
  @GetMapping("/getRvPostMyPage")
  public Object getRvPostMyPage(@RequestParam("id") String userId, @RequestParam("type") String type) {
    if(type.equals("grid")){
      List<GridVO> vos = postService.getRvPostGrid(userId);
      return vos;
    }else{
      List<ReviewVO> list = postService.getRvPostMyPage(userId);
      return list;
    }
    
  }
  
  
  

  
}
