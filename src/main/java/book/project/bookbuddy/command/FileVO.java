package book.project.bookbuddy.command;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class FileVO {

  private int file_no;
  private String file_url;
  private Timestamp file_date;
  private String file_category;
  private int recommend_no;
  private int review_no;
}
