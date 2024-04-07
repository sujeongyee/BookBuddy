package book.project.bookbuddy.command;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CategoryVO {

  private String CATEGORY_NO;
  private String CATEGORY_NAME;
  
}
