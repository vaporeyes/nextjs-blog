import { useState } from 'react'

const RadarChart = () => {
  const categories = ['Life Skills', 'Programming', 'DevOps']
  const [activeCategory, setActiveCategory] = useState('Life Skills')

  const skillData = {
    'Life Skills': [
      { name: 'Cooking', value: 75 },
      { name: 'Drawing', value: 80 },
      { name: 'Painting', value: 55 },
      { name: 'Model Building', value: 55 }
    ],
    Programming: [
      { name: 'Python', value: 85 },
      { name: 'Bash/Shell', value: 90 },
      { name: 'Javascript', value: 69 },
      { name: 'Rust', value: 35 },
      { name: 'Elixir', value: 56 }
    ],
    DevOps: [
      { name: 'CI/CD', value: 75 },
      { name: 'AWS', value: 80 },
      { name: 'GCP', value: 45 },
      { name: 'Azure', value: 15 },
      { name: 'Terraform', value: 55 },
      { name: 'Elasticsearch', value: 75 }
    ]
  }

  // Generate polygon points for the radar chart
  const generatePoints = (skills, size = 150) => {
    const center = size / 2
    const angleStep = (2 * Math.PI) / skills.length

    return skills
      .map((skill, i) => {
        const angle = i * angleStep - Math.PI / 2 // Start from top
        const distance = (skill.value / 100) * center
        const x = center + distance * Math.cos(angle)
        const y = center + distance * Math.sin(angle)
        return `${x},${y}`
      })
      .join(' ')
  }

  // Generate background grid points
  const generateGridPoints = (count, value, size = 150) => {
    const center = size / 2
    const angleStep = (2 * Math.PI) / count
    const distance = (value / 100) * center

    return Array.from({ length: count })
      .map((_, i) => {
        const angle = i * angleStep - Math.PI / 2
        const x = center + distance * Math.cos(angle)
        const y = center + distance * Math.sin(angle)
        return `${x},${y}`
      })
      .join(' ')
  }

  const skills = skillData[activeCategory]
  const chartSize = 300
  const center = chartSize / 2

  return (
    <div className='my-8'>
      <h2 className='text-center text-3xl font-bold mb-6'>Skill Radar</h2>

      <div className='flex justify-center gap-4 mb-8'>
        {categories.map(category => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full transition-colors ${
              activeCategory === category
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-white dark:bg-gray-700'
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className='flex flex-col md:flex-row items-center justify-center gap-8'>
        <div
          className='relative'
          style={{ width: `${chartSize}px`, height: `${chartSize}px` }}
        >
          <svg
            width={chartSize}
            height={chartSize}
            viewBox={`0 0 ${chartSize} ${chartSize}`}
          >
            {/* Background circles */}
            {[20, 40, 60, 80, 100].map(value => (
              <circle
                key={value}
                cx={center}
                cy={center}
                r={(value / 100) * center}
                fill='none'
                stroke='currentColor'
                strokeOpacity='0.1'
                strokeWidth='1'
              />
            ))}

            {/* Axis lines */}
            {skills.map((_, i) => {
              const angle = (i * 2 * Math.PI) / skills.length - Math.PI / 2
              return (
                <line
                  key={i}
                  x1={center}
                  y1={center}
                  x2={center + center * Math.cos(angle)}
                  y2={center + center * Math.sin(angle)}
                  stroke='currentColor'
                  strokeOpacity='0.2'
                  strokeWidth='1'
                />
              )
            })}

            {/* Skill polygon */}
            <polygon
              points={generatePoints(skills, chartSize)}
              fill='rgba(59, 130, 246, 0.5)'
              stroke='#3B82F6'
              strokeWidth='2'
            />

            {/* Skill points */}
            {skills.map((skill, i) => {
              const angle = (i * 2 * Math.PI) / skills.length - Math.PI / 2
              const distance = (skill.value / 100) * center
              const x = center + distance * Math.cos(angle)
              const y = center + distance * Math.sin(angle)

              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r='4'
                  fill='#3B82F6'
                  stroke='white'
                  strokeWidth='2'
                />
              )
            })}

            {/* Skill labels */}
            {skills.map((skill, i) => {
              const angle = (i * 2 * Math.PI) / skills.length - Math.PI / 2
              const labelDistance = center + 15
              const x = center + labelDistance * Math.cos(angle)
              const y = center + labelDistance * Math.sin(angle)

              // Adjust text anchor based on position
              const textAnchor =
                angle === -Math.PI / 2
                  ? 'middle'
                  : angle > -Math.PI / 2 && angle < Math.PI / 2
                  ? 'start'
                  : 'end'

              const dy =
                angle === -Math.PI / 2
                  ? '-0.5em'
                  : angle === Math.PI / 2
                  ? '1em'
                  : '0.3em'

              return (
                <text
                  key={i}
                  x={x}
                  y={y}
                  textAnchor={textAnchor}
                  dy={dy}
                  fontSize='12'
                  fontWeight='500'
                >
                  {skill.name}
                </text>
              )
            })}
          </svg>
        </div>

        <div className='space-y-4 w-full max-w-xs'>
          {skills.map(skill => (
            <div key={skill.name} className='space-y-1'>
              <div className='flex justify-between text-sm'>
                <span>{skill.name}</span>
                <span className='font-mono'>{skill.value}%</span>
              </div>
              <div className='h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden'>
                <div
                  className='h-full bg-blue-500 rounded-full transition-all duration-500'
                  style={{ width: `${skill.value}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RadarChart
