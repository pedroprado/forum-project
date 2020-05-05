package pprado.forum.api.resource;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pprado.forum.api.document.Like;
import pprado.forum.api.service.LikeService;

import java.util.HashMap;

@CrossOrigin
@RestController
@RequestMapping("/like")
public class LikeResource {

    private LikeService likesService;

    public LikeResource(LikeService likesService){
        this.likesService = likesService;
    }

    @ApiOperation("Busca de todos os likes cadastrados.")
    @RequestMapping(path = "/all" , method = RequestMethod.GET)
    public ResponseEntity<?> listLikes(){
        try {
            final var likes = likesService.listLikes();
            if(!likes.isEmpty()) return new ResponseEntity<>(likes, HttpStatus.OK);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation("Cria um novo like.")
    @RequestMapping(path="/save", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> create(
            @ApiParam("Corpo do like à salvar.")
            @RequestBody final Like like){
        try {
            final var likeResponse = likesService.create(like);
            return new ResponseEntity<>(likeResponse, HttpStatus.CREATED);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation("Atualiza um novo like.")
    @RequestMapping(path="/update/{id}/{liked}", method = RequestMethod.GET)
    public ResponseEntity<?> update(
            @ApiParam("Parametros do like a atualizar.")
            @PathVariable final String id,
            @PathVariable final Boolean liked){
        try {
            final var updatedAmount = likesService.findByIdAndUpdateLikes(id, liked);
            var response = new HashMap<>();
            response.put("updated", updatedAmount);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
