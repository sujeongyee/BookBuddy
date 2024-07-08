package book.project.bookbuddy.search;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import book.project.bookbuddy.command.PostVO;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("/book/search")
public class SearchController {

  @Autowired
  @Qualifier("SearchService")
  private SearchService searchService;

  @PostMapping("/getByKeywords")
  public Map<String,Object> getByKeywords(@RequestBody Map<String,Object> map) {
    String kwds = String.valueOf(map.get("keywords"));
    Map<String,Object> map2 = new HashMap<>();
    map2.put("recommend", searchService.getByKeywords(kwds));
    map2.put("review",searchService.getByKeywords2(kwds));
    return map2;
  }
  
  
}
