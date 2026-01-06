import React, { useState } from 'react'
import Head from 'next/head'
import Base from '../layouts/Base'
import { styled } from '../stitches.config'
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

  const renderStartup = (startup, index) => {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
      <StartupSection key={index}>
        <StartupHeader>
          <div>
            <StartupTitle>{startup.title}</StartupTitle>
            <StatusBadge>{startup.currentStatus.split('.')[0]}</StatusBadge>
          </div>
          {startup.website && startup.website !== '#' && (
            <WebsiteLink href={startup.website} target="_blank" rel="noopener noreferrer">
              Visit Website →
            </WebsiteLink>
          )}
        </StartupHeader>
        
        <Summary>
          <SummaryText>{startup.whatWeBuilt}</SummaryText>
        </Summary>

        <ExpandButton onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? 'Show Less' : 'Learn More'}
          <ExpandIcon>{isExpanded ? '▲' : '▼'}</ExpandIcon>
        </ExpandButton>

        {isExpanded && (
          <ExpandedContent>
            <Section>
              <SectionTitle>Problem</SectionTitle>
              <SectionContent>{startup.problem}</SectionContent>
            </Section>

            <Section>
              <SectionTitle>Why It Mattered</SectionTitle>
              <SectionContent>{startup.whyItMattered}</SectionContent>
            </Section>

            <Section>
              <SectionTitle>Constraints</SectionTitle>
              <SectionContent>{startup.constraints}</SectionContent>
            </Section>

            <Section>
              <SectionTitle>What We Learned</SectionTitle>
              <SectionContent>{startup.whatWeLearned}</SectionContent>
            </Section>

            <Section>
              <SectionTitle>Current Status</SectionTitle>
              <SectionContent>{startup.currentStatus}</SectionContent>
            </Section>
          </ExpandedContent>
        )}
      </StartupSection>
    )
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={stripHtml(description)} name="description" />
        <meta content={stripHtml(description)} property="og:description" />
        <meta content="https://rishaypuri.com/startup" property="og:url" />
        <meta content={`https://rishaypuri.com${image}`} property="og:image" />
      </Head>

      <p dangerouslySetInnerHTML={{ __html: description }} />
      
      <StartupsContainer>
        {startups.map(renderStartup)}
      </StartupsContainer>
    </>
  )
}

const StartupsContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '60px',
  marginTop: '40px',
})

const StartupSection = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  padding: '0',
})

const StartupHeader = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  gap: '16px',
  marginBottom: '8px',
})

const StartupTitle = styled('h2', {
  fontSize: '32px',
  fontWeight: 700,
  color: '$primary',
  margin: '0 0 8px 0',
})

const StatusBadge = styled('span', {
  display: 'inline-block',
  fontSize: '14px',
  fontWeight: 500,
  color: '$secondary',
  padding: '4px 12px',
  borderRadius: '4px',
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
})

const WebsiteLink = styled('a', {
  fontSize: '16px',
  color: '$primary',
  textDecoration: 'none',
  fontWeight: 500,
  transition: 'opacity $duration ease-in-out',
  '&:hover': {
    opacity: 0.7,
    textDecoration: 'underline',
  },
})

const Summary = styled('div', {
  marginTop: '8px',
})

const SummaryText = styled('p', {
  fontSize: '18px',
  lineHeight: '1.6',
  color: '$secondary',
  margin: 0,
})

const ExpandButton = styled('button', {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  background: 'transparent',
  border: 'none',
  color: '$primary',
  fontSize: '14px',
  fontWeight: 500,
  cursor: 'pointer',
  padding: '8px 0',
  marginTop: '8px',
  transition: 'opacity $duration ease-in-out',
  '&:hover': {
    opacity: 0.7,
  },
})

const ExpandIcon = styled('span', {
  fontSize: '12px',
  transition: 'transform $duration ease-in-out',
})

const ExpandedContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  marginTop: '16px',
  paddingTop: '24px',
  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
})

const Section = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
})

const SectionTitle = styled('h4', {
  fontSize: '14px',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '1.2px',
  color: '$primary',
  margin: 0,
})

const SectionContent = styled('p', {
  fontSize: '16px',
  lineHeight: '1.6',
  color: '$secondary',
  margin: 0,
})

Startup.Layout = Base

export default Startup
