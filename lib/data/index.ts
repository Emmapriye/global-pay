import 'server-only'
import { demoRepository } from './demo-repository'
import type { DataRepository } from './repository'

/**
 * Single entry point for server components and actions.
 *
 * Until a Supabase repository is implemented and tested, the app always uses
 * demo data — even if Supabase env vars are present — so the UI never implies
 * a live database connection that has not been verified.
 */
export function getRepository(): DataRepository {
  return demoRepository
}

export type { DataRepository, DataMode } from './repository'
