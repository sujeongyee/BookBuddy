package book.project.bookbuddy.command;
import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CmtVO {
  private int comment_no;
  private String comment_content;
  private int comment_like;
  private Timestamp comment_date;
  private int user_no;
  private int recommend_no;
  private int review_no;
  private String user_id;
  private String user_nick;
  private String profile_url;
}
