package pprado.forum.api.resource;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pprado.forum.api.document.Question;
import pprado.forum.api.service.QuestionService;


@CrossOrigin
@RestController
@RequestMapping(path= "/question")
public class QuestionResource {

    private QuestionService questionService;

    public QuestionResource(QuestionService questionService){
        this.questionService = questionService;
    }

    @ApiOperation("Busca de todas as perguntas.")
    @RequestMapping(path = "/all" , method = RequestMethod.GET)
    public ResponseEntity<?> listQuestions(){
        try {
            final var questions = questionService.listQuestions();
            if(!questions.isEmpty()) return new ResponseEntity<>(questions,HttpStatus.OK);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation("Busca de uma pergunta por seu id.")
    @RequestMapping(path="/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> findById(
            @ApiParam("Id da pergunta buscada.")
            @PathVariable final String id){
        try {
            final var question = questionService.findById(id);
            if(question.isPresent()) return new ResponseEntity<>(question.get(),HttpStatus.OK);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation("Cria uma nova pergunta.")
    @RequestMapping(path="/save", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> create(
            @ApiParam("Corpo da pergunta à salvar.")
            @RequestBody final Question question){
        try {
            final var questionResponse = questionService.create(question);
            return new ResponseEntity<>(questionResponse, HttpStatus.CREATED);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation("Deleta uma pergunta dado seu id.")
    @RequestMapping(path="/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deteleById(
            @ApiParam("Id da pergunta à deletar.")
            @PathVariable final String id){
        try {
            questionService.deleteById(id);
            return new ResponseEntity<>("Deleted.",HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
