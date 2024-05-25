"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
server_1.app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});
