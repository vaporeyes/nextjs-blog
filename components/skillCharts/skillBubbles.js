import { useEffect, useRef, useState } from 'react'

const SkillBubbles = () => {
  const canvasRef = useRef(null)
  const [activeCategory, setActiveCategory] = useState('all')

  const skillCategories = {
    lifeSkills: [
      { name: 'Cooking', level: 75, color: '#22C55E' },
      { name: 'Drawing', level: 80, color: '#10B981' },
      { name: 'Painting', level: 55, color: '#34D399' },
      { name: 'Model Building', level: 55, color: '#6EE7B7' }
    ],
    programming: [
      { name: 'Python', level: 85, color: '#6366F1' },
      { name: 'Bash/Shell', level: 90, color: '#4F46E5' },
      { name: 'Javascript', level: 69, color: '#818CF8' },
      { name: 'Rust', level: 35, color: '#A5B4FC' },
      { name: 'Elixir', level: 56, color: '#C7D2FE' }
    ],
    devOps: [
      { name: 'CI/CD', level: 75, color: '#F59E0B' },
      { name: 'AWS', level: 80, color: '#FBBF24' },
      { name: 'GCP', level: 45, color: '#FCD34D' },
      { name: 'Azure', level: 15, color: '#FDE68A' },
      { name: 'Terraform', level: 55, color: '#FEF3C7' },
      { name: 'Elasticsearch', level: 75, color: '#D97706' }
    ]
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let bubbles = []
    let animationFrameId
    let isDragging = false
    let draggedBubble = null

    // Set canvas dimensions
    const updateSize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = 400
    }

    window.addEventListener('resize', updateSize)
    updateSize()

    // Create bubbles
    const createBubbles = () => {
      bubbles = []

      let allSkills = []
      if (activeCategory === 'all') {
        Object.values(skillCategories).forEach(skills => {
          allSkills = [...allSkills, ...skills]
        })
      } else {
        allSkills = skillCategories[activeCategory] || []
      }

      // Calculate positions in a more organized way
      const gridSize = Math.ceil(Math.sqrt(allSkills.length))
      const cellWidth = canvas.width / gridSize
      const cellHeight = canvas.height / gridSize

      allSkills.forEach((skill, index) => {
        const radius = 20 + (skill.level / 100) * 40

        // Compute grid position
        const row = Math.floor(index / gridSize)
        const col = index % gridSize

        // Place bubble in cell center with some random offset
        const centerX = col * cellWidth + cellWidth / 2
        const centerY = row * cellHeight + cellHeight / 2

        // Add small random offset for natural appearance
        const offsetX = (Math.random() - 0.5) * (cellWidth * 0.5)
        const offsetY = (Math.random() - 0.5) * (cellHeight * 0.5)

        bubbles.push({
          x: centerX + offsetX,
          y: centerY + offsetY,
          radius,
          // Much smaller initial velocities - makes bubbles less bouncy
          dx: (Math.random() - 0.5) * 0.5,
          dy: (Math.random() - 0.5) * 0.5,
          name: skill.name,
          level: skill.level,
          color: skill.color,
          hover: false,
          // Target position for gentle movements
          targetX: centerX,
          targetY: centerY
        })
      })
    }

    createBubbles()

    // Handle mouse interactions
    const handleMouseMove = e => {
      const rect = canvas.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top

      bubbles.forEach(bubble => {
        const distance = Math.sqrt(
          Math.pow(mouseX - bubble.x, 2) + Math.pow(mouseY - bubble.y, 2)
        )

        bubble.hover = distance < bubble.radius

        if (isDragging && draggedBubble === bubble) {
          bubble.x = mouseX
          bubble.y = mouseY
          // Update target position when dragging
          bubble.targetX = mouseX
          bubble.targetY = mouseY
          // Reset velocity when dragging
          bubble.dx = 0
          bubble.dy = 0
        }
      })
    }

    const handleMouseDown = e => {
      const rect = canvas.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top

      bubbles.forEach(bubble => {
        const distance = Math.sqrt(
          Math.pow(mouseX - bubble.x, 2) + Math.pow(mouseY - bubble.y, 2)
        )

        if (distance < bubble.radius) {
          isDragging = true
          draggedBubble = bubble
        }
      })
    }

    const handleMouseUp = () => {
      isDragging = false
      draggedBubble = null

      // Much gentler momentum when released
      bubbles.forEach(bubble => {
        if (bubble.dx === 0 && bubble.dy === 0) {
          bubble.dx = (Math.random() - 0.5) * 0.3
          bubble.dy = (Math.random() - 0.5) * 0.3
        }
      })
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mousedown', handleMouseDown)
    canvas.addEventListener('mouseup', handleMouseUp)
    canvas.addEventListener('mouseleave', handleMouseUp)

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      bubbles.forEach(bubble => {
        // Update position with gentle movement
        bubble.x += bubble.dx
        bubble.y += bubble.dy

        // Apply drag force for more dampened movement
        bubble.dx *= 0.98
        bubble.dy *= 0.98

        // Gentle movement toward target position (subtle attraction to origin)
        const tx = bubble.targetX - bubble.x
        const ty = bubble.targetY - bubble.y
        const distance = Math.sqrt(tx * tx + ty * ty)

        // Very subtle attraction to target position
        if (distance > 1) {
          bubble.dx += tx * 0.001
          bubble.dy += ty * 0.001
        }

        // Bounce off walls with reduced energy
        if (bubble.x - bubble.radius < 0) {
          bubble.x = bubble.radius
          bubble.dx = Math.abs(bubble.dx) * 0.8 // Reduce energy
        } else if (bubble.x + bubble.radius > canvas.width) {
          bubble.x = canvas.width - bubble.radius
          bubble.dx = -Math.abs(bubble.dx) * 0.8 // Reduce energy
        }

        if (bubble.y - bubble.radius < 0) {
          bubble.y = bubble.radius
          bubble.dy = Math.abs(bubble.dy) * 0.8 // Reduce energy
        } else if (bubble.y + bubble.radius > canvas.height) {
          bubble.y = canvas.height - bubble.radius
          bubble.dy = -Math.abs(bubble.dy) * 0.8 // Reduce energy
        }

        // Collision detection with gentler responses
        bubbles.forEach(otherBubble => {
          if (bubble !== otherBubble) {
            const dx = otherBubble.x - bubble.x
            const dy = otherBubble.y - bubble.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            const minDistance = bubble.radius + otherBubble.radius

            if (distance < minDistance) {
              // Calculate gentler collision response
              const angle = Math.atan2(dy, dx)
              const targetX = bubble.x + Math.cos(angle) * minDistance
              const targetY = bubble.y + Math.sin(angle) * minDistance

              // Move bubbles apart more gently
              const ax = (targetX - otherBubble.x) * 0.03 // Reduced from 0.05
              const ay = (targetY - otherBubble.y) * 0.03 // Reduced from 0.05

              bubble.dx -= ax
              bubble.dy -= ay
              otherBubble.dx += ax
              otherBubble.dy += ay

              // Apply maximum velocity limit
              const maxVelocity = 2
              bubble.dx = Math.max(
                Math.min(bubble.dx, maxVelocity),
                -maxVelocity
              )
              bubble.dy = Math.max(
                Math.min(bubble.dy, maxVelocity),
                -maxVelocity
              )
              otherBubble.dx = Math.max(
                Math.min(otherBubble.dx, maxVelocity),
                -maxVelocity
              )
              otherBubble.dy = Math.max(
                Math.min(otherBubble.dy, maxVelocity),
                -maxVelocity
              )
            }
          }
        })

        // Draw bubble
        ctx.beginPath()
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2)
        ctx.fillStyle = bubble.hover ? `${bubble.color}dd` : `${bubble.color}aa`
        ctx.fill()

        // Draw skill name
        ctx.fillStyle = 'white'
        ctx.font = `${bubble.hover ? 'bold ' : ''}${Math.max(
          12,
          bubble.radius / 4
        )}px sans-serif`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(bubble.name, bubble.x, bubble.y - 5)

        // Draw skill level
        ctx.fillStyle = 'white'
        ctx.font = `${Math.max(10, bubble.radius / 5)}px monospace`
        ctx.fillText(`${bubble.level}%`, bubble.x, bubble.y + 15)
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', updateSize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mousedown', handleMouseDown)
      canvas.removeEventListener('mouseup', handleMouseUp)
      canvas.removeEventListener('mouseleave', handleMouseUp)
      cancelAnimationFrame(animationFrameId)
    }
  }, [activeCategory])

  return (
    <div className='my-8'>
      <h2 className='text-center text-3xl font-bold mb-6'>Skills Universe</h2>

      <div className='flex justify-center gap-3 mb-6'>
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-3 py-1 rounded-full text-sm ${
            activeCategory === 'all'
              ? 'bg-gray-800 text-white dark:bg-gray-100 dark:text-gray-900'
              : 'bg-gray-200 dark:bg-gray-700'
          }`}
        >
          All Skills
        </button>
        <button
          onClick={() => setActiveCategory('lifeSkills')}
          className={`px-3 py-1 rounded-full text-sm ${
            activeCategory === 'lifeSkills'
              ? 'bg-green-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700'
          }`}
        >
          Life Skills
        </button>
        <button
          onClick={() => setActiveCategory('programming')}
          className={`px-3 py-1 rounded-full text-sm ${
            activeCategory === 'programming'
              ? 'bg-indigo-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700'
          }`}
        >
          Programming
        </button>
        <button
          onClick={() => setActiveCategory('devOps')}
          className={`px-3 py-1 rounded-full text-sm ${
            activeCategory === 'devOps'
              ? 'bg-amber-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700'
          }`}
        >
          DevOps
        </button>
      </div>

      <div className='border dark:border-gray-700 rounded-lg overflow-hidden'>
        <canvas
          ref={canvasRef}
          className='w-full h-[400px] bg-gray-50 dark:bg-gray-800'
        ></canvas>
      </div>

      <p className='text-center text-sm mt-3 text-gray-500 dark:text-gray-400'>
        Drag bubbles to interact • Bubble size represents skill level
      </p>
    </div>
  )
}

export default SkillBubbles
