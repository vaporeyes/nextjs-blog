// ABOUTME: Constellation data defining the nodes and links for the knowledge graph
// ABOUTME: Contains core concepts, skills, interests, books, and their relationships

import { ConstellationData } from '../types/constellation';

export const constellationData: ConstellationData = {
  nodes: [
    // Core Nodes
    { id: 'dev', label: 'Software Development', type: 'core', radius: 35 },
    { id: 'lit', label: 'Literature', type: 'core', radius: 35 },
    { id: 'life', label: 'Life', type: 'core', radius: 35 },
    
    // Skill Nodes
    { id: 'react', label: 'React', type: 'skill', radius: 20 },
    { id: 'dataviz', label: 'Data Viz', type: 'skill', radius: 20 },
    { id: 'typescript', label: 'TypeScript', type: 'skill', radius: 20 },
    { id: 'nodejs', label: 'Node.js', type: 'skill', radius: 20 },
    
    // Interest Nodes
    { id: 'fitness', label: 'Fitness', type: 'interest', radius: 18 },
    { id: 'cooking', label: 'Cooking', type: 'interest', radius: 18 },
    { id: 'philosophy', label: 'Philosophy', type: 'interest', radius: 18 },
    
    // Book Nodes
    { id: '3body', label: 'The 3-Body Problem', type: 'book', radius: 15 },
    { id: 'joyce', label: 'Ulysses', type: 'book', radius: 15 },
    { id: 'twoyears', label: 'Two Years Before the Mast', type: 'book', radius: 15 },
    
    // Project Nodes
    { id: 'blog', label: 'Personal Blog', type: 'project', radius: 17 },
    { id: 'cloudflare', label: 'Cloudflare Integration', type: 'project', radius: 17 },
    
    // Concept Nodes
    { id: 'synthesis', label: 'Synthesis', type: 'concept', radius: 12 },
    { id: 'systems', label: 'Complex Systems', type: 'concept', radius: 12 },
    { id: 'growth', label: 'Personal Growth', type: 'concept', radius: 12 },
  ],
  links: [
    // Links from Core to Skills
    { source: 'dev', target: 'react', strength: 0.7 },
    { source: 'dev', target: 'dataviz', strength: 0.7 },
    { source: 'dev', target: 'typescript', strength: 0.7 },
    { source: 'dev', target: 'nodejs', strength: 0.7 },
    
    // Links from Core to Interests
    { source: 'life', target: 'fitness', strength: 0.6 },
    { source: 'life', target: 'cooking', strength: 0.6 },
    { source: 'life', target: 'philosophy', strength: 0.6 },
    
    // Links from Core to Books
    { source: 'lit', target: '3body', strength: 0.7 },
    { source: 'lit', target: 'joyce', strength: 0.7 },
    { source: 'lit', target: 'twoyears', strength: 0.7 },
    
    // Links from Core to Projects
    { source: 'dev', target: 'blog', strength: 0.8 },
    { source: 'dev', target: 'cloudflare', strength: 0.6 },
    
    // Links to Concepts
    { source: 'dev', target: 'synthesis', strength: 0.4 },
    { source: 'lit', target: 'synthesis', strength: 0.4 },
    { source: 'life', target: 'growth', strength: 0.5 },
    { source: 'philosophy', target: 'growth', strength: 0.4 },
    
    // Interesting Cross-Domain Links
    { source: 'dataviz', target: '3body', label: 'Inspired by complex systems', strength: 0.3 },
    { source: '3body', target: 'systems', strength: 0.5 },
    { source: 'systems', target: 'dataviz', strength: 0.4 },
    { source: 'joyce', target: 'synthesis', label: 'Stream of consciousness', strength: 0.3 },
    { source: 'fitness', target: 'growth', strength: 0.5 },
    { source: 'blog', target: 'synthesis', label: 'Writing as thinking', strength: 0.3 },
  ],
};