// ABOUTME: TypeScript interfaces for the constellation graph data structure
// ABOUTME: Defines node types, link structures, and data models for D3 force simulation

import * as d3 from 'd3-force';

// The NodeType will help us style nodes differently
export type NodeType = 'core' | 'skill' | 'interest' | 'book' | 'project' | 'concept';

// SimulationNode extends the D3 SimulationNodeDatum interface
export interface ConstellationNode extends d3.SimulationNodeDatum {
  id: string; // Unique identifier
  label: string;
  type: NodeType;
  radius: number; // For sizing the node circle
  color?: string; // Optional specific color
}

// SimulationLink extends the D3 SimulationLinkDatum interface
export interface ConstellationLink extends d3.SimulationLinkDatum<ConstellationNode> {
  source: string; // ID of the source node
  target: string; // ID of the target node
  label?: string; // Optional label for the connection
  strength?: number; // Optional link strength
}

export interface ConstellationData {
  nodes: ConstellationNode[];
  links: ConstellationLink[];
}