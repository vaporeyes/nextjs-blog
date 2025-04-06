import { useState } from 'react'

const SkillTree = () => {
  // Define your skill categories and skills
  const skillTree = {
    lifeSkills: {
      name: 'Life Skills',
      color: '#10B981', // Green
      skills: [
        { id: 'cooking', name: 'Cooking', level: 75 },
        { id: 'drawing', name: 'Drawing', level: 80 },
        { id: 'painting', name: 'Painting', level: 55 },
        { id: 'modelBuilding', name: 'Model Building', level: 55 }
      ]
    },
    programming: {
      name: 'Programming',
      color: '#6366F1', // Indigo
      skills: [
        { id: 'python', name: 'Python', level: 85 },
        { id: 'shell', name: 'Bash/Shell', level: 90 },
        { id: 'javascript', name: 'Javascript', level: 69 },
        { id: 'rust', name: 'Rust', level: 35 },
        { id: 'elixir', name: 'Elixir', level: 56 }
      ]
    },
    devOps: {
      name: 'Cloud & DevOps',
      color: '#F59E0B', // Amber
      skills: [
        { id: 'cicd', name: 'CI/CD', level: 75 },
        { id: 'aws', name: 'AWS', level: 80 },
        { id: 'gcp', name: 'GCP', level: 45 },
        { id: 'azure', name: 'Azure', level: 15 },
        { id: 'terraform', name: 'Terraform', level: 55 },
        { id: 'elasticsearch', name: 'Elasticsearch', level: 75 }
      ]
    }
  }

  const [expandedCategory, setExpandedCategory] = useState(null)
  const [hoveredSkill, setHoveredSkill] = useState(null)

  // Get level description based on skill level
  const getLevelDescription = level => {
    if (level >= 90) return 'Expert'
    if (level >= 75) return 'Advanced'
    if (level >= 50) return 'Proficient'
    if (level >= 25) return 'Intermediate'
    return 'Beginner'
  }

  return (
    <div className='my-8'>
      <h2 className='text-center text-3xl font-bold mb-8'>Skill Tree</h2>

      <div className='grid grid-cols-1 gap-6'>
        {Object.entries(skillTree).map(([categoryId, category]) => (
          <div
            key={categoryId}
            className='border dark:border-gray-700 rounded-lg overflow-hidden transition-all duration-300 ease-in-out'
          >
            <button
              className='w-full p-4 text-left font-bold text-lg flex items-center justify-between'
              style={{ backgroundColor: `${category.color}20` }}
              onClick={() =>
                setExpandedCategory(
                  expandedCategory === categoryId ? null : categoryId
                )
              }
            >
              <span style={{ color: category.color }}>{category.name}</span>
              <svg
                className={`w-5 h-5 transition-transform ${
                  expandedCategory === categoryId ? 'transform rotate-180' : ''
                }`}
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M19 9l-7 7-7-7'
                />
              </svg>
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                expandedCategory === categoryId ? 'max-h-96' : 'max-h-0'
              }`}
            >
              <div className='p-4 grid grid-cols-1 sm:grid-cols-2 gap-4'>
                {category.skills.map(skill => (
                  <div
                    key={skill.id}
                    className='relative border dark:border-gray-700 rounded-lg p-3 cursor-pointer transition-all hover:shadow-md'
                    onMouseEnter={() => setHoveredSkill(skill.id)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    <div className='flex justify-between items-center mb-2'>
                      <h3 className='font-medium'>{skill.name}</h3>
                      <span
                        className='text-sm font-mono py-1 px-2 rounded-full'
                        style={{
                          backgroundColor: `${category.color}20`,
                          color: category.color
                        }}
                      >
                        {skill.level}%
                      </span>
                    </div>

                    <div className='h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden'>
                      <div
                        className='h-full rounded-full transition-all duration-500'
                        style={{
                          width: `${skill.level}%`,
                          backgroundColor: category.color
                        }}
                      ></div>
                    </div>

                    {hoveredSkill === skill.id && (
                      <div className='absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-3 z-10 w-48 border border-gray-200 dark:border-gray-700'>
                        <div className='text-center'>
                          <span
                            className='font-medium text-gray-900 dark:text-gray-100'
                            style={{ color: category.color }}
                          >
                            {getLevelDescription(skill.level)}
                          </span>
                          <div className='mt-1 text-sm text-gray-700 dark:text-gray-300'>
                            {skill.level >= 80
                              ? 'Mastered this skill, can teach others'
                              : skill.level >= 60
                              ? 'Confident in applying this skill to complex problems'
                              : skill.level >= 40
                              ? 'Comfortable with fundamentals and some advanced topics'
                              : skill.level >= 20
                              ? 'Basic understanding and some practical experience'
                              : 'Currently learning the basics'}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SkillTree
