package pprado.forum.api.resource;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pprado.forum.api.document.Answer;
import pprado.forum.api.service.AnswerService;

@CrossOrigin
@RestController
@RequestMapping("/answer")
public class AnswerResource {

    private AnswerService answerService;

    public AnswerResource(AnswerService answerService){
        this.answerService = answerService;
    }

    @ApiOperation("Busca de todas as respostas cadastradas.")
    @RequestMapping(path = "/all" , method = RequestMethod.GET)
    public ResponseEntity<?> listAnswers(){
        try {
            final var answers = answerService.listAnswers();
            if(!answers.isEmpty()) return new ResponseEntity<>(answers, HttpStatus.OK);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation("Busca de uma resposta dado seu id.")
    @RequestMapping(path="/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> findById(
            @ApiParam("Id da resposta buscada.")
            @PathVariable final String id){
        try {
            final var answer = answerService.findById(id);
            if(answer.isPresent()) return new ResponseEntity<>(answer.get(), HttpStatus.OK);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation("Busca de uma lista de respostas relacionadas à uma pergunta, dado o id desta pergunta.")
    @RequestMapping(path="/find/{questionId}", method = RequestMethod.GET)
    public ResponseEntity<?> findAllByQuestionId(
            @ApiParam("Id da pergunta.")
            @PathVariable final String questionId){
        try {
            final var answers = answerService.findAllByQuestionId(questionId);
            if(!answers.isEmpty()) return new ResponseEntity<>(answers, HttpStatus.OK);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation("Cria uma nova pergunta.")
    @RequestMapping(path="/save", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> create(
            @ApiParam("Corpo da resposta à salvar.")
            @RequestBody final Answer answer){

        try {
            final var answerResponse = answerService.create(answer);
            return new ResponseEntity<>(answerResponse, HttpStatus.CREATED);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @ApiOperation("Deleta uma resposta dado seu id.")
    @RequestMapping(path="/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deteleById(
            @ApiParam("Id da resposta à deletar.")
            @PathVariable final String id){
        try {
            answerService.deleteById(id);
            return new ResponseEntity<>("Deleted.",HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
