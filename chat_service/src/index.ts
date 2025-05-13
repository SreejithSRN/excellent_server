import { startConsumer, stopConsumer } from "./_boot/consumer";
import database from "./_boot/database";
import server from './presentation/server';

(async () => {
    try {
       server

        await Promise.all([database(), startConsumer()]);

        //  Handle shutdown
        process.on("SIGINT", async () => {  // Handles Ctrl+C (manual stop)
            console.log("Shutting down gracefully...");
            await stopConsumer();  
            process.exit(0);
        });

        process.on("SIGTERM", async () => {  // Handles server shutdown 
            console.log("Shutting down gracefully...");
            await stopConsumer();  
            process.exit(0);
        });

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error?.message || 'An error occurred');
        } else {
            console.error('An error occurred');
        }
        process.exit(1);
    }
})();