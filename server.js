(async () => {
    require("dotenv").config();
    const express = require('express');
    const port = process.env.PORT || 3000;
    let db = require('./models');
    let routes = require('./routes/auth.routes.js')

    let app = express();

    app.use(express.json());
    app.use(express.urlencoded({
        extended: true
    }));

    await db.sequelize.sync();

    routes(app);

    app.listen(port, console.log(`Server started on port ${port}`));

})().catch(err => {
    console.error(err);
});