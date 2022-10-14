package com.ciclo3.g9.ciclo3.service;

import com.ciclo3.g9.ciclo3.model.Score;
import com.ciclo3.g9.ciclo3.repository.ScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 *
 * @author Sesquiveld
 */

@Service
public class ScoreService {
    @Autowired
    private ScoreRepository scoreRepository;

    public List<Score> getAll(){
        return scoreRepository.getAll();
    }

    public Optional<Score> getScore(int id){
        return scoreRepository.getScore(id);
    }

    public Score save(Score s){
        if (s.getIdScore()==null){
            return scoreRepository.save(s);
        }else{
            Optional<Score> saux = scoreRepository.getScore(s.getIdScore());
            if(saux.isEmpty()){
                return scoreRepository.save(s);
            }else{
                return s;
            }
        }

    }

    public Score update(Score s){
        if(s.getIdScore()!= null){
            Optional<Score> g =scoreRepository.getScore(s.getIdScore());
            if(!g.isEmpty()){
                if(s.getStar()!=null){
                    g.get().setStar(s.getStar());
                }
                if(s.getMessage()!=null){
                    g.get().setMessage(s.getMessage());
                }
            return scoreRepository.save(g.get());
            }
        }
        return s;
    }

    public boolean deleteScore(int id) {
        Optional<Score> s= getScore(id);
        if(!s.isEmpty()){
            scoreRepository.delete(s.get());
            return true;
        }
        return false;
    }
}
