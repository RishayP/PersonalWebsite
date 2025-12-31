import { styled } from '../stitches.config'
import Head from 'next/head'
import Base from '../layouts/Base'
import stripHtml from '../lib/strip-html'

export async function getStaticProps() {
  return {
    props: {
      title: 'Writing // Rishay Puri',
      tagline: 'Stories. Updates. Guides.',
      image: '/static/images/articles-bw.jpg',
      primaryColor: 'yellow',
      secondaryColor: 'pink',
    },
  }
}

function Writing(props) {
  const { title, image } = props
  const description = 'Coming soon...'

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={stripHtml(description)} name="description" />
        <meta content={stripHtml(description)} property="og:description" />
        <meta content="https://zenorocha.com/writing" property="og:url" />
        <meta content={`https://zenorocha.com${image}`} property="og:image" />
      </Head>

      <ComingSoon>
        <h2>Coming Soon</h2>
        <p>I'm working on some exciting content. Check back soon!</p>
      </ComingSoon>
    </>
  )
}

const ComingSoon = styled('div', {
  textAlign: 'center',
  padding: '60px 20px',
  
  h2: {
    fontSize: '32px',
    marginBottom: '16px',
    color: '$primary',
  },
  
  p: {
    fontSize: '18px',
    color: '$secondary',
    lineHeight: '1.6',
  },
})

Writing.Layout = Base

export default Writing

