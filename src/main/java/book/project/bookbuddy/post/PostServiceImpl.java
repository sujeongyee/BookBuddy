package book.project.bookbuddy.post;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import book.project.bookbuddy.command.CmtVO;
import book.project.bookbuddy.command.GridVO;
import book.project.bookbuddy.command.LikesVO;
import book.project.bookbuddy.command.ListVO;
import book.project.bookbuddy.command.PostVO;
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
  public List<GridVO>  getRcmPostGrid(String userId){
    return postMapper.getRcmPostGrid(userId);
  }
  public List<ReviewVO> getRvPostMyPage(String userId){
    return postMapper.getRvPostMyPage(userId);
  }
  public List<GridVO> getRvPostGrid(String userId){
    return postMapper.getRvPostGrid(userId);
  }
  public List<ListVO> getMyPageList(String userId,String type){
    return postMapper.getMyPageList(userId, type);
  }

  public RecommendVO getPostRecommend(int postNo){
    return postMapper.getPostRecommend(postNo);
  }
  public ReviewVO getPostReview(int postNo){
    return postMapper.getPostReview(postNo);
  }
  public PostVO getCnt(int postNo,String type){
    return postMapper.getCnt(postNo,type);
  }

  public List<LikesVO> getLikeList(int postNo,String type){
    return postMapper.getLikeList(postNo, type);
  }
  public List<CmtVO> getCmtList(int postNo,String type){
    return postMapper.getCmtList(postNo, type);
  }
  public int likeCheck (int postNo,int userNo,String type) {
    return postMapper.likeCheck(postNo, userNo,type);
  }
  public int doLike(int postNo,int userNo,String type){
    postMapper.upLike(postNo, type);
    return postMapper.doLike(postNo, userNo, type);
  }
  public int cancelLike(int postNo,int userNo,String type){
    postMapper.downLike(postNo, type);
    return postMapper.cancelLike(postNo, userNo, type);
  }

  public void comment(int postNo, int userNo, String type, String comment){
    postMapper.comment(postNo, userNo, type, comment);
  }

  public CmtVO geCmtVO(){
    return postMapper.getCmtVO();
  }
  public int modifyRecommendPost(RecommendVO vo){
    return postMapper.modifyRecommendPost(vo);
  }
  public int modifyReviewPost(ReviewVO vo){
    return postMapper.modifyReviewPost(vo);
  }

  public void deleteComment(int postNo, String type){
    postMapper.deleteComment(postNo,type);
  }
  public void deletePost(int postNo, String type){
    postMapper.deletePost(postNo, type);
  }
  public void modifyComment(String commentNo, String editContent){
    postMapper.modifyComment(commentNo, editContent);
  }

}
