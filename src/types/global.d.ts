import { LoDashStatic } from 'lodash';

declare global {
  const _: LoDashStatic;
  const CryptoJS: CryptoJS.Hashes;
}