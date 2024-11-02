import type { Page, Section } from 'content/docs/summary'

export function isPage(section: Section): section is Page {
  return typeof section[0] === 'string'
}

export function isSubSect(section: Section): section is [Page, Section[]] {
  return (
    section.length === 2 &&
    typeof section[0] !== 'string' &&
    Array.isArray(section[1])
  )
}

export const flatten = (sections: Section[]): Page[] => {
  const result: Page[] = []

  for (const section of sections) {
    if (isPage(section)) {
      result.push(section)
      continue
    }

    if (isSubSect(section)) {
      result.push(section[0])
      result.push(...flatten(section[1]))
      continue
    }

    result.push(...flatten(section))
  }

  return result
}
