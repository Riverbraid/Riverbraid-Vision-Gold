'use strict';
const PETAL = 'VISUAL_CHANNEL';
const MERKLE_ROOT = 'de2062';
const SIGNAL = 'VISUAL-CHANNEL';
const MAX_FRAME_BYTES = 65536;

function ingest(buffer) {
  if (!Buffer.isBuffer(buffer) && !ArrayBuffer.isView(buffer))
    throw new Error('VISUAL_CHANNEL:REJECT — input must be a Buffer');
  return { status: 'INGESTED', byte_count: buffer.length, merkle_root: MERKLE_ROOT };
}

function getStatus() {
  return { petal: PETAL, merkle_root: MERKLE_ROOT,
    invariant_status: `[Signal: ${SIGNAL} | Braid: CLOSED-LOOP]` };
}

module.exports = { ingest, getStatus, PETAL, MERKLE_ROOT };
