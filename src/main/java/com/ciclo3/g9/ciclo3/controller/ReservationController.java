package com.ciclo3.g9.ciclo3.controller;

import com.ciclo3.g9.ciclo3.model.DTOs.CountClient;
import com.ciclo3.g9.ciclo3.model.DTOs.CountStatus;
import com.ciclo3.g9.ciclo3.model.Reservation;
import com.ciclo3.g9.ciclo3.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/Reservation")
@CrossOrigin(origins ="*", methods = {RequestMethod.GET,RequestMethod.POST,RequestMethod.PUT,RequestMethod.DELETE})
public class ReservationController {
    @Autowired
    private ReservationService reservationService;

    @GetMapping("/all")
    public List<Reservation> getReservations(){
        return reservationService.getAll();
    }

    @GetMapping("/{id}")
    public Optional<Reservation> getReservation(@PathVariable("id") int id){

        return reservationService.getReservation(id);
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Reservation save(@RequestBody Reservation r){
        return reservationService.save(r);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Reservation update(@RequestBody Reservation r) {
        return reservationService.update((r));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean deleteReservation(@PathVariable("id") int id) {
        return reservationService.deleteReservation(id);
    }


    @GetMapping("/report-clients")
    public List<CountClient> getClientRanking(){
        return reservationService.getClients();
    }

    @GetMapping("/report-dates/{inicial}/{final}")
    public List<Reservation> getReservationsBetweenDates(@PathVariable("inicial") String ini, @PathVariable("final") String fin){
        return reservationService.getReservationsBetweenDates(ini,fin);
    }

    @GetMapping("/report-dates_total")
    public CountStatus getReportStatus(){
        return reservationService.getReservationsStatus();
    }


}
