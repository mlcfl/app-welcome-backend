import { resolve } from "node:path";
import { NestFactory } from "@nestjs/core";
import type { NestExpressApplication } from "@nestjs/platform-express";
import {
	expressErrorHandler,
	getAppName,
	initHTMLPagesRender,
} from "@shared/backend";
import packageJson from "../package.json" assert { type: "json" };
import { AppModule } from "./app.module";

export const server = async () => {
	const appName = getAppName(packageJson);
	const frontendRoot = resolve(
		import.meta.dirname,
		`../../${appName}-frontend`,
	);

	const nestApp = await NestFactory.create<NestExpressApplication>(AppModule);
	const expressApp = nestApp.getHttpAdapter().getInstance();

	await initHTMLPagesRender(expressApp, frontendRoot);
	await nestApp.init();

	expressApp.use(expressErrorHandler);

	return expressApp;
};
