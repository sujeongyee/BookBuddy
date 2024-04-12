package book.project.bookbuddy.command;
import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class RecommendVO {
  private int RECOMMEND_NO;
  private String RECOMMEND_TITLE;
  private String RECOMMEND_CONTENT;
  private Timestamp RECOMMEND_TIME;
  private String RECOMMEND_CATEGORY;
  private String RECOMMEND_KEYWORD;
  private int RECOMMEND_LIKE;
  private int USER_NO;
}
