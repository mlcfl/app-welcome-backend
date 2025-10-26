import { server } from "./server";

import "dotenv/config";

// Parse command line arguments
const args = process.argv.slice(2);
const portArg = args.find((arg) => arg.startsWith("--port="));
const port = portArg
	? parseInt(portArg.split("=")[1])
	: process.env.PORT || 7200;

const instance = await server();

instance.listen(port, () => {
	console.log(`Server is started on port ${port}`);
});
