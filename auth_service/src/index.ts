import database from "./_boot/database";
import server from "./presentation/server";

(async () => {
    try {
        server;
        await database();
        console.log("Server and database started successfully");
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error("An unknown error occurred");
        }
        process.exit(1);
    }
})();
