import { resolve } from "node:path";
import express, {
	type Request,
	type Response,
	type NextFunction,
} from "express";
import { getAppName, initHTMLPagesRender } from "@shared/backend";
import packageJson from "../package.json" assert { type: "json" };

const errorHandler = (
	error: unknown,
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	if (res.headersSent) {
		return;
	}

	console.error(error);
	res.status(500).send("Internal server error");
};

export const server = async () => {
	const appName = getAppName(packageJson);
	const frontendRoot = resolve(
		import.meta.dirname,
		`../../${appName}-frontend`
	);

	const app = express();

	// HTML pages
	await initHTMLPagesRender(app, frontendRoot);

	app.use(errorHandler);

	return app;
};
