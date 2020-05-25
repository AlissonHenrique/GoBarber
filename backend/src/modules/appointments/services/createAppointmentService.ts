import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../infra/typeorm/entities/Appointment';
import AppError from '@shared/erros/AppError';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface RequestDTO {
  date: Date;
  provider_id: String;
}

class CreateAppointmentService {
  public async execute({
    date,
    provider_id,
  }: RequestDTO): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.fidBydate(
      appointmentDate,
    );
    if (findAppointmentInSameDate) {
      throw new AppError('This aappointment is alterady booked');
    }
    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });
    await appointmentsRepository.save(appointment);

    return appointment;
  }
}
export default CreateAppointmentService;
