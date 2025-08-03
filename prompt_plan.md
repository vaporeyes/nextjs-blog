# Prompt Plan: The "Constellation of Knowledge" ✅ COMPLETED

**Objective**: Create a dynamic, interactive force-directed graph component using TypeScript, D3, and React to visually represent the user's skills, interests, and the connections between them. This will replace the `SkillVisualizer` component.

## Phase 1: Setup and Data Modeling

**Goal**: Establish the necessary libraries and create a strongly-typed data structure for the constellation.

> **Prompt 1.1: Install Dependencies**
>
> "Add the D3 force-simulation library and its TypeScript types to the project. Use the following command:
> `yarn add d3-force d3-drag`
> `yarn add -D @types/d3-force @types/d3-drag`"

> **Prompt 1.2: Define Data Types**
>
> "In the `types/` directory, create a new file named `constellation.ts`. In this file, define and export the TypeScript interfaces for our graph data.
>
> ```typescript
> // types/constellation.ts
> ```

> // The NodeType will help us style nodes differently
> export type NodeType = 'core' | 'skill' | 'interest' | 'book' | 'project' | 'concept';

> // SimulationNode extends the D3 SimulationNodeDatum interface
> export interface ConstellationNode extends d3.SimulationNodeDatum {
> id: string; // Unique identifier
> label: string;
> type: NodeType;
> radius: number; // For sizing the node circle
> color?: string; // Optional specific color
> }

> // SimulationLink extends the D3 SimulationLinkDatum interface
> export interface ConstellationLink extends d3.SimulationLinkDatum<ConstellationNode> {
> source: string; // ID of the source node
> target: string; // ID of the target node
> label?: string; // Optional label for the connection
> strength?: number; // Optional link strength
> }

> export interface ConstellationData {
> nodes: ConstellationNode[];
> links: ConstellationLink[];
> }
>
> ```"
> ```

> **Prompt 1.3: Create Constellation Data**
>
> "Create a new file at `data/constellation.ts`. Import the types from `types/constellation.ts` and create an exported constant named `constellationData`.
>
> Populate it with a small, representative sample of your data. Ensure you create a few 'core' nodes (like Software Development, Literature) and link other nodes to them. Also, create at least one link *between* different core concepts.
>
> Here's a starting structure:
>
> ```typescript
> // data/constellation.ts
> import { ConstellationData } from '../types/constellation';
> ```

> export const constellationData: ConstellationData = {
> nodes: [
> // Core Nodes
> { id: 'dev', label: 'Software Development', type: 'core', radius: 35 },
> { id: 'lit', label: 'Literature', type: 'core', radius: 35 },
> { id: 'life', label: 'Life', type: 'core', radius: 35 },

> ```
> // Skill Nodes
> { id: 'react', label: 'React', type: 'skill', radius: 20 },
> { id: 'dataviz', label: 'Data Viz', type: 'skill', radius: 20 },
> ```

> ```
> // Book Node
> { id: '3body', label: 'The 3-Body Problem', type: 'book', radius: 15 },
> ```

> ```
> // Concept Node
> { id: 'synthesis', label: 'Synthesis', type: 'concept', radius: 12 },
> ```
>
> ],
> links: [
> // Links to Cores
> { source: 'dev', target: 'react', strength: 0.7 },
> { source: 'dev', target: 'dataviz', strength: 0.7 },
> { source: 'lit', target: '3body', strength: 0.7 },

> ```
> // The "Magic" Link between concepts
> { source: 'dataviz', target: '3body', label: 'Inspired by complex systems', strength: 0.1 },
> { source: 'dev', target: 'synthesis', strength: 0.1 },
> { source: 'lit', target: 'synthesis', strength: 0.1 },
> ```
>
> ],
> };
>
> ```"
> ```

## Phase 2: Component Implementation & Rendering

**Goal**: Build the React component that will run the physics simulation and render the constellation on a canvas.

> **Prompt 2.1: Create the Constellation Component Shell**
>
> "Create a new component at `components/Constellation.tsx`. It should:
>
> 1.  Import React, `useEffect`, and `useRef`.
> 2.  Import the `constellationData` and the relevant types.
> 3.  Define a functional component `Constellation`.
> 4.  Inside the component, create a `canvasRef` using `useRef<HTMLCanvasElement | null>(null)`.
> 5.  Return a `<canvas>` element with the `ref` attached."

> **Prompt 2.2: Initialize and Run the D3 Simulation**
>
> "Inside the `Constellation.tsx` component, create a `useEffect` hook that runs once on mount. This hook should contain all the D3 simulation logic.
>
> 1.  Get the canvas and its 2D rendering context.
> 2.  Set up the D3 `forceSimulation` using the nodes from our data.
> 3.  Add forces: `forceLink` (using our links data), `forceManyBody` (for repulsion), and `forceCenter`.
> 4.  Define a `ticked` function. This function will be called on every step of the simulation. Inside `ticked`, write the canvas rendering logic: clear the canvas, then loop through all links to draw lines and all nodes to draw circles.
> 5.  Connect the `ticked` function to the simulation's 'tick' event.
> 6.  Make the component responsive by setting canvas dimensions based on its parent container and handling window resize events."

## Phase 3: Interactivity and Final Polish

**Goal**: Make the constellation interactive and visually appealing, then integrate it into the "About" page.

> **Prompt 3.1: Implement Node Dragging**
>
> "Enhance the `useEffect` hook in `Constellation.tsx`. Use `d3.drag` to add drag-and-drop functionality to the nodes.
>
> 1.  Create a drag handler using `d3.drag()`.
> 2.  Implement the `dragstarted`, `dragged`, and `dragended` functions.
>       * On `dragstarted`, restart the simulation's alpha target to "wake up" the simulation.
>       * On `dragged`, update the node's `fx` and `fy` (fixed position) to the cursor's position.
>       * On `dragended`, release the fixed position by setting `fx` and `fy` to `null` and cool down the simulation.
> 3.  Apply the drag handler to the canvas element."

> **Prompt 3.2: Add Hover Tooltips and Styling**
>
> "Let's refine the visual presentation.
>
> 1.  Modify the rendering logic. Use a color scheme to draw nodes based on their `type` property (e.g., skills are blue, books are green, core concepts are gold).
> 2.  Draw the `label` for each node near its circle.
> 3.  Implement a `mousemove` event listener on the canvas. When the mouse hovers near a node, draw its label with a larger font or in a different color to act as a tooltip. Also, draw the labels for any connected links."

> **Prompt 3.3: Final Integration**
>
> "Finally, let's replace the old visualizer.
>
> 1.  Go to `pages/about.tsx`.
> 2.  Remove the `SkillVisualizer` component.
> 3.  Import and render the new `Constellation` component in its place. Ensure it is placed within a container `div` that has defined dimensions so the canvas can size itself correctly."