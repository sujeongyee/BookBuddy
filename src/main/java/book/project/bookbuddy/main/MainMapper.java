package book.project.bookbuddy.main;


import java.util.List;

import book.project.bookbuddy.command.UserVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import book.project.bookbuddy.command.CategoryVO;
import book.project.bookbuddy.command.KeywordVO;

@Mapper
public interface MainMapper {
    public int checkUser(@Param("user_id") String user_id, @Param("user_pwd") String user_pwd);
    public List<CategoryVO> getAllCategories();
    public List<KeywordVO> getAllKeywords();
    public int checkDuplicateId(String id);
    public int checkDuplicateNick(String id);
    public int joinBuddy(UserVO vo);
}
