import { ExtendedRecordMap } from 'notion-types'
import {
  parsePageId,
  getCanonicalPageId as getCanonicalPageIdImpl
} from 'notion-utils'

import { inversePageUrlOverrides } from './config'

export function getCanonicalPageId(
  pageId: string,
  recordMap: ExtendedRecordMap,
  { uuid = true }: { uuid?: boolean } = {}
): string | null {
  const cleanPageId = parsePageId(pageId, { uuid: false })
  if (!cleanPageId) {
    return null
  }

  const override = inversePageUrlOverrides[cleanPageId]
  if (override) {
    return override
  } else {
    return getCanonicalPageIdImpl(pageId, recordMap, {
      uuid
    })
  }
}

export const normalizeTitle = (title: string | null): string => {
  return (
    (title || '')
      .replace(/ /g, '-')
      // .replace(/[^a-zA-Z0-9-]/g, '')
      .replace(/--/g, '-')
      .replace(/-$/, '')
      .replace(/^-/, '')
      .trim()
    // .toLowerCase()
  )
}

