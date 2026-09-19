import app from "./src/app.js"
import connectToDB from "./src/config/database.js"
import ensureDefaultAdmin from "./src/config/seedAdmin.js"

const startServer = async () => {
    await connectToDB();
    await ensureDefaultAdmin();

    app.listen(3000, () => {
        console.log("server is listening on port 3000")
    });
};

startServer();

