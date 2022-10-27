import Layout from '../components/layout'
import { getSortedPhotoData } from '../components/photos'
import { SRLWrapper } from 'simple-react-lightbox'

export async function getStaticProps () {
  const allPostsData = getSortedPhotoData()
  return {
    props: {
      allPostsData
    }
  }
}

function BlurImage ({ imageData }) {
  return (
    <a
      id={imageData.id}
      href={`/images/${imageData.id}.jpg`}
      data-attribute='SRL'
      className='group'
    >
      <div className='w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8'>
        <img
          id={imageData.id}
          src={`/images/${imageData.id}.jpg`}
          alt={imageData.id}
        />
      </div>
      <h3 className='mt-4 text-xs text-gray-300'>{imageData.id}</h3>
      <p className='mt-1 text-sm font-medium text-gray-700'>{imageData.date}</p>
    </a>
  )
}

export default function Artwork ({ allPostsData }) {
  return (
    <Layout>
      <section>
        <h2 className='text-lg text-center'>artwork over the years</h2>
        <h3 className='text-sm'>
          Mostly pen and ink on wood, some on paper. A few paintings.
        </h3>
      </section>
      <SRLWrapper
        options={{
          settings: { disablePanzoom: true, usingPreact: true },
          buttons: {
            showDownloadButton: false
          }
        }}
      >
        <div className='max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
          <div className='grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
            {allPostsData.map(imageData => {
              return <BlurImage imageData={imageData}></BlurImage>
            })}
          </div>
        </div>
      </SRLWrapper>
    </Layout>
  )
}
