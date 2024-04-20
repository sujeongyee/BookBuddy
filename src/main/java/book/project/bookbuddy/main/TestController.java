package book.project.bookbuddy.main;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.lang.ProcessBuilder.Redirect;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import book.project.bookbuddy.command.ChambitVO;


@Controller
public class TestController {

  @GetMapping("/")
  public String goMain(Model model) {
    ChambitVO vo = new ChambitVO();
    vo.setH_name("합 구하기");
    vo.setH_detail1("int a와 int b의 합 구하기");
    vo.setH_detail2("매개변수로 들어오는 두 수의 합을 구하시오");
    vo.setH_detail3("제한사항\n-50,000 ≤ num1 ≤ 50,000\n-50,000 ≤ num2 ≤ 50,000");
    vo.setH_ans1("3");
    vo.setH_ans2("4");
    vo.setH_para1("int a");
    vo.setH_para2("int b");
    vo.setH_test1("1");
    vo.setH_test2("2");
    vo.setH_test3("2");
    vo.setH_test4("2");
    vo.setUsername("수정");
    vo.setH_no(5);
    
    model.addAttribute("vo",vo);
    return "main";
  }

  @PostMapping("/executeCode")
    @ResponseBody
    public String executeCode(@RequestParam("code") String code,
                              @RequestParam("user_id") String userId,
                              @RequestParam("homework_num") int homeworkNum) {
        System.out.println(code);
        System.out.println("//////////////////////////////////");
        // 컴파일 및 실행을 위한 파일 경로 설정
        String filePath = "C:\\Users\\sujeo\\eclipse-workspace\\test\\Solution.java";
        String compiledFilePath = "C:\\Users\\sujeo\\eclipse-workspace\\test\\Solution.class";

        // 코드를 파일에 씁니다.
        try (PrintWriter writer = new PrintWriter(filePath)) {
            writer.println(code);
        } catch (IOException e) {
            e.printStackTrace();
            return "코드를 파일에 쓰는 중 오류가 발생했습니다.";
        }

        try {
          Process compileProcess = new ProcessBuilder("javac", filePath).start();
          int compileResult = compileProcess.waitFor();
          if (compileResult != 0) {
              // 컴파일 오류 메시지를 가져와서 출력합니다.
              BufferedReader errorReader = new BufferedReader(new InputStreamReader(compileProcess.getErrorStream()));
              String errorLine;
              StringBuilder errorMessage = new StringBuilder();
              while ((errorLine = errorReader.readLine()) != null) {
                  errorMessage.append(errorLine).append("\n");
              }
              System.out.println(errorMessage.toString()); // 오류 메시지를 출력합니다.
              return "코드를 컴파일하는 중 오류가 발생했습니다.";
          }
      } catch (IOException | InterruptedException e) {
          e.printStackTrace();
          return "컴파일 중 오류가 발생했습니다.";
      }

      try {
        String filePath2 = "C:\\Users\\sujeo\\eclipse-workspace\\test";

      Process executeProcess = new ProcessBuilder("java", "-classpath", filePath2, "Solution").directory(new File(filePath2)).start();
        // Process executeProcess = new ProcessBuilder("java", "-classpath", compiledFilePath, "Solution").start();
        
        // 프로세스 실행이 완료될 때까지 대기
        int exitCode = executeProcess.waitFor();
        
        // 프로세스 종료 코드 확인
        if (exitCode == 0) {
            // 프로세스가 정상적으로 종료된 경우
            BufferedReader reader = new BufferedReader(new InputStreamReader(executeProcess.getInputStream()));
            StringBuilder result = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                result.append(line).append("\n");
            }
            System.out.println("/////" + result);
            return result.toString();
        } else {
            // 프로세스가 오류로 종료된 경우
            BufferedReader errorReader = new BufferedReader(new InputStreamReader(executeProcess.getErrorStream()));
            StringBuilder errorMessage = new StringBuilder();
            String errorLine;
            while ((errorLine = errorReader.readLine()) != null) {
                errorMessage.append(errorLine).append("\n");
            }
            System.err.println("프로세스 실행 중 오류 발생: " + errorMessage);
            return "프로세스 실행 중 오류 발생: " + errorMessage.toString();
        }
    } catch (IOException | InterruptedException e) {
        e.printStackTrace();
        return "코드를 실행하는 중 오류가 발생했습니다.";
    }
    }
  
}
