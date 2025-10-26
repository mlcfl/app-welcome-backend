import { resolve } from "node:path";
import express, {
	type Request,
	type Response,
	type NextFunction,
} from "express";
import cookieParser from "cookie-parser";
import { getAppName, getPresetType, initApi, initSSG, initSSR } from "./utils";

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
	const appName = getAppName();
	const frontendRoot = resolve(
		import.meta.dirname,
		`../../${appName}-frontend`
	);

	const app = express();

	app.use(cookieParser());

	// API
	initApi(app);

	// HTML pages
	try {
		const { isCSRorSSG, isSSR } = await getPresetType(frontendRoot);

		if (isCSRorSSG) {
			initSSG(app, frontendRoot);
		} else if (isSSR) {
			await initSSR(app, frontendRoot);
		}
	} catch {
		console.warn(
			"Could not determine the frontend preset type. Server is started in API-only mode."
		);
	}

	app.use(errorHandler);

	return app;
};
