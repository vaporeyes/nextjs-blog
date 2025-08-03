// ABOUTME: Interactive force-directed graph component for visualizing knowledge connections
// ABOUTME: Uses D3 force simulation with canvas rendering for performance

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3-force';
import { constellationData } from '../data/constellation';
import { ConstellationNode, ConstellationLink } from '../types/constellation';

const Constellation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    // Set canvas dimensions
    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Create a deep copy of nodes for simulation
    const nodes: ConstellationNode[] = constellationData.nodes.map(d => ({ ...d }));
    const links: ConstellationLink[] = constellationData.links.map(d => ({ ...d }));

    // Create the force simulation
    const simulation = d3.forceSimulation<ConstellationNode>(nodes)
      .force('link', d3.forceLink<ConstellationNode, ConstellationLink>(links)
        .id(d => d.id)
        .strength(d => d.strength || 0.5)
      )
      .force('charge', d3.forceManyBody()
        .strength(-300)
        .distanceMax(400)
      )
      .force('center', d3.forceCenter(canvas.width / 2, canvas.height / 2))
      .force('collision', d3.forceCollide<ConstellationNode>()
        .radius(d => d.radius + 5)
      );

    // Define node colors based on type
    const getNodeColor = (type: string): string => {
      switch (type) {
        case 'core': return '#f59e0b'; // Amber
        case 'skill': return '#3b82f6'; // Blue
        case 'interest': return '#10b981'; // Emerald
        case 'book': return '#8b5cf6'; // Violet
        case 'project': return '#ef4444'; // Red
        case 'concept': return '#64748b'; // Slate
        default: return '#6b7280'; // Gray
      }
    };

    // Draw function
    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.save();

      // Draw links
      context.globalAlpha = 0.3;
      context.strokeStyle = '#9ca3af';
      context.lineWidth = 1;
      
      links.forEach(link => {
        const source = link.source as any;
        const target = link.target as any;
        
        if (source && target && source.x && source.y && target.x && target.y) {
          context.beginPath();
          context.moveTo(source.x, source.y);
          context.lineTo(target.x, target.y);
          context.stroke();
        }
      });

      // Draw nodes
      context.globalAlpha = 1;
      nodes.forEach(node => {
        if (node.x && node.y) {
          // Draw node circle
          context.beginPath();
          context.arc(node.x, node.y, node.radius, 0, 2 * Math.PI);
          context.fillStyle = node.color || getNodeColor(node.type);
          context.fill();
          context.strokeStyle = '#ffffff';
          context.lineWidth = 2;
          context.stroke();

          // Draw node label
          context.fillStyle = '#1f2937';
          context.font = `${node.type === 'core' ? '14px' : '12px'} sans-serif`;
          context.textAlign = 'center';
          context.textBaseline = 'middle';
          context.fillText(node.label, node.x, node.y + node.radius + 15);
        }
      });

      context.restore();
    };

    // Set up the tick function
    simulation.on('tick', draw);

    // Handle window resize
    const handleResize = () => {
      updateCanvasSize();
      simulation.force('center', d3.forceCenter(canvas.width / 2, canvas.height / 2));
      simulation.alpha(0.3).restart();
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      simulation.stop();
      window.removeEventListener('resize', updateCanvasSize);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="constellation-container" style={{ width: '100%', height: '600px', position: 'relative' }}>
      <canvas 
        ref={canvasRef}
        style={{ width: '100%', height: '100%' }}
        className="constellation-canvas"
      />
    </div>
  );
};

export default Constellation;