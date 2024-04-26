package book.project.bookbuddy.post;

import java.util.List;
import java.util.Map;

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

  public int writeRecommendPost(RecommendVO vo){
    return postMapper.writeRecommendPost(vo);
  }

  public int getRecommendNo(int userNo){
    return postMapper.getRecommendNo(userNo);
  }

  public int writeReviewPost(ReviewVO vo){
    return postMapper.writeReviewPost(vo);
  }

  public int getReviewNo(int userNo){
    return postMapper.getReviewNo(userNo);
  }
  public List<RecommendVO> getRcmPostMyPage(String userId){
    return postMapper.getRcmPostMyPage(userId);    
  }
  public Map<String,String> getRcmPostGrid(String userId){
    return postMapper.getRcmPostGrid(userId);
  }
  public List<ReviewVO> getRvPostMyPage(String userId){
    return postMapper.getRvPostMyPage(userId);
  }
}
