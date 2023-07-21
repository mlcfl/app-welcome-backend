import express, {Express} from 'express';
import {middleware404, middlewareErrorHandler} from 'common/be/express-middlewares';
import {Fs} from 'common/be/services';

/**
 * SSG example (backend part)
 */
export const load = async (name: string): Promise<Express> => {
	const app = express();
	const distPath = `${Fs.rootPath}/apps/${name}/${name}-frontend/dist`;

	app.use(express.static(distPath));

	app.get(['/', '/:page'], async (req, res, next) => {
		const {page = 'index'} = req.params;
		const file = `${distPath}/${page}.html`;

		return await Fs.exists(file)
			? res.sendFile(file)
			: next();
	});

	app.use(middleware404(name));
	app.use(middlewareErrorHandler(name));

	return app;
};
