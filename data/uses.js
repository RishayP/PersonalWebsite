const categories = [
  {
    name: 'Setup',
    items: [
      {
        title: 'MacBook Pro',
        description:
          'Reliable enough that I don\'t think about the machine while working.',
        url: '#',
      },
      {
        title: 'External Monitor',
        description:
          'Keeps system behavior and logs visible while I write code.',
        url: '#',
      },
    ],
  },
  {
    name: 'Development',
    items: [
      {
        title: 'VS Code',
        description:
          'I keep it minimal and lean on language servers and debugging tools.',
        url: 'https://code.visualstudio.com',
      },
      {
        title: 'Git / GitHub',
        description:
          'I commit early to preserve context and make experimentation reversible.',
        url: 'https://github.com',
      },
      {
        title: 'Python',
        description:
          'My way to test ideas quickly before investing in heavier implementations.',
        url: 'https://www.python.org',
      },
      {
        title: 'C / C++',
        description:
          'Used when I need to understand performance and memory behavior directly.',
        url: '#',
      },
    ],
  },
  {
    name: 'Systems & Infrastructure',
    items: [
      {
        title: 'Vercel',
        description:
          'Lets me deploy quickly so I can focus on behavior, not setup.',
        url: 'https://vercel.com',
      },
      {
        title: 'Supabase / Firebase',
        description:
          'Useful for validating ideas before committing to custom backends.',
        url: 'https://supabase.com',
      },
      {
        title: 'Cloudflare',
        description:
          'Handles the boring but critical parts of DNS and edge security.',
        url: 'https://www.cloudflare.com',
      },
    ],
  },
  {
    name: 'AI / ML',
    items: [
      {
        title: 'PyTorch',
        description:
          'Where I experiment and learn how models behave, not just how to train them.',
        url: 'https://pytorch.org',
      },
      {
        title: 'Hugging Face',
        description:
          'Saves time when I want to study existing models instead of rebuilding.',
        url: 'https://huggingface.co',
      },
      {
        title: 'LLM APIs',
        description:
          'Useful for prototyping features and understanding limitations early.',
        url: '#',
      },
    ],
  },
  {
    name: 'Writing & Thinking',
    items: [
      {
        title: 'Notion',
        description:
          'A place to track decisions, assumptions, and lessons across projects.',
        url: 'https://www.notion.so',
      },
      {
        title: 'Markdown',
        description: 'Keeps writing lightweight and portable.',
        url: '#',
      },
      {
        title: 'Pen and Paper',
        description:
          'Still my fastest way to reason through complex systems.',
        url: '#',
      },
    ],
  },
]

export default categories
