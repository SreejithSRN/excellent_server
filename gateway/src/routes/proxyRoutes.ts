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
      if (srcReq.user) {
        proxyReqOpts.headers['x-user-id'] = srcReq.user._id;
        proxyReqOpts.headers['x-user-email'] = srcReq.user.email;
        proxyReqOpts.headers['x-user-role'] = srcReq.user.role;
      }
      return proxyReqOpts;
    }
  }));
  ;
});

export default router;














// import { Router } from "express";
// import proxy from "express-http-proxy";
// import { roleAuthMiddleware } from "../middleware/jwt";
// import { gatewayRoutes } from "../middleware/gatewayConfig";

// const router = Router();

// // Public Auth Routes (like login/signup)

// // const AUTH_SERVICE = process.env.AUTH_SERVICE!;
// // router.use("/api/auth", proxy(AUTH_SERVICE));

// const NOTIFICATION_SERVICE= process.env.NOTIFICATION_SERVICE!;
// router.use("/api/notification", proxy(NOTIFICATION_SERVICE));

// // Role-restricted service routes with path rewriting
// gatewayRoutes.forEach(({ path, role, service }) => {
//   router.use(path, roleAuthMiddleware(role), proxy(service, {
//     proxyReqPathResolver: (req) => {
//       // This only strips the base path (e.g., /api/course)
//       const strippedPath = req.originalUrl.replace(/^\/api\/[^/]+/, "");
//       return strippedPath; // DO NOT append query params — proxy will do it automatically
//     },
//     proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
//       proxyReqOpts.headers = proxyReqOpts.headers || {};
//       if (srcReq.user) {
//         proxyReqOpts.headers['x-user-id'] = srcReq.user._id;
//         proxyReqOpts.headers['x-user-email'] = srcReq.user.email;
//         proxyReqOpts.headers['x-user-role'] = srcReq.user.role;
//       }
//       return proxyReqOpts;
//     }
//   }));
//   ;
// });

// export default router;


