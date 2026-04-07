const crypto = require('crypto');
function canonicalSha256(content) {
  const normalized = content.replace(/\r\n/g, '\n');
  return crypto.createHash('sha256').update(normalized, 'utf8').digest('hex');
}
module.exports = { canonicalSha256 };
