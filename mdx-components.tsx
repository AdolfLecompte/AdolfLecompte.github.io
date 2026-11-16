import type { MDXComponents } from "mdx/types";
import Link from "next/link";

// Internal links go through next/link (client-side navigation, no reload).
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: ({ href = "", ...rest }) =>
      href.startsWith("/") ? <Link href={href} {...rest} /> : <a href={href} {...rest} />,
    ...components,
  };
}
