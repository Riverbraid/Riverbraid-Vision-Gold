((env) => { const WHITELIST = ['PATH', 'GPG_TTY', 'HOME', 'USER', 'LANG']; Object.keys(env).forEach(key => { if (!WHITELIST.includes(key)) delete env[key]; }); env.NODE_NO_WARNINGS = '1'; })(process.env);

'use strict';
const { readFileSync } = require('fs');
const SIGNAL = 'VISUAL_CHANNEL';
const ANCHOR = 'de2062';

function loadVectors() {
  const v = JSON.parse(readFileSync('./visual.vectors', 'utf8'));
  if (v.anchor !== ANCHOR || v.signal !== SIGNAL) {
    throw new Error('ANCHOR_OR_SIGNAL_MISMATCH');
  }
  return v;
}

exports.getStatus = () => ({
  petal: 'Vision-Gold',
  signal: SIGNAL,
  anchor: ANCHOR,
  status: 'STATIONARY'
});
exports.loadVectors = loadVectors;
