package book.project.bookbuddy.main;

import java.util.List;

import book.project.bookbuddy.command.CategoryVO;
import book.project.bookbuddy.command.KeywordVO;

public interface MainService {
    public int checkUser(String user_id, String user_pwd);
    public List<CategoryVO> getAllCategories();
    public List<KeywordVO> getAllKeywords();
    public int checkDuplicateId(String id);
}
