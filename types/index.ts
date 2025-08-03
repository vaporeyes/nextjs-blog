// ABOUTME: Type definitions for content items throughout the blog
// ABOUTME: Defines the structure of markdown frontmatter data and related types

export interface ContentItem {
  id: string;
  title: string;
  date: string;
  tags: string[];
  contentHtml: string;
}