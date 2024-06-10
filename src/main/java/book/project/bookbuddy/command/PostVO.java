package book.project.bookbuddy.command;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class PostVO {

  private RecommendVO recommendVO;
  private ReviewVO reviewVO;
  private int likeCnt;
  private List<LikesVO> likeList;
  private int cmtCnt;
  private List<CmtVO> cmtList; // 댓글리스트
  private List<FileVO> fileList;
  
}
