import { Router } from "express";
import proxy from "express-http-proxy";
import { roleAuthMiddleware } from "../middleware/jwt";
import { gatewayRoutes } from "../middleware/gatewayConfig";

const router = Router();

// const AUTH_SERVICE = process.env.AUTH_SERVICE!;
// router.use("/api/auth", proxy(AUTH_SERVICE));

const NOTIFICATION_SERVICE= process.env.NOTIFICATION_SERVICE!;
router.use("/api/notification", proxy(NOTIFICATION_SERVICE));

// Role-restricted service routes with path rewriting
gatewayRoutes.forEach(({ path, role, service }) => {
  router.use(path, roleAuthMiddleware(role), proxy(service, {
    proxyReqPathResolver: (req) => {    
      const strippedPath = req.originalUrl.replace(/^\/api\/[^/]+/, "");
      return strippedPath; 
    },
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      proxyReqOpts.headers = proxyReqOpts.headers || {};
      // if (srcReq.user) {
      //   proxyReqOpts.headers['x-user-id'] = srcReq.user._id;
      //   proxyReqOpts.headers['x-user-email'] = srcReq.user.email;
      //   proxyReqOpts.headers['x-user-role'] = srcReq.user.role;
      // }
      if (srcReq.user) {
        (proxyReqOpts.headers as { [key: string]: string })['x-user-id'] = srcReq.user._id;
        (proxyReqOpts.headers as { [key: string]: string })['x-user-email'] = srcReq.user.email;
        (proxyReqOpts.headers as { [key: string]: string })['x-user-role'] = srcReq.user.role;
      }
      return proxyReqOpts;
    }
  }));
  ;
});

export default router;












