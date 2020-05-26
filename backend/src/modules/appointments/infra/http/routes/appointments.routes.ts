import { Router } from 'express';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import midlewareAuthenticate from '@modules/users/infra/http/midlewares/ensureAuthenticated';

import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentsRouter.use(midlewareAuthenticate);

appointmentsRouter.post('/', async (request, response) => {});
export default appointmentsRouter;
