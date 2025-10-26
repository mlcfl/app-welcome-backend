import type { Express } from "express";

export const initApi = (app: Express) => {
	app.get("/api/ping", (req, res) => {
		res.send("API is alive");
	});
};
