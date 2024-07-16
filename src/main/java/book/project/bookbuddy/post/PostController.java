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

import book.project.bookbuddy.command.CmtVO;
import book.project.bookbuddy.command.GridVO;
import book.project.bookbuddy.command.ListVO;
import book.project.bookbuddy.command.PostVO;
import book.project.bookbuddy.command.RecommendVO;
import book.project.bookbuddy.command.ReviewVO;
import book.project.bookbuddy.file.S3FileSerivce;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/book/post")
public class PostController {

  @Autowired
  @Qualifier("postService")
  private PostService postService;

  @Autowired
  @Qualifier("s3fileService")
  private S3FileSerivce s3FileSerivce;

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

  // 로그인 유저의 메인페이지 게시글 불러오기
  @GetMapping("/getLoginFeed")
  public Map<String,Object> getLoginFeed(@RequestParam("userNo") String userNo, @RequestParam("page") String page, @RequestParam("type") String type) {
    Map<String,Object> map = new HashMap<>();
    int pages = Integer.parseInt(page)*5;
    if(type.equals("recommend")) {
      map.put("recommendList", postService.getLoginRecommend(userNo,String.valueOf(pages)));
    } else{
      map.put("reviewList",  postService.getLoginReview(userNo,String.valueOf(pages)));
    }
   
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
      List<ListVO> list = postService.getMyPageList(userId, "recommend");
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
      List<ListVO> list = postService.getMyPageList(userId, "review");
      return list;
    }
    
  }
  // 특정 게시글 조회
  @GetMapping("/postDetail")
  public PostVO postDetail(@RequestParam("type") String type, @RequestParam("postNo") int postNo) {
    // 해당 포스트의 vo , 댓글 리스트, 댓글 수 , 좋아요 리스트, 좋아요 수
    PostVO vo= postService.getCnt(postNo, type);

    if(type.equals("recommend")) {
      vo.setRecommendVO(postService.getPostRecommend(postNo));
    }else {
      vo.setReviewVO(postService.getPostReview(postNo));
    }
    vo.setFileList(s3FileSerivce.getPostImgs(type, postNo));
    vo.setCmtList(postService.getCmtList(postNo, type));
    vo.setLikeList(postService.getLikeList(postNo, type));
    System.out.println(vo.toString());
    return vo;
  }
  // 내가 이 게시글을 공감 했는지 여부 조회
  @GetMapping("/likeCheck")
  public boolean likeCheck(@RequestParam("postNo") int postNo, @RequestParam("userNo") int userNo, @RequestParam("type") String type) {
    int n = postService.likeCheck(postNo, userNo, type);
    return n>0?true:false; 
  }
  // 게시글 공감하기
  @PostMapping("/doLike")
  public int doLike(@RequestBody Map<String,String> map) {
    return postService.doLike(Integer.parseInt(map.get("postNo")) , Integer.parseInt(map.get("userNo")) , map.get("type"));
  }
  // 게시글 공감취소하기
  @PostMapping("/cancelLike")
  public int cancelLike(@RequestBody Map<String,String> map) {
    return postService.cancelLike(Integer.parseInt(map.get("postNo")) , Integer.parseInt(map.get("userNo")) , map.get("type"));
  }
  // 댓글 달기
  @PostMapping("/comment")
  public CmtVO comment(@RequestBody Map<String,String> map) {
    postService.comment(Integer.parseInt(map.get("postNo")), Integer.parseInt(map.get("userNo")), map.get("type"), map.get("comment"));
    CmtVO vo = postService.geCmtVO();
    return vo;
  }
  // 추천 게시글 수정하기
  @PostMapping("/modifyRecommendPost")
  public boolean modifyRecommendPost(@RequestBody RecommendVO vo) {
    System.out.println(vo.toString());
    int n = postService.modifyRecommendPost(vo);
    return n>0?true:false; 
  }
  // 리뷰 게시글 수정하기
  @PostMapping("/modifyReviewPost")
  public boolean modifyReviewPost(@RequestBody ReviewVO vo) {
    System.out.println(vo.toString());
    int n = postService.modifyReviewPost(vo);
    return n>0?true:false; 
  }
  // 게시글 삭제하기
  @DeleteMapping("/deletePost")
  public void deletePost(@RequestParam("postNo") int postNo, @RequestParam("type") String type) {
    postService.deletePostComment(postNo, type);
    postService.deletePost(postNo, type);
  }
  // 댓글 수정하기
  @PostMapping("/modifyComment")
  public void modifyComment(@RequestBody Map<String,String> map) {
    String commentNo = map.get("commentNo");
    String editContent = map.get("editContent");
    postService.modifyComment(commentNo, editContent);
  }
  // 댓글 삭제하기
  @DeleteMapping("/deleteComment")
  public void deleteComment(@RequestParam("commentNo") int commentNo){
    System.out.println(commentNo);
    postService.deleteComment(commentNo);
  }
  

  
  
  
  
  
  
  
  
  

  
}
