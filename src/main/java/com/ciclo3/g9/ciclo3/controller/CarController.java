
package com.ciclo3.g9.ciclo3.controller;

import com.ciclo3.g9.ciclo3.model.Car;
import com.ciclo3.g9.ciclo3.service.CarService;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

/**
 *
 * @author Sesquiveld
 */

@RestController
@RequestMapping("/api/Car")
@CrossOrigin(origins ="*", methods = {RequestMethod.GET,RequestMethod.POST,RequestMethod.PUT,RequestMethod.DELETE})
public class CarController {
    @Autowired
    private CarService carService;

    @GetMapping("/greet")
    public String greeting(){
        return "hola bienvenido";
    }

    @GetMapping("/all")
    public List<Car> getCars() {
        return carService.getAll();
    }

    @GetMapping("/{id}")
    public Optional<Car> getCar(@PathVariable("id") int id) {
        return carService.getCar(id);
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Car save(@RequestBody Car c) {
        return carService.save(c);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Car update(@RequestBody Car c) {
        return carService.update(c);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean deleteCar(@PathVariable("id") int id) {
        return carService.deleteCar(id);
    }
}
