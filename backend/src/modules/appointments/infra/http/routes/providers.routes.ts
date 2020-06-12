import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/midlewares/ensureAuthenticated';
import ProviderController from '../controllers/ProvidersController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilyController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilyController';

const providersRouter = Router();
const providerController = new ProviderController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providerController.index);

providersRouter.get(
  '/:provider_id/month-availability',
  providerMonthAvailabilityController.index,
);
providersRouter.get(
  '/:provider_id/day-availability',
  providerDayAvailabilityController.index,
);

export default providersRouter;
