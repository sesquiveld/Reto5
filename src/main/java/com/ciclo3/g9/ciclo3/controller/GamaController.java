package com.ciclo3.g9.ciclo3.controller;

import com.ciclo3.g9.ciclo3.model.Gama;
import com.ciclo3.g9.ciclo3.service.GamaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/Gama")
@CrossOrigin(origins ="*", methods = {RequestMethod.GET,RequestMethod.POST,RequestMethod.PUT,RequestMethod.DELETE})
public class GamaController{
    @Autowired
    private GamaService gamaService;

    @GetMapping("/all")
    public List<Gama> getGamas(){
        return gamaService.getAll();
    }

    @GetMapping("/{id}")
    public Optional<Gama> getGama(@PathVariable("id") int id){
        return gamaService.getGama(id);
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Gama save(@RequestBody Gama g){
        return gamaService.save(g);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Gama update(@RequestBody Gama g) {
        return gamaService.update(g);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean deleteGama(@PathVariable("id") int id) {
        return gamaService.deleteGama(id);
    }

}
