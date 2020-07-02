import { LoDashStatic } from "lodash";

declare const _: LoDashStatic;

export function sample(...options: string[]): string | null {
  return _.sample(options) || null;
}