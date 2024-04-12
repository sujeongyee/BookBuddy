package book.project.bookbuddy.post;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/book/post")
public class PostController {

  @Autowired
  private PostService postService;

  
}
