import { build } from "esbuild";

await build({
	entryPoints: ["src/**/*.ts"],
	outdir: "dist",
	outbase: "src",
	platform: "node",
	format: "esm",
	target: "esnext",
	sourcemap: false,
	bundle: true, // important to enable this
	splitting: true, // important to enable this
	packages: "external", // important to enable this
});
