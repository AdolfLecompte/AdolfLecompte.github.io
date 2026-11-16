import createMDX from "@next/mdx";

// Plugins are named by string so Turbopack can load them.
const withMDX = createMDX({ options: { remarkPlugins: ["remark-gfm"] } });

export default withMDX({
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  agentRules: false,
});
