// ABOUTME: Type declarations for rehype plugins that don't have type definitions
// ABOUTME: Allows TypeScript to work with these JavaScript modules

declare module 'rehype-figure';
declare module 'rehype-img-size';

// Fix for rehype-highlight type issue
declare module 'rehype-highlight' {
  const rehypeHighlight: any;
  export default rehypeHighlight;
}