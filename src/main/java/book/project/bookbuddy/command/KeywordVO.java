package book.project.bookbuddy.command;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class KeywordVO {
    private String keyword_NO;
    private String keyword_NAME;
}
