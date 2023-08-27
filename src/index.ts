import express, {Express} from 'express';
import {ExpressMiddlewares} from 'common/be/ExpressMiddlewares';
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

	app.use(ExpressMiddlewares.notFound(name));
	app.use(ExpressMiddlewares.errorHandler(name));

	return app;
};
