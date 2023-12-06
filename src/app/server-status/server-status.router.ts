import { Router } from 'express';
import { SERVER_STATUS_ENDPOINT } from '../../constants/endpoint';
import { getRoutes } from './server.status.service';

export const router: Router = Router();

// getStatus
router.get(SERVER_STATUS_ENDPOINT + "/", (req, res) => {
  res.status(200).send({
    "status": "server is running"
  });
});

// getRoutes
router.get(SERVER_STATUS_ENDPOINT + "/routes", (req, res) => {
  const routes = getRoutes();
  res.status(200).send({
    numberOfRoutes: routes.length,
    routes: routes
  });
});


