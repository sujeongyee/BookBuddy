package book.project.bookbuddy.user;

import org.apache.ibatis.annotations.Mapper;

import book.project.bookbuddy.command.UserVO;

@Mapper
public interface UserMapper {

  public int updateProfile(UserVO vo);

}
