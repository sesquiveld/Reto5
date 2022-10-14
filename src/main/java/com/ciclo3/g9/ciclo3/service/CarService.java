
package com.ciclo3.g9.ciclo3.service;

import com.ciclo3.g9.ciclo3.model.Car;
import com.ciclo3.g9.ciclo3.repository.CarRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Sesquiveld
 */

@Service
public class CarService {
    @Autowired
    private CarRepository carRepository;
    
    public List<Car> getAll(){
        return carRepository.getAll();
    }
    
    public Optional<Car> getCar(int id){
        return carRepository.getCar(id);
    }
    
    public Car save(Car c){
        if (c.getIdCar()==null){
            return carRepository.save(c);    
        }else{
            Optional<Car> caux = carRepository.getCar(c.getIdCar());
            if(caux.isEmpty()){
                return carRepository.save(c);
            }else{
                return c;
            } 
        } 
        
    }

    public Car update(Car c){
        if(c.getIdCar()!= null){
            Optional<Car> g =carRepository.getCar(c.getIdCar());
            if(!g.isEmpty()){
                if(c.getName()!=null){
                    g.get().setName(c.getName());
                }
                if(c.getBrand()!=null){
                    g.get().setBrand(c.getBrand());
                }
                if(c.getYear()!=null){
                    g.get().setYear(c.getYear());
                }
                if(c.getDescription()!=null){
                    g.get().setDescription(c.getDescription());
                }
                return carRepository.save(g.get());
            }
        }
        return c;
    }

    public boolean deleteCar(int id) {
        Optional<Car> c= getCar(id);
        if(!c.isEmpty()){
            carRepository.delete(c.get());
            return true;
        }
        return false;
    }
}
