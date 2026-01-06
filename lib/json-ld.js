export const getPersonJsonLd = () => {
  return {
    "@context": "https://schema.org/",
    "@type": "Person",
    "url": "https://rishaypuri.com/",
    "name": "Rishay Puri",
    "givenName": "Rishay",
    "familyName": "Puri",
    "description": "Computer Science student at Carnegie Mellon University, obsessed with developer experience. Co-founder of Stratus, building AI code infrastructure with frontier security models.",
    "image": "https://rishaypuri.com/static/images/headshot.jpg",
    "jobTitle": "Computer Science Student & Co-founder",
    "affiliation": [
      {
        "@type": "Organization",
        "url": "https://www.cmu.edu/",
        "name": "Carnegie Mellon University"
      },
      {
        "@type": "Organization",
        "url": "https://www.stratuslabs.inc/",
        "name": "Stratus"
      }
    ],
    "alumniOf": [
      {
        "@type": "EducationalOrganization",
        "name": "Carnegie Mellon University",
        "url": "https://www.cmu.edu/"
      }
    ],
    "sameAs": [
      "https://www.linkedin.com/in/rishay-puri-49b0a7311",
      "https://github.com/RishayP"
    ],
    "knowsAbout": [
      {
        "@type": "Thing",
        "name": "Software Engineering"
      },
      {
        "@type": "Thing",
        "name": "Artificial Intelligence"
      },
      {
        "@type": "Thing",
        "name": "Computer Science"
      },
      {
        "@type": "Thing",
        "name": "Developer Experience"
      }
    ]
  }
}