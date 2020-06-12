import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderDayAvailabilyService from '@modules/appointments/services/ListProviderDayAvailabilyService';

export default class ProviderDayAvailabilyController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;

    const { month, day, year } = request.body;

    const listProviderDayAvailabilyService = container.resolve(
      ListProviderDayAvailabilyService,
    );

    const availabily = await listProviderDayAvailabilyService.execute({
      provider_id,
      day,
      month,
      year,
    });
    return response.json(availabily);
  }
}
