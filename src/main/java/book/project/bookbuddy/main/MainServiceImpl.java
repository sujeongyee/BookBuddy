package book.project.bookbuddy.main;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import book.project.bookbuddy.command.CategoryVO;

@Service("mainService")
public class MainServiceImpl implements MainService{

    @Autowired
    private MainMapper mainMapper;


    @Override
    public int checkUser(String user_id, String user_pwd) {
        return mainMapper.checkUser(user_id, user_pwd);
    }

    public List<CategoryVO> getAllCategories(){
        return mainMapper.getAllCategories();
    }
}
