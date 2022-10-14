package com.ciclo3.g9.ciclo3.service;

import com.ciclo3.g9.ciclo3.model.Car;
import com.ciclo3.g9.ciclo3.model.Gama;
import com.ciclo3.g9.ciclo3.repository.GamaRepository;
import com.ciclo3.g9.ciclo3.repository.crud.GamaCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GamaService {
    @Autowired
    private GamaRepository gamaRepository;

    public List<Gama> getAll(){
        return gamaRepository.getAll();
    }

    public Optional<Gama> getGama(int id){
        return gamaRepository.getGama(id);
    }

    public Gama save(Gama g){
        if (g.getIdGama()==null){
            return gamaRepository.save(g);
        }else{
            Optional<Gama> gaux=gamaRepository.getGama(g.getIdGama());
            if (gaux.isEmpty()){
                return gamaRepository.save(g);
            }else{
                return g;
            }
        }

    }

    public Gama update(Gama g){
        if(g.getIdGama()!= null){
            Optional<Gama> a = gamaRepository.getGama(g.getIdGama());
            if(!a.isEmpty()){
                if(g.getName()!=null){
                    a.get().setName(g.getName());
                }
                if(g.getDescription()!=null){
                    a.get().setDescription(g.getDescription());
                }
                return gamaRepository.save(a.get());
            }
        }
        return g;
    }

    public boolean deleteGama(int id) {
        Optional<Gama> g= getGama(id);
        if(!g.isEmpty()){
            gamaRepository.delete(g.get());
            return true;
        }
        return false;
    }

}
