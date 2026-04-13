'use strict';
const VISUAL_CHANNEL = Object.freeze({
  signal: 'VISUAL_CHANNEL',
  braid: 'CLOSED-LOOP',
  invariant: 'VISUAL_INTEGRITY',
  ingest(payload) {
    if (!payload || typeof payload.frameId !== 'string') {
      return { accepted: false, code: 'INVALID_VISUAL_SCHEMA' };
    }
    if (payload.corrupted === true) {
      return { accepted: false, code: 'VISUAL_CORRUPTED' };
    }
    return { accepted: true, code: 'VISUAL_INGESTED', frameId: payload.frameId };
  },
  getStatus() { return '[Signal: VISUAL_CHANNEL | Braid: CLOSED-LOOP]'; }
});
module.exports = VISUAL_CHANNEL;
