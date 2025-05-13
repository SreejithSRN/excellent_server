
import { startConsumer } from "./_boot/consumer";
import server from "./presentation/server"

(async ()=>{
    try {
        server
        await startConsumer()
       
        console.log("Notification service started successfully")
    } catch (error:any) {
        console.error(error?.message|| "An error occured")     
        process.exit(1)   
    }
})();