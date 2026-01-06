import { styled } from '../stitches.config'
import { Box } from './Box'
import Toast from './Toast'
import { useRef, useState, createContext, useContext, useMemo, useEffect } from 'react'
import { useRouter } from 'next/router'
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from 'cmdk'
import dynamic from 'next/dynamic'
const Lottie = dynamic(() => import('lottie-react'), { ssr: false })
import copyLinkIcon from '../public/static/icons/copy-link.json'
import emailIcon from '../public/static/icons/email.json'
import sourceIcon from '../public/static/icons/source.json'
import aboutIcon from '../public/static/icons/about.json'
import homeIcon from '../public/static/icons/home.json'
import articlesIcon from '../public/static/icons/articles.json'
import projectsIcon from '../public/static/icons/projects.json'
import usesIcon from '../public/static/icons/uses.json'
import charmIcon from '../public/static/icons/charm.json'

const CommandBarContext = createContext(null)

export function useCommandBar() {
  const context = useContext(CommandBarContext)
  if (!context) {
    throw new Error('useCommandBar must be used within CommandBar')
  }
  return context
}

export default function CommandBar(props) {
  const copyLinkRef = useRef()
  const emailRef = useRef()
  const sourceRef = useRef()
  const homeRef = useRef()
  const aboutRef = useRef()
  const startupRef = useRef()
  const projectsRef = useRef()
  const writingRef = useRef()
  const usesRef = useRef()
  const contactRef = useRef()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [showToast, setShowToast] = useState(false)

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setShowToast(true)
    setOpen(false)
  }

  const iconSize = { width: 24, height: 24 }

  const actions = useMemo(() => [
    {
      id: 'copy',
      name: 'Copy Link',
      shortcut: ['l'],
      keywords: 'copy-link',
      section: 'General',
      perform: copyLink,
      icon: <Lottie lottieRef={copyLinkRef} style={iconSize} animationData={copyLinkIcon} loop={false} autoplay={false} />,
    },
    {
      id: 'email',
      name: 'Send Email',
      shortcut: ['e'],
      keywords: 'send-email',
      section: 'General',
      perform: () => {
        router.push('/contact')
        setOpen(false)
      },
      icon: <Lottie lottieRef={emailRef} style={iconSize} animationData={emailIcon} loop={false} autoplay={false} />,
    },
    {
      id: 'source',
      name: 'View Source',
      shortcut: ['s'],
      keywords: 'view-source',
      section: 'General',
      perform: () => {
        window.open('https://github.com/RishayP/PersonalWebsite', '_blank')
        setOpen(false)
      },
      icon: <Lottie lottieRef={sourceRef} style={iconSize} animationData={sourceIcon} loop={false} autoplay={false} />,
    },
    {
      id: 'home',
      name: 'Home',
      shortcut: ['g', 'h'],
      keywords: 'go-home',
      section: 'Go To',
      perform: () => {
        router.push('/')
        setOpen(false)
      },
      icon: <Lottie lottieRef={homeRef} style={iconSize} animationData={homeIcon} loop={false} autoplay={false} />,
    },
    {
      id: 'about',
      name: 'About',
      shortcut: ['g', 'a'],
      keywords: 'go-about',
      section: 'Go To',
      perform: () => {
        router.push('/about')
        setOpen(false)
      },
      icon: <Lottie lottieRef={aboutRef} style={iconSize} animationData={aboutIcon} loop={false} autoplay={false} />,
    },
    {
      id: 'startup',
      name: 'Startup',
      shortcut: ['g', 's'],
      keywords: 'go-startup',
      section: 'Go To',
      perform: () => {
        router.push('/startup')
        setOpen(false)
      },
      icon: <Lottie lottieRef={startupRef} style={iconSize} animationData={charmIcon} loop={false} autoplay={false} />,
    },
    {
      id: 'projects',
      name: 'Projects',
      shortcut: ['g', 'p'],
      keywords: 'go-projects',
      section: 'Go To',
      perform: () => {
        router.push('/projects')
        setOpen(false)
      },
      icon: <Lottie lottieRef={projectsRef} style={iconSize} animationData={projectsIcon} loop={false} autoplay={false} />,
    },
    {
      id: 'writing',
      name: 'Writing',
      shortcut: ['g', 'w'],
      keywords: 'go-writing',
      section: 'Go To',
      perform: () => {
        router.push('/writing')
        setOpen(false)
      },
      icon: <Lottie lottieRef={writingRef} style={iconSize} animationData={articlesIcon} loop={false} autoplay={false} />,
    },
    {
      id: 'uses',
      name: 'Uses',
      shortcut: ['g', 'u'],
      keywords: 'go-uses',
      section: 'Go To',
      perform: () => {
        router.push('/uses')
        setOpen(false)
      },
      icon: <Lottie lottieRef={usesRef} style={iconSize} animationData={usesIcon} loop={false} autoplay={false} />,
    },
    {
      id: 'contact',
      name: 'Contact',
      shortcut: ['g', 'c'],
      keywords: 'go-contact',
      section: 'Go To',
      perform: () => {
        router.push('/contact')
        setOpen(false)
      },
      icon: <Lottie lottieRef={contactRef} style={iconSize} animationData={emailIcon} loop={false} autoplay={false} />,
    },
  ], [router])

  const contextValue = useMemo(() => ({
    toggle: () => setOpen(prev => !prev),
    open: () => setOpen(true),
    close: () => setOpen(false),
  }), [])

  // Handle keyboard shortcut (Cmd/Ctrl+K)
  useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  // Group actions by section
  const groupedActions = useMemo(() => {
    const groups = {}
    actions.forEach(action => {
      if (!groups[action.section]) {
        groups[action.section] = []
      }
      groups[action.section].push(action)
    })
    return groups
  }, [actions])

  return (
    <CommandBarContext.Provider value={contextValue}>
      <StyledCommandDialog open={open} onOpenChange={setOpen} modal={true}>
        <CommandWrapper>
          <StyledCommandInput placeholder="Type a command or search…" />
          <StyledCommandList>
            <StyledCommandEmpty>No results found.</StyledCommandEmpty>
            {Object.entries(groupedActions).map(([section, sectionActions]) => (
              <StyledCommandGroup key={section} heading={section}>
                {sectionActions.map(action => (
                  <ActionCommandItem
                    key={action.id}
                    action={action}
                    value={`${action.name} ${action.keywords}`}
                    onSelect={() => action.perform()}
                  />
                ))}
              </StyledCommandGroup>
            ))}
          </StyledCommandList>
        </CommandWrapper>
      </StyledCommandDialog>

      {props.children}

      <Toast
        title="Copied :D"
        description="You can now share it with anyone."
        isSuccess={true}
        showToast={showToast}
        setShowToast={setShowToast}
      />
    </CommandBarContext.Provider>
  )
}

function ActionCommandItem({ action, value, onSelect }) {
  const itemRef = useRef(null)

  const handleMouseEnter = () => {
    const lottieInstance = action.icon?.props?.lottieRef?.current
    if (lottieInstance) {
      lottieInstance.goToAndPlay(0)
    }
  }

  const handleMouseLeave = () => {
    // Only stop if not selected
    if (itemRef.current?.getAttribute('aria-selected') !== 'true') {
      const lottieInstance = action.icon?.props?.lottieRef?.current
      if (lottieInstance) {
        lottieInstance.stop()
      }
    }
  }

  // Use MutationObserver or check on focus
  const handleFocus = () => {
    const lottieInstance = action.icon?.props?.lottieRef?.current
    if (lottieInstance) {
      lottieInstance.goToAndPlay(0)
    }
  }

  const handleBlur = () => {
    const lottieInstance = action.icon?.props?.lottieRef?.current
    if (lottieInstance) {
      lottieInstance.stop()
    }
  }

  return (
    <StyledCommandItem
      ref={itemRef}
      value={value}
      onSelect={onSelect}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <Box
        css={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Action>
          {action.icon && action.icon}
          <ActionRow>
            <span>{action.name}</span>
          </ActionRow>
        </Action>
        {action.shortcut?.length ? (
          <Shortcut aria-hidden>
            {action.shortcut.map(shortcut => (
              <Kbd key={shortcut}>{shortcut}</Kbd>
            ))}
          </Shortcut>
        ) : null}
      </Box>
    </StyledCommandItem>
  )
}

const Kbd = styled('kbd', {
  background: 'rgba(255, 255, 255, .1)',
  color: '$secondary',
  padding: '4px 8px',
  textTransform: 'uppercase',
})

const Shortcut = styled('div', {
  display: 'grid',
  gridAutoFlow: 'column',
  gap: '4px',
})

const Action = styled('div', {
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
})

const ActionRow = styled('div', {
  display: 'flex',
  flexDirection: 'column',
})

// const StyledCommandDialog = styled(CommandDialog, {
//   '& [cmdk-root]': {
//     backgroundColor: '#1a1c1e',
//     maxWidth: '600px',
//     width: '100%',
//     color: '$primary',
//     borderRadius: '8px',
//     overflow: 'hidden',
//     '@supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none))': {
//       backgroundColor: '$command',
//       WebkitBackdropFilter: 'saturate(300%) blur(25px)',
//       backdropFilter: 'saturate(300%) blur(25px)',
//     },
//   },

const CommandWrapper = styled('div', {
  width: '600px',
  maxWidth: 'calc(100vw - 32px)',
})

const StyledCommandDialog = styled(CommandDialog, {
  position: 'fixed',
  inset: 0,
  zIndex: 9999,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& [data-radix-dialog-overlay]': {
    position: 'fixed',
    inset: '0px',
    backgroundColor: 'rgba(0, 0, 0, .8)',
    cursor: 'pointer',
    zIndex: 9998,
  },
  '& [data-radix-dialog-content]': {
    position: 'relative !important',
    top: 'auto !important',
    left: 'auto !important',
    right: 'auto !important',
    bottom: 'auto !important',
    transform: 'none !important',
    margin: '0 !important',
    padding: '0 !important',
    background: 'transparent !important',
    border: 'none !important',
    zIndex: 9999,
  },
})

const StyledCommandInput = styled(CommandInput, {
  padding: '12px 16px',
  fontSize: '16px',
  width: '100%',
  boxSizing: 'border-box',
  outline: 'none',
  border: 'none',
  margin: 0,
  background: '$command',
  color: '$primary',
  backgroundColor: '#1a1c1e',
  borderTopLeftRadius: '8px',
  borderTopRightRadius: '8px',
})

const StyledCommandList = styled(CommandList, {
  backgroundColor: '#1a1c1e',
  maxHeight: '400px',
  width: '100%',
  overflow: 'auto',
  borderBottomLeftRadius: '8px',
  borderBottomRightRadius: '8px',
  /* Hide scrollbar for Chrome, Safari and Opera */
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  /* Hide scrollbar for IE, Edge and Firefox */
  '-ms-overflow-style': 'none',
  'scrollbar-width': 'none',
})

const StyledCommandEmpty = styled(CommandEmpty, {
  padding: '12px 16px',
  textAlign: 'center',
  fontSize: '14px',
  color: '$secondary',
})

const StyledCommandGroup = styled(CommandGroup, {
  '& [cmdk-group-heading]': {
    padding: '8px 16px',
    fontSize: '10px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    background: '$command',
    color: '$secondary',
  },
})

const StyledCommandItem = styled(CommandItem, {
  padding: '12px 16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  margin: 0,
  cursor: 'pointer',
  color: '$secondary',
  '&[aria-selected="true"]': {
    background: 'rgba(255, 255, 255, 0.1)',
    color: '$primary',
  },
  '&:hover, &:focus': {
    background: 'rgba(255, 255, 255, 0.1)',
  },
})
