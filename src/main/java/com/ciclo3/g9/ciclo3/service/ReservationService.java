package com.ciclo3.g9.ciclo3.service;


import com.ciclo3.g9.ciclo3.model.DTOs.CountClient;
import com.ciclo3.g9.ciclo3.model.DTOs.CountStatus;
import com.ciclo3.g9.ciclo3.model.Reservation;
import com.ciclo3.g9.ciclo3.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    public List<Reservation> getAll() {
        return reservationRepository.getAll();
    }

    public Optional<Reservation> getReservation(int id) {
        return reservationRepository.getReservation(id);
    }

    public Reservation save(Reservation r) {
        if (r.getIdReservation() == null) {
            return reservationRepository.save(r);
        } else {
            Optional<Reservation> raux = reservationRepository.getReservation(r.getIdReservation());
            if (raux.isEmpty()) {
                return reservationRepository.save(r);
            } else {
                return r;
            }
        }
    }

    public Reservation update(Reservation r){
        if(r.getIdReservation()!= null){
            Optional<Reservation> g = reservationRepository.getReservation(r.getIdReservation());
            if(!g.isEmpty()){
                if(r.getStartDate()!=null){
                    g.get().setStartDate(r.getStartDate());
                }
                if(r.getDevolutionDate()!=null){
                    g.get().setDevolutionDate(r.getDevolutionDate());
                }
                if(r.getStatus()!=null){
                    g.get().setStatus(r.getStatus());
                }
                return reservationRepository.save(g.get());
            }
        }
        return r;
    }

    public boolean deleteReservation(int id) {
        Optional<Reservation> r= getReservation(id);
        if(!r.isEmpty()){
            reservationRepository.delete(r.get());
            return true;
        }
        return false;
    }


    public List<CountClient> getClients(){
        return reservationRepository.getClients();
    }

    public List<Reservation> getReservationsBetweenDates(String dateA, String dateB){
        SimpleDateFormat parser = new SimpleDateFormat("yyyy-MM-dd");
        Date a = new Date();
        Date b = new Date();
        try{
            a = parser.parse(dateA);
            b = parser.parse(dateB);
        }catch (ParseException error){
            error.printStackTrace();
        }
        if(a.before(b)){
            return reservationRepository.getReservationsBetweenDates(a,b);
        }else{
            return new ArrayList<>();
        }
    }

    public CountStatus getReservationsStatus(){
        List<Reservation> reservasCompletadas = reservationRepository.getReservationsByStatus("completed");
        List<Reservation> reservasCanceladas = reservationRepository.getReservationsByStatus("cancelled");

        return new CountStatus((long)reservasCompletadas.size(),(long)reservasCanceladas.size());
    }

}
