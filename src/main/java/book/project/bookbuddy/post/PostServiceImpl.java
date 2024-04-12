package book.project.bookbuddy.post;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import book.project.bookbuddy.command.RecommendVO;
import book.project.bookbuddy.command.ReviewVO;

@Service("postService")
public class PostServiceImpl implements PostService{

  @Autowired
  private PostMapper postMapper;

  public List<RecommendVO> getNotLoginRecommend(int page){
    return postMapper.getNotLoginRecommend(page);
  }
  public List<ReviewVO> getNotLoginReview(int page){
    return postMapper.getNotLoginReview(page);
  }

  
  
}
