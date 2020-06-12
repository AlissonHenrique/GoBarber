import { uuid } from 'uuidv4';
import { isEqual, getMonth, getYear, getDate } from 'date-fns';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentsDTO from '@modules/appointments/dtos/ICreateAppointmentsDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import Appointment from '../../infra/typeorm/entities/Appointment';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';

class AppointmentsRepository implements IAppointmentsRepository {
  private apointments: Appointment[] = [];

  public async findByDate(
    date: Date,
    provider_id: string,
  ): Promise<Appointment | undefined> {
    const findAppointment = this.apointments.find(
      appointment =>
        isEqual(appointment.date, date) &&
        appointment.provider_id === provider_id,
    );
    return findAppointment;
  }
  public async create({
    provider_id,
    user_id,
    date,
  }: ICreateAppointmentsDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_id, user_id });

    this.apointments.push(appointment);

    return appointment;
  }
  public async findAllInMonthFromProvider({
    month,
    year,
    provider_id,
  }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const filterApointments = this.apointments.filter(
      apointment =>
        apointment.provider_id === provider_id &&
        getMonth(apointment.date) + 1 === month &&
        getYear(apointment.date) === year,
    );
    return filterApointments;
  }
  public async findAllInDayFromProvider({
    month,
    year,
    day,
    provider_id,
  }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const filterApointments = this.apointments.filter(
      apointment =>
        apointment.provider_id === provider_id &&
        getDate(apointment.date) === day &&
        getMonth(apointment.date) + 1 === month &&
        getYear(apointment.date) === year,
    );
    return filterApointments;
  }
}
export default AppointmentsRepository;
