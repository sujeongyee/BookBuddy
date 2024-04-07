package book.project.bookbuddy.main;


import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import book.project.bookbuddy.command.CategoryVO;

@Mapper
public interface MainMapper {
    public int checkUser(@Param("user_id") String user_id, @Param("user_pwd") String user_pwd);
    public List<CategoryVO> getAllCategories();
}
