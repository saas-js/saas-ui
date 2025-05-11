import configuration from "../../content-collections.ts";
import { GetTypeByName } from "@content-collections/core";

export type Doc = GetTypeByName<typeof configuration, "Docs">;
export declare const allDocs: Array<Doc>;

export type Showcase = GetTypeByName<typeof configuration, "Showcases">;
export declare const allShowcases: Array<Showcase>;

export type Note = GetTypeByName<typeof configuration, "Notes">;
export declare const allNotes: Array<Note>;

export type Blog = GetTypeByName<typeof configuration, "Blog">;
export declare const allBlogs: Array<Blog>;

export {};
