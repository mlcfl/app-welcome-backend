# Welcome — Backend

Backend part of the Welcome application. Welcome is a simple landing page that introduces the MLC project. It requires no authentication or any other preconditions — it is publicly accessible.

The frontend is a statically generated site (SSG). This backend serves as the API layer and static file host for that site. It is built with NestJS and Express, and can run both standalone and embedded inside `entry-server`.

## Setup

```bash
pnpm install
```

## Development

Start the dev server (uses `.env.development`):

```bash
pnpm dev
```

## Build

Compile for production (uses `.env.production`):

```bash
pnpm build
```

Output goes to `dist/`.

## Production

Run the standalone server (uses `.env.production`):

```bash
pnpm start
```

> When running inside `entry-server`, the `start` script is not used — `entry-server` imports the app factory directly.

## License

[CC BY-NC-ND 4.0](LICENSE)
