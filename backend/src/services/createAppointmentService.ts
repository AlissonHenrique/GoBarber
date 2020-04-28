import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

interface RequestDTO {
  date: Date;
  provider: String;
}

class CreateAppointmentService {
  public async execute({ date, provider }: RequestDTO): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.fidBydate(
      appointmentDate,
    );
    if (findAppointmentInSameDate) {
      throw Error('This aappointment is alterady booked');
    }
    const appointment = appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });
    await appointmentsRepository.save(appointment);

    return appointment;
  }
}
export default CreateAppointmentService;
