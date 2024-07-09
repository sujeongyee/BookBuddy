package book.project.bookbuddy.search;

import java.util.Arrays;
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
    boolean isChecked = Boolean.parseBoolean( String.valueOf(map.get("allChecked")));
    String[] kwdList = kwds.substring(1, kwds.length()-1).replace(" ","").split(",");

    Map<String,Object> resultMap = new HashMap<>();
    resultMap.put("recommend", searchService.getByKeywords(kwdList, isChecked));
    resultMap.put("review", searchService.getByKeywords2(kwdList, isChecked));
    return resultMap; 
  }
  
  
}
