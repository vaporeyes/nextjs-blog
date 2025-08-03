// ABOUTME: Interactive force-directed graph component for visualizing knowledge connections
// ABOUTME: Uses D3 force simulation with canvas rendering for performance

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3-force';
import * as d3Drag from 'd3-drag';
import * as d3Selection from 'd3-selection';
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

    // Track hovered node and mouse position
    let hoveredNode: ConstellationNode | null = null;
    let mouseX = 0;
    let mouseY = 0;

    // Draw function
    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.save();

      // Set background
      const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      // Draw links
      links.forEach(link => {
        const source = link.source as any;
        const target = link.target as any;
        
        if (source && target && source.x && source.y && target.x && target.y) {
          context.beginPath();
          context.moveTo(source.x, source.y);
          context.lineTo(target.x, target.y);
          
          // Highlight links connected to hovered node
          if (hoveredNode && (source.id === hoveredNode.id || target.id === hoveredNode.id)) {
            context.globalAlpha = 0.8;
            context.strokeStyle = '#3b82f6';
            context.lineWidth = 2;
          } else {
            context.globalAlpha = 0.2;
            context.strokeStyle = isDarkMode ? '#6b7280' : '#9ca3af';
            context.lineWidth = 1;
          }
          context.stroke();
          
          // Draw link labels for highlighted links
          if (hoveredNode && link.label && (source.id === hoveredNode.id || target.id === hoveredNode.id)) {
            const midX = (source.x + target.x) / 2;
            const midY = (source.y + target.y) / 2;
            
            context.save();
            context.globalAlpha = 0.9;
            context.fillStyle = isDarkMode ? '#e5e7eb' : '#374151';
            context.font = '10px sans-serif';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            
            // Add background for better readability
            const metrics = context.measureText(link.label);
            const padding = 4;
            context.fillStyle = isDarkMode ? '#1f2937' : '#ffffff';
            context.fillRect(
              midX - metrics.width / 2 - padding,
              midY - 8,
              metrics.width + padding * 2,
              16
            );
            
            context.fillStyle = isDarkMode ? '#e5e7eb' : '#374151';
            context.fillText(link.label, midX, midY);
            context.restore();
          }
        }
      });

      // Draw nodes
      context.globalAlpha = 1;
      nodes.forEach(node => {
        if (node.x && node.y) {
          const isHovered = node === hoveredNode;
          const isConnected = hoveredNode && links.some(link => {
            const source = (link.source as any).id || link.source;
            const target = (link.target as any).id || link.target;
            return (source === hoveredNode!.id && target === node.id) || 
                   (target === hoveredNode!.id && source === node.id);
          });
          
          // Draw node circle
          context.beginPath();
          context.arc(node.x, node.y, node.radius * (isHovered ? 1.2 : 1), 0, 2 * Math.PI);
          
          // Node styling
          if (isHovered) {
            context.fillStyle = node.color || getNodeColor(node.type);
            context.globalAlpha = 1;
          } else if (hoveredNode && !isConnected && node !== hoveredNode) {
            context.fillStyle = isDarkMode ? '#374151' : '#e5e7eb';
            context.globalAlpha = 0.3;
          } else {
            context.fillStyle = node.color || getNodeColor(node.type);
            context.globalAlpha = isConnected ? 1 : 0.8;
          }
          
          context.fill();
          context.globalAlpha = 1;
          context.strokeStyle = isHovered ? '#ffffff' : (isDarkMode ? '#374151' : '#ffffff');
          context.lineWidth = isHovered ? 3 : 2;
          context.stroke();

          // Draw node label
          const labelSize = node.type === 'core' ? 14 : 12;
          context.font = `${isHovered ? 'bold' : 'normal'} ${labelSize}px sans-serif`;
          context.fillStyle = isDarkMode ? '#e5e7eb' : '#1f2937';
          context.textAlign = 'center';
          context.textBaseline = 'middle';
          
          if (!hoveredNode || isHovered || isConnected) {
            context.globalAlpha = isHovered ? 1 : 0.8;
            context.fillText(node.label, node.x, node.y + node.radius + 15);
          }
        }
      });

      // Draw tooltip for hovered node
      if (hoveredNode && hoveredNode.x && hoveredNode.y) {
        context.save();
        
        // Prepare tooltip text
        const tooltipLines = [
          `Type: ${hoveredNode.type}`,
          `Connections: ${links.filter(l => {
            const source = (l.source as any).id || l.source;
            const target = (l.target as any).id || l.target;
            return source === hoveredNode!.id || target === hoveredNode!.id;
          }).length}`
        ];
        
        // Calculate tooltip dimensions
        context.font = 'bold 12px sans-serif';
        const titleWidth = context.measureText(hoveredNode.label).width;
        context.font = '11px sans-serif';
        const maxLineWidth = Math.max(
          titleWidth,
          ...tooltipLines.map(line => context.measureText(line).width)
        );
        
        const padding = 10;
        const lineHeight = 16;
        const tooltipWidth = maxLineWidth + padding * 2;
        const tooltipHeight = padding * 2 + lineHeight * (tooltipLines.length + 1);
        
        // Position tooltip
        let tooltipX = mouseX + 15;
        let tooltipY = mouseY - tooltipHeight - 5;
        
        // Keep tooltip on screen
        if (tooltipX + tooltipWidth > canvas.width) {
          tooltipX = mouseX - tooltipWidth - 15;
        }
        if (tooltipY < 0) {
          tooltipY = mouseY + 15;
        }
        
        // Draw tooltip background
        context.fillStyle = isDarkMode ? '#1f2937' : '#ffffff';
        context.strokeStyle = isDarkMode ? '#374151' : '#e5e7eb';
        context.lineWidth = 1;
        
        // Draw rounded rectangle (polyfill for older browsers)
        const radius = 4;
        context.beginPath();
        context.moveTo(tooltipX + radius, tooltipY);
        context.arcTo(tooltipX + tooltipWidth, tooltipY, tooltipX + tooltipWidth, tooltipY + tooltipHeight, radius);
        context.arcTo(tooltipX + tooltipWidth, tooltipY + tooltipHeight, tooltipX, tooltipY + tooltipHeight, radius);
        context.arcTo(tooltipX, tooltipY + tooltipHeight, tooltipX, tooltipY, radius);
        context.arcTo(tooltipX, tooltipY, tooltipX + tooltipWidth, tooltipY, radius);
        context.closePath();
        context.fill();
        context.stroke();
        
        // Draw tooltip text
        context.fillStyle = isDarkMode ? '#e5e7eb' : '#1f2937';
        context.font = 'bold 12px sans-serif';
        context.fillText(hoveredNode.label, tooltipX + padding, tooltipY + padding + 10);
        
        context.font = '11px sans-serif';
        tooltipLines.forEach((line, i) => {
          context.fillText(
            line,
            tooltipX + padding,
            tooltipY + padding + 25 + i * lineHeight
          );
        });
        
        context.restore();
      }

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

    // Drag functionality
    let draggedNode: ConstellationNode | null = null;

    // Find node at mouse position
    const findNode = (x: number, y: number): ConstellationNode | null => {
      for (let i = nodes.length - 1; i >= 0; i--) {
        const node = nodes[i];
        if (node.x && node.y) {
          const dx = x - node.x;
          const dy = y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance <= node.radius) {
            return node;
          }
        }
      }
      return null;
    };

    // Drag event handlers
    const dragstarted = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      draggedNode = findNode(x, y);
      if (draggedNode) {
        simulation.alphaTarget(0.3).restart();
        draggedNode.fx = draggedNode.x;
        draggedNode.fy = draggedNode.y;
        canvas.style.cursor = 'grabbing';
      }
    };

    const dragged = (event: MouseEvent) => {
      if (draggedNode) {
        const rect = canvas.getBoundingClientRect();
        draggedNode.fx = event.clientX - rect.left;
        draggedNode.fy = event.clientY - rect.top;
      }
    };

    const dragended = () => {
      if (draggedNode) {
        simulation.alphaTarget(0);
        draggedNode.fx = null;
        draggedNode.fy = null;
        draggedNode = null;
        canvas.style.cursor = 'default';
      }
    };

    // Mouse event handlers
    const handleMouseDown = (event: MouseEvent) => {
      dragstarted(event);
      
      const handleMouseMove = (event: MouseEvent) => {
        dragged(event);
      };
      
      const handleMouseUp = () => {
        dragended();
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
      
      if (draggedNode) {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
      }
    };

    // Add mouse hover effect
    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = event.clientX - rect.left;
      mouseY = event.clientY - rect.top;
      
      if (!draggedNode) {
        const node = findNode(mouseX, mouseY);
        if (node !== hoveredNode) {
          hoveredNode = node;
          draw(); // Redraw when hover state changes
        }
        canvas.style.cursor = node ? 'grab' : 'default';
      }
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      simulation.stop();
      window.removeEventListener('resize', updateCanvasSize);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
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