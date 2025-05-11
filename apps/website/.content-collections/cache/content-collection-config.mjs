// content-collections.ts
import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import rehypeShiki from "@shikijs/rehype";
import {
  transformerMetaHighlight,
  transformerMetaWordHighlight,
  transformerNotationDiff,
  transformerNotationFocus,
  transformerNotationHighlight,
  transformerNotationWordHighlight
} from "@shikijs/transformers";
import { rehypeToc, remarkHeading } from "fumadocs-core/mdx-plugins";
import fs from "node:fs";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkDirective from "remark-directive";
import remarkGfm from "remark-gfm";

// docs.config.ts
var docsLinks = {
  title: "Docs",
  url: "docs",
  items: [
    {
      title: "Getting Started",
      url: "getting-started",
      items: [
        {
          title: "Overview",
          items: [
            { title: "Introduction", url: "introduction" },
            { title: "Installation", url: "installation" },
            { title: "Migration", url: "migration" },
            { title: "CLI", url: "cli" },
            { title: "Contributing", url: "contributing" }
          ]
        },
        {
          title: "Frameworks",
          url: "frameworks",
          items: [
            { title: "Next.js (App)", url: "next-app" },
            { title: "Next.js (Pages)", url: "next-pages" },
            { title: "Remix", url: "remix" },
            { title: "Storybook", url: "storybook" },
            { title: "Vite", url: "vite" }
          ]
        }
      ]
    },
    {
      title: "Components",
      url: "components",
      items: [
        {
          title: "Overview",
          url: "overview"
        },
        {
          title: "Layout",
          items: [
            { title: "Aspect Ratio", url: "aspect-ratio" },
            { title: "Bleed", url: "bleed" },
            { title: "Box", url: "box" },
            { title: "Center", url: "center" },
            { title: "Container", url: "container" },
            { title: "Flex", url: "flex" },
            { title: "Float", url: "float" },
            { title: "Grid", url: "grid" },
            { title: "Group", url: "group" },
            { title: "Stack", url: "stack" }
          ]
        },
        {
          title: "Typography",
          items: [
            { title: "Blockquote", url: "blockquote" },
            { title: "Code", url: "code" },
            { title: "Em", url: "em" },
            { title: "Heading", url: "heading" },
            { title: "Highlight", url: "highlight" },
            { title: "Kbd", url: "kbd" },
            { title: "Link", url: "link" },
            { title: "Link Overlay", url: "link-overlay" },
            { title: "List", url: "list" },
            { title: "Mark", url: "mark" },
            { title: "Prose", url: "prose" },
            { title: "Text", url: "text" }
          ]
        },
        {
          title: "Components",
          items: [
            { title: "Accordion", url: "accordion" },
            { title: "Action Bar", url: "action-bar" },
            { title: "Alert", url: "alert" },
            { title: "App Shell", url: "app-shell" },
            { title: "Avatar", url: "avatar" },
            { title: "Badge", url: "badge" },
            { title: "Breadcrumb", url: "breadcrumb" },
            { title: "Button", url: "button" },
            { title: "Card", url: "card" },
            { title: "Checkbox Card", url: "checkbox-card" },
            { title: "Checkbox", url: "checkbox" },
            { title: "Clipboard", url: "clipboard" },
            { title: "Close Button", url: "close-button" },
            { title: "Collapsible", url: "collapsible" },
            { title: "Data List", url: "data-list" },
            { title: "Dialog", url: "dialog" },
            { title: "Drawer", url: "drawer" },
            { title: "Editable", url: "editable" },
            { title: "Empty State", url: "empty-state" },
            { title: "Field", url: "field" },
            { title: "File Upload", url: "file-upload" },
            { title: "GridList", url: "grid-list" },
            { title: "Hover Card", url: "hover-card" },
            { title: "Icon", url: "icon" },
            { title: "Icon Badge", url: "icon-badge" },
            { title: "Image", url: "image" },
            { title: "Input", url: "input" },
            { title: "Menu", url: "menu" },
            { title: "Number Input", url: "number-input" },
            { title: "Page", url: "page" },
            { title: "Pagination", url: "pagination" },
            { title: "Password Input", url: "password-input" },
            { title: "Pin Input", url: "pin-input" },
            { title: "Popover", url: "popover" },
            // { title: 'Progress Circle', url: 'progress-circle' },
            { title: "Progress", url: "progress" },
            { title: "Radio Card", url: "radio-card" },
            { title: "Radio", url: "radio" },
            { title: "Rating", url: "rating" },
            { title: "Segmented Control", url: "segmented-control" },
            { title: "Select (Native)", url: "native-select" },
            { title: "Select", url: "select" },
            { title: "Separator", url: "separator" },
            { title: "Sidebar", url: "sidebar" },
            { title: "Skeleton", url: "skeleton" },
            { title: "Slider", url: "slider" },
            { title: "Spinner", url: "spinner" },
            { title: "Stat", url: "stat" },
            { title: "Status", url: "status" },
            { title: "Steps", url: "steps" },
            { title: "Switch", url: "switch" },
            { title: "Tabs", url: "tabs" },
            { title: "Table", url: "table" },
            { title: "Tag", url: "tag" },
            { title: "Textarea", url: "textarea" },
            { title: "Timeline", url: "timeline" },
            { title: "Toast", url: "toast" },
            { title: "Toggle Tip", url: "toggle-tip" },
            { title: "Tooltip", url: "tooltip" }
          ]
        },
        {
          title: "Utilities",
          items: [
            { title: "ClientOnly", url: "client-only" },
            { title: "EnvironmentProvider", url: "environment-provider" },
            { title: "For", url: "for" },
            { title: "FormatNumber", url: "format-number" },
            { title: "FormatByte", url: "format-byte" },
            { title: "LocaleProvider", url: "locale-provider" },
            { title: "Portal", url: "portal" },
            { title: "Show", url: "show" },
            { title: "Visually Hidden", url: "visually-hidden" }
          ]
        }
      ]
    },
    {
      title: "Theming",
      url: "theming",
      items: [
        {
          title: "Concepts",
          items: [
            { title: "Overview", url: "overview" },
            { title: "Tokens", url: "tokens" },
            { title: "Semantic Tokens", url: "semantic-tokens" },
            { title: "Recipes", url: "recipes" },
            { title: "Slot Recipes", url: "slot-recipes" }
          ]
        },
        {
          title: "Design Tokens",
          items: [
            { title: "Animations", url: "animations" },
            { title: "Aspect Ratios", url: "aspect-ratios" },
            { title: "Breakpoints", url: "breakpoints" },
            { title: "Colors", url: "colors" },
            { title: "Radii", url: "radii" },
            { title: "Shadows", url: "shadows" },
            { title: "Sizes", url: "sizes" },
            { title: "Spacing", url: "spacing" },
            { title: "Typography", url: "typography" },
            { title: "Z-Index", url: "z-index" }
          ]
        },
        {
          title: "Compositions",
          items: [
            { title: "Text Styles", url: "text-styles" },
            { title: "Layer Styles", url: "layer-styles" }
          ]
        },
        {
          title: "Customization",
          url: "customization",
          items: [
            { title: "Overview", url: "overview" },
            { title: "Breakpoints", url: "breakpoints" },
            { title: "Colors", url: "colors" },
            { title: "Conditions", url: "conditions" },
            { title: "CSS Variables", url: "css-variables" },
            { title: "Global CSS", url: "global-css" },
            { title: "Recipes", url: "recipes" },
            { title: "Sizes", url: "sizes" },
            { title: "Spacing", url: "spacing" }
          ]
        }
      ]
    },
    {
      title: "Styling",
      url: "styling",
      items: [
        {
          title: "Concepts",
          items: [
            { title: "Overview", url: "overview" },
            { title: "Chakra Factory", url: "chakra-factory" },
            { title: "Responsive Design", url: "responsive-design" },
            { title: "CSS Variables", url: "css-variables" },
            { title: "Dark Mode", url: "dark-mode" },
            { title: "Color Opacity Modifier", url: "color-opacity-modifier" },
            { title: "Conditional Styles", url: "conditional-styles" },
            { title: "Virtual Color", url: "virtual-color" },
            { title: "Cascade Layers", url: "cascade-layers" }
          ]
        },
        {
          title: "Compositions",
          items: [
            { title: "Text Styles", url: "text-styles" },
            { title: "Layer Styles", url: "layer-styles" },
            { title: "Animation Styles", url: "animation-styles" },
            { title: "Focus Ring", url: "focus-ring" }
          ]
        },
        {
          title: "Style Props",
          url: "style-props",
          items: [
            { title: "Background", url: "background" },
            { title: "Border", url: "border" },
            { title: "Display", url: "display" },
            { title: "Effects", url: "effects" },
            { title: "Filters", url: "filters" },
            { title: "Flex and Grid", url: "flex-and-grid" },
            { title: "Interactivity", url: "interactivity" },
            { title: "Layout", url: "layout" },
            { title: "List", url: "list" },
            { title: "Sizing", url: "sizing" },
            { title: "Spacing", url: "spacing" },
            { title: "SVG", url: "svg" },
            { title: "Tables", url: "tables" },
            { title: "Transforms", url: "transforms" },
            { title: "Transitions", url: "transitions" },
            { title: "Typography", url: "typography" }
          ]
        }
      ]
    }
  ]
};
var docsConfig = {
  storybookUrl: "https://storybook.saas-u.dev",
  copyright: "Copyright \xA9 {{date}} Saas UI B.V. All Rights Reserved.",
  title: "Saas UI",
  titleTemplate: "%s | Saas UI",
  description: "The React component library for startups.",
  url: "https://saas-ui.dev",
  xHandle: "@saas-ui",
  repoUrl: "https://github.com/saas-js/saas-ui",
  repoBranch: "v3",
  get editUrl() {
    return `${this.repoUrl}/tree/${this.repoBranch}/apps/website/content/docs`;
  },
  navigation: [
    docsLinks,
    { title: "Resources", url: "resources" },
    { title: "Showcase", url: "showcase" }
  ]
};

// lib/remark-callout.ts
import { h } from "hastscript";
import { visit } from "unist-util-visit";
function remarkCallout() {
  return (tree) => {
    visit(tree, (node) => {
      if (node.type !== "containerDirective") return;
      if (node.name !== "callout" && node.name !== "info" && node.name !== "warning" && node.name !== "danger" && node.name !== "tip" && node.name !== "success" && node.name !== "note")
        return;
      const label = node.children.find((child) => child.data?.directiveLabel)?.children[0].value;
      const data = node.data || (node.data = {});
      const tagName = "callout";
      if (label) {
        node.children = node.children.filter(
          (child) => !child.data?.directiveLabel
        );
        node.children.unshift({
          type: "paragraph",
          data: { hProperties: { "data-callout-title": true } },
          children: [
            {
              type: "strong",
              children: [{ type: "text", value: label }]
            }
          ]
        });
      }
      data.hName = tagName;
      data.hProperties = {
        ...h(tagName, node.attributes || {}).properties,
        "data-type": node.name !== "callout" ? node.name : true
      };
    });
  };
}

// lib/remark-card.ts
import { h as h2 } from "hastscript";
import { visit as visit2 } from "unist-util-visit";
function remarkCard() {
  return (tree) => {
    visit2(tree, (node) => {
      if (node.type !== "containerDirective") return;
      if (node.name !== "card") return;
      node.data ||= {};
      const data = node.data;
      const tagName = "div";
      const heading = node.children.find(
        (child) => child.type === "heading"
      );
      const depth = heading?.depth ?? 2;
      node.attributes.depth = depth;
      if (heading) {
        const [text] = heading.children;
        if (text.type === "text") {
          node.attributes.title = text.value;
        }
      }
      data.hName = "card";
      data.hProperties = h2(tagName, node.attributes || {}).properties;
      node.children = node.children.filter(
        (child) => child.type !== "heading"
      );
    });
    visit2(tree, (node) => {
      if (node.type !== "containerDirective") return;
      if (node.name !== "card-group") return;
      node.data ||= {};
      const data = node.data;
      const tagName = "div";
      data.hName = "card-group";
      data.hProperties = h2(tagName, node.attributes || {}).properties;
    });
  };
}

// lib/remark-code-title.ts
import { visit as visit3 } from "unist-util-visit";
function remarkCodeTitle() {
  return (tree, file) => {
    visit3(tree, "code", (node, index, parent) => {
      const metaString = `${node.lang ?? ""} ${node.meta ?? ""}`.trim();
      if (!metaString) return;
      const [title] = metaString.match(/(?<=title=("|'))(.*?)(?=("|'))/) ?? [""];
      if (!title && metaString.includes("title=")) {
        file.message("Invalid title", node, "remark-code-title");
        return;
      }
      if (!title) return;
      parent.children.splice(index, 1, {
        type: "paragraph",
        children: [node],
        data: {
          hName: "code-block",
          hProperties: {
            title,
            lang: node.lang
          }
        }
      });
    });
  };
}

// lib/remark-codegroup.ts
import { h as h3 } from "hastscript";
import { visit as visit4 } from "unist-util-visit";
function remarkCodeGroup() {
  return (tree) => {
    visit4(tree, (node) => {
      if (node.type !== "containerDirective") return;
      if (node.name !== "code-group") return;
      node.data ||= {};
      const data = node.data;
      const tagName = "div";
      data.hName = "code-group";
      data.hProperties = h3(tagName, node.attributes || {}).properties;
      node.children = node.children.map((child) => {
        const match = "meta" in child && child?.meta?.match(/\[(.*)\]/);
        return {
          type: "paragraph",
          children: [child],
          data: {
            hName: "div",
            hProperties: match ? { "data-title": match[1] } : void 0
          }
        };
      }).filter(Boolean);
    });
  };
}

// lib/remark-steps.ts
import { h as h4 } from "hastscript";
import { visit as visit5 } from "unist-util-visit";
function remarkSteps() {
  return (tree) => {
    visit5(tree, (node) => {
      if (node.type !== "containerDirective") return;
      if (node.name !== "steps") return;
      const data = node.data || (node.data = {});
      const tagName = "steps";
      data.hName = tagName;
      data.hProperties = h4(tagName, node.attributes || {}).properties;
      const heading = node.children.find(
        (child) => child.type === "heading"
      );
      const depth = heading?.depth ?? 2;
      let currentChild;
      const children = [];
      node.children.forEach((child) => {
        if (child.type === "heading" && child.depth === depth) {
          if (currentChild && currentChild.children.length > 0) {
            children.push(currentChild);
          }
          currentChild = {
            type: "paragraph",
            children: [],
            data: {
              hName: "step",
              hProperties: {
                "data-index": children.length,
                "data-depth": depth
              }
            }
          };
        }
        currentChild.children.push(child);
      });
      children.push(currentChild);
      node.children = children;
    });
  };
}

// content-collections.ts
var cwd = process.cwd();
var mdxConfig = {
  remarkPlugins: [
    remarkDirective,
    remarkGfm,
    remarkCallout,
    remarkCodeTitle,
    remarkCodeGroup,
    remarkSteps,
    remarkCard,
    remarkHeading
  ],
  rehypePlugins: [
    rehypeSlug,
    [
      rehypeShiki,
      {
        transformers: [
          transformerNotationDiff(),
          transformerNotationFocus(),
          transformerNotationHighlight(),
          transformerNotationWordHighlight(),
          transformerMetaHighlight(),
          transformerMetaWordHighlight()
        ],
        theme: "plastic"
      }
    ],
    [
      rehypeAutolinkHeadings,
      {
        behavior: "wrap",
        properties: {
          className: ["subheading-anchor"]
        }
      }
    ],
    rehypeToc
  ]
};
var slugify = (str) => {
  return str.replace(/.*\/content\//, "").replace(/\.mdx$/, "").replace(cwd, "");
};
var docs = defineCollection({
  name: "Docs",
  directory: "content/docs",
  include: ["**/*.mdx"],
  schema: (z) => ({
    title: z.string(),
    description: z.string(),
    metadata: z.record(z.string()).optional(),
    content: z.string(),
    status: z.string().optional(),
    toc: z.array(z.string()).optional(),
    code: z.string().optional(),
    llm: z.custom().transform(async (data) => replaceExampleTabs(data?.content ?? "")),
    hideToc: z.boolean().optional(),
    composition: z.boolean().optional(),
    links: z.object({
      source: z.string().optional(),
      storybook: z.string().optional(),
      recipe: z.string().optional(),
      ark: z.string().optional()
    }).optional()
  }),
  transform: async (doc, context) => {
    const code = await compileMDX(context, doc, mdxConfig);
    const links = doc.links || {};
    return {
      ...doc,
      code,
      slug: slugify(doc._meta.path),
      links: {
        ...links,
        source: links.source ? `${docsConfig.repoUrl}/tree/${docsConfig.repoBranch}/packages/react/src/${links.source}` : void 0,
        storybook: links.storybook ? `${docsConfig.storybookUrl}/?path=/story/${links.storybook}` : void 0,
        recipe: links.recipe ? `${docsConfig.repoUrl}/tree/${docsConfig.repoBranch}/packages/react/src/theme/recipes/${links.recipe}.ts` : void 0
      },
      category: doc._meta.path.replace(/.*\/content\//, "").replace(/\/[^/]*$/, "").replace(cwd, "")
    };
  }
});
var notes = defineCollection({
  name: "Notes",
  directory: "content/notes",
  include: ["**/*.mdx"],
  schema: (z) => ({
    title: z.string(),
    description: z.string(),
    metadata: z.record(z.string()).optional(),
    content: z.string(),
    code: z.string().optional()
  }),
  transform: async (doc, context) => {
    const code = await compileMDX(context, doc, mdxConfig);
    return {
      ...doc,
      code
    };
  }
});
var showcases = defineCollection({
  name: "Showcases",
  directory: "content/showcases.json",
  include: ["**/*.mdx"],
  schema: (z) => ({
    title: z.string(),
    description: z.string().optional(),
    url: z.string(),
    image: z.string()
  }),
  transform: async (doc, context) => {
    const code = await compileMDX(context, doc, mdxConfig);
    return {
      ...doc,
      code
    };
  }
});
var blogs = defineCollection({
  name: "Blog",
  directory: "content/blog",
  include: ["**/*.mdx"],
  schema: (z) => ({
    title: z.string(),
    type: z.enum(["release", "announcement", "article"]).default("article"),
    description: z.string(),
    metadata: z.record(z.string()).optional(),
    content: z.string(),
    authors: z.array(z.string()),
    publishedAt: z.string(),
    toc: z.array(z.string()).optional()
  }),
  transform: async (doc, context) => {
    const code = await compileMDX(context, doc, mdxConfig);
    return {
      ...doc,
      code,
      slug: slugify(doc._meta.path)
    };
  }
});
var content_collections_default = defineConfig({
  root: cwd,
  collections: [docs, showcases, notes, blogs]
});
function replaceExampleTabs(text) {
  const matches = text.matchAll(/<ExampleTabs name="([^"]+)" \/>/g);
  if (!matches) return text;
  for (const match of matches) {
    const name = match[1];
    const example = fs.readFileSync(
      `../compositions/src/examples/${name}.tsx`,
      "utf-8"
    );
    text = text.replace(
      `<ExampleTabs name="${name}" />`,
      `\`\`\`tsx
${example}
\`\`\``
    );
  }
  return text;
}
export {
  content_collections_default as default
};
