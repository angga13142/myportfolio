import { withContentlayer } from "next-contentlayer";

/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
	experimental: {
		mdxRs: true,
	},
	// Enable React DevTools in development
	reactStrictMode: true,
	// Better mobile debugging
	devIndicators: {
		buildActivity: true,
		buildActivityPosition: 'bottom-right',
	},
};

export default withContentlayer(nextConfig);
