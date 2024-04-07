package book.project.bookbuddy.main;

import java.util.List;

import book.project.bookbuddy.command.CategoryVO;

public interface MainService {
    public int checkUser(String user_id, String user_pwd);
    public List<CategoryVO> getAllCategories();
}
