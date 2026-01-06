import { styled } from '../stitches.config'
import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { parseISO, format, intervalToDuration } from 'date-fns'
import Base from '../layouts/Base'
import stripHtml from '../lib/strip-html'
import items from '../data/about'

export async function getStaticProps() {
  const meta = {
    title: 'About // Rishay Puri',
    description:
      "Rishay Puri is a creator and programmer. He currently lives in San Francisco, California, where he's the Founder & CEO at Resend. His lifelong appreciation for building software and sharing knowledge led him to speak in over 110 conferences worldwide. His passion for open source put him on the top 20 most active users on GitHub at age 22. Before moving to the US, Rishay developed multiple applications, mentored startups, and worked at major companies in Latin America, such as Globo and Petrobras.",
    tagline: 'Create. Share. Repeat.',
    image: '/static/images/about-bw.jpg',
    primaryColor: 'pink',
    secondaryColor: 'purple',
  }

  return { props: meta }
}

function About(props) {
  const { title, description, image } = props

  const renderIntro = () => {
    return (
      <Container>
        <Section css={{
          width: '336px'
        }}>
          <ImageContainer>
            <Image
              alt="Rishay"
              src="/static/images/headshot.jpg"
              width={336}
              height={455}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAP0lEQVQImQE0AMv/AFBQUJKSkqmpqaOjowCurq7v7+/Jycm5ubkA////jIyMn5+fg4ODADAwMD09PWlpaQAAAApRGnEHblMWAAAAAElFTkSuQmCC"
              priority
            />
          </ImageContainer>
        </Section>
        <Section>
          <Paragraph
            css={{
              marginTop: '16px',
              '@bp2': { marginTop: '-6px' },
            }}
          >
            <strong>Hey, I'm Rishay. </strong>
            I am a Computer Science student at Carnegie Mellon who enjoys building software and understanding how systems work.  
          </Paragraph>
          <Paragraph>
          I’ve worked on early stage startups and technical projects in AI and security, 
          including <strong>Stratus and Diwan</strong>, where I spent time building and thinking
          through real world systems and products.
          </Paragraph>
          <Paragraph>
            When I’m not working, I lift, read, and spend time exploring new ideas.
          </Paragraph>
        </Section>
      </Container>
    )
  }

  const renderAll = () => {
    return items.map((item, index) => {
      return (
        <div style={{ marginBottom: 40 }} key={index}>
          <h3>{item.jobTitle}</h3>
          <p style={{ margin: 0 }}>
            <a href={item.companyUrl} target="_blank">
              {item.company}
            </a>
            <span> • {item.location}</span>
          </p>
          <p style={{ margin: 0 }}>
            <span>{format(parseISO(item.startDate), 'LLL yyyy')}</span>
            <span> – </span>
            <span>
              {item.endDate
                ? format(parseISO(item.endDate), 'LLL yyyy')
                : 'Present'}
            </span>
            <span> • </span>
            <span>{getDuration(item.startDate, item.endDate)}</span>
          </p>
        </div>
      )
    })
  }

  const getDuration = (startDate, endDate) => {
    const start = parseISO(startDate)
    const end = endDate ? parseISO(endDate) : new Date()
    
    const durationObj = intervalToDuration({
      start,
      end,
    })

    // Calculate inclusive months
    // If both dates are on the 1st, we count inclusive months
    const startDay = start.getDate()
    const endDay = end.getDate()
    
    // Add 1 month to make it inclusive (e.g., June-August = 3 months, not 2)
    let totalMonths = durationObj.months
    if (startDay === 1 && endDay === 1) {
      totalMonths += 1
    }

    // Add months from years
    totalMonths += (durationObj.years || 0) * 12

    // Convert to years and months
    let years = Math.floor(totalMonths / 12)
    let months = totalMonths % 12

    // Build duration string
    const parts = []
    
    if (years > 1) {
      parts.push(`${years} yrs`)
    } else if (years === 1) {
      parts.push('1 yr')
    }

    if (months > 0) {
      parts.push(`${months} mos`)
    }

    const result = parts.join(' ')
    return result || '0 mos'
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={stripHtml(description)} name="description" />
        <meta content={stripHtml(description)} property="og:description" />
        <meta content="https://rishaypuri.com/about" property="og:url" />
        <meta content={`https://rishaypuri.com${image}`} property="og:image" />
      </Head>

      {renderIntro()}

      <h2>Career</h2>
      {renderAll()}
    </>
  )
}

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  '@bp2': { flexDirection: 'row' },
})

const Paragraph = styled('p', {
  '@bp2': { margin: '15px 0' },
})

const Section = styled('div', {
  marginTop: '0px',
  width: 'auto',
  '@bp2': { width: '48%' },
})

const ImageContainer = styled('div', {
  width: '100%',
  maxWidth: '336px',
  '& img': {
    width: '100%',
    height: 'auto',
    display: 'block',
    objectFit: 'contain',
  },
})

About.Layout = Base

export default About
