import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPower, FiClock } from 'react-icons/fi';
import 'react-day-picker/lib/style.css';

import ptBR, { isToday, isAfter, format, parseISO } from 'date-fns';

import DayPicker, { DayModifiers } from 'react-day-picker';
import {
  Container,
  HeaderContent,
  Profile,
  Info,
  Appointment,
  Calendar,
  Content,
  NextAppointment,
  Schedule,
  Section,
} from './styles';

import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  // const [appointments, setAppointments] = useState<ScheduleAppointment[]>([]);
  // const [monthAvailability, setMonthAvailability] = useState<
  //   MonthAvailabilityItem[]
  // >([]);

  const { signOut, user } = useAuth();

  return (
    <Container>
      <HeaderContent>
        <img src={logoImg} alt="logo" />

        <Profile>
          <img
            src={
              'https://avatars3.githubusercontent.com/u/17318431?s=460&u=6c9e1ae6b9eade999e9a73cf5198d4b640986d6b&v=4' ||
              user.avatar_url
            }
            alt={'Alisson' || user.name}
          />
          <Info>
            <span>Bem-vindo(a), </span>
            <Link to="/profile">
              <strong>{'Alisson' || user.name}</strong>
            </Link>
          </Info>
        </Profile>

        <button type="button" onClick={signOut}>
          <FiPower />
        </button>
      </HeaderContent>
      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            {isToday(selectedDate) && <span>Hoje</span>}
            <span>{selectedDateAsText}</span>
            <span>{selectedWeekDay}</span>
          </p>
          {isToday(selectedDate) && nextAppointment && (
            <NextAppointment>
              <strong>Agendamento a seguir</strong>
              <div>
                <img
                  src={nextAppointment.user.avatar_url}
                  alt={nextAppointment.id}
                />

                <strong>{nextAppointment.user.name}</strong>
                <span>
                  <FiClock />
                  {nextAppointment.hourFormatted}
                </span>
              </div>
            </NextAppointment>
          )}

          <Section>
            <strong>Manhã</strong>

            {morningAppointments.length === 0 && (
              <p>Nenhum agendamento marcado nesse período</p>
            )}
            {morningAppointments.map((appointment) => (
              <Appointment key={appointment.id}>
                <span>
                  <FiClock />
                  {appointment.hourFormatted}
                </span>
                <div>
                  <img
                    src={appointment.user.avatar_url || blankAvatar}
                    alt={appointment.user.name}
                  />

                  <strong>{appointment.user.name}</strong>
                </div>
              </Appointment>
            ))}
          </Section>
          <Section>
            <strong>Tarde</strong>
            {afternoonAppointments.length === 0 && (
              <p>Nenhum agendamento marcado nesse período</p>
            )}
            {afternoonAppointments.map((appointment) => (
              <Appointment key={appointment.id}>
                <span>
                  <FiClock />
                  {appointment.hourFormatted}
                </span>
                <div>
                  <img
                    src={appointment.user.avatar_url || blankAvatar}
                    alt={appointment.user.name}
                  />

                  <strong>{appointment.user.name}</strong>
                </div>
              </Appointment>
            ))}
          </Section>
        </Schedule>
        <Calendar>
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            fromMonth={new Date()}
            selectedDays={selectedDate}
            disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5] },
            }}
            onDayClick={handleDateChange}
            onMonthChange={handleMonthChange}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
          />
        </Calendar>
      </Content>
    </Container>
  );
};
export default Dashboard;
