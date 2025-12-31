import { styled } from '../stitches.config'

export const FeaturedProjects = styled('div', {
  margin: '10px 0 0 0',
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'column',
  gap: '20px',
  '@bp2': { 
    flexDirection: 'row',
    gap: '24px',
  },
})
