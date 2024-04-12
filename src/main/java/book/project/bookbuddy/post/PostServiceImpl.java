package book.project.bookbuddy.post;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("postService")
public class PostServiceImpl implements PostService{

  @Autowired
  private PostMapper postMapper;
  
}
