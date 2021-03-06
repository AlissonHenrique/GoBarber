import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderMonthAvailabilyService from '@modules/appointments/services/ListProviderMonthAvailabilyService';

export default class ProviderMonthAvailabilyController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year } = request.query;

    const listProviderMonthAvailabilyService = container.resolve(
      ListProviderMonthAvailabilyService,
    );

    const availabily = await listProviderMonthAvailabilyService.execute({
      provider_id,
      month: Number(month),
      year: Number(year),
    });
    return response.json(availabily);
  }
}
