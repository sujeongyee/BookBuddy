package book.project.bookbuddy.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("userService")
public class UserServiceImpl implements UserService{

  @Autowired
  private UserMapper userMapper;
  
}
