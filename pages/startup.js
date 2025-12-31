import React from 'react'
import Head from 'next/head'
import Base from '../layouts/Base'
import FeaturedProject from '../components/FeaturedProject'
import { FeaturedProjects } from '../components/FeaturedProjects'
import stripHtml from '../lib/strip-html'
import startups from '../data/startups'

export async function getStaticProps() {
  return {
    props: {
      title: 'Startup // Rishay Puri',
      tagline: 'Building. Growing. Scaling.',
      image: '/static/images/projects-bw.jpg',
      primaryColor: 'purple',
      secondaryColor: 'cyan',
    },
  }
}

function Startup(props) {
  const { title, image } = props
  const description = `<strong>Building startups</strong> that solve real problems. I'm passionate about creating products that make a difference and <strong>scaling them to impact</strong>.`

  const renderAll = () => {
    return startups.map((startup, index) => {
      return <FeaturedProject key={index} project={startup} />
    })
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={stripHtml(description)} name="description" />
        <meta content={stripHtml(description)} property="og:description" />
        <meta content="https://zenorocha.com/startup" property="og:url" />
        <meta content={`https://zenorocha.com${image}`} property="og:image" />
      </Head>

      <p dangerouslySetInnerHTML={{ __html: description }} />

      <h2>My Startups</h2>
      <p>Here are the startups I've cofounded and built.</p>
      <FeaturedProjects>{renderAll()}</FeaturedProjects>
    </>
  )
}

Startup.Layout = Base

export default Startup

