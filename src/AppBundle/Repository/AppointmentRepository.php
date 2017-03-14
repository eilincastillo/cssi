<?php

namespace AppBundle\Repository;

/**
 * AppointmentRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class AppointmentRepository extends \Doctrine\ORM\EntityRepository
{
    /**
     * Get appointments by patient
     */
    public function getAppointmentsByPatient($patient)
    {
        $query = $this->_em->createQueryBuilder();
        $query->select('appointment.id ,  appointment.date, appointment.percentageAid, appointment.observations, 
        appointment.reasonAppointment, appointment.result, appointment.expectationsPatient, doctor.name as doctorName, 
        doctor.lastname as doctorLastname')
            ->from('AppBundle:Appointment', 'appointment')
            ->innerJoin('appointment.doctor','doctor')
            ->where('appointment.patient = :patient')
            ->setParameter('patient', $patient);
        return $query->getQuery()->getArrayResult();
    }
}
