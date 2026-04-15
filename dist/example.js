"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const logger = new index_1.Logger({
    minLevel: "info",
    context: "UserModule",
    transports: [new index_1.ConsoleTransport(), new index_1.FileTransport("./app.log")],
});
logger.verbose("This will be ignored because minLevel is info.");
logger.info("User login success.");
logger.warning({ event: "PasswordRetry", count: 3 });
logger.error({ event: "DBConnectionFailed", retryAfterMs: 5000 });
const users = ["alice", "bob", "charlie", "diana", "eve"];
for (let i = 0; i < users.length; i += 1) {
    logger.info({
        event: "PageView",
        user: users[i],
        path: `/dashboard/${i + 1}`,
        requestId: `req-${Date.now()}-${i}`,
    });
}
const retryWarnings = [1, 2, 3, 4];
for (const retry of retryWarnings) {
    logger.warning({
        event: "PaymentRetry",
        retryCount: retry,
        orderId: `order-${1000 + retry}`,
    });
}
for (let i = 0; i < 3; i += 1) {
    logger.error({
        event: "ServiceTimeout",
        service: i % 2 === 0 ? "ProfileService" : "OrderService",
        timeoutMs: 3000 + i * 500,
        traceId: `trace-${Date.now()}-${i}`,
    });
}
