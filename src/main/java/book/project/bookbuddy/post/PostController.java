package book.project.bookbuddy.post;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import book.project.bookbuddy.command.RecommendVO;
import book.project.bookbuddy.command.ReviewVO;

import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/book/post")
public class PostController {

  @Autowired
  @Qualifier("postService")
  private PostService postService;

  @GetMapping("/getNotLogin")
  public Map<String,Object> getNotLogin(@RequestParam("reviewPage") int reviewPage,
                                          @RequestParam("recommendPage") int recommendPage) {
    Map<String,Object> map = new HashMap<>();
    List<RecommendVO> list =  postService.getNotLoginRecommend(recommendPage);
    List<ReviewVO> list2 =  postService.getNotLoginReview(reviewPage);
    for(RecommendVO vo : list){
      System.out.println(vo.toString());
    }
    for(ReviewVO vo : list2){
      System.out.println(vo.toString());
    }
    return map;
  }
  

  
}
