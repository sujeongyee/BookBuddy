package book.project.bookbuddy.command;



import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GridVO { // 그리드 형식으로 게시글 불러올 때 필요한 값들

  private Integer recommend_no;
  private String recommend_title;
  private String recommend_content;
  private Timestamp recommend_time;
  private String recommend_booktitle;
  private Integer file_no;
  private String file_url;
  private String book_thumbnail;
  private Integer review_no;
  private String review_title;
  private String review_content;
  private Timestamp review_time;
  private String review_booktitle;
  
}
