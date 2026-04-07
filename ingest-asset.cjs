const fs = require('fs');
const crypto = require('crypto');
const manifest = require('../Riverbraid-Manifest-Gold/swarm.manifest.json');
const assetPath = process.argv[2];
const targetAgent = process.argv[3];
const isAscii = (buf) => {
    for (let i = 0; i < buf.length; i++) {
        const b = buf[i];
        if (!(b === 9 || b === 10 || b === 13 || (b >= 32 && b <= 126))) return false;
    }
    return true;
};
if (!assetPath || !targetAgent) { process.exit(1); }
const snapshotPath = `../${targetAgent}/constitution.snapshot.json`;
if (!fs.existsSync(snapshotPath) || !isAscii(fs.readFileSync(snapshotPath))) {
    console.error(`[REFUSAL] ${targetAgent} failed Byte-Floor check.`);
    process.exit(1);
}
const agentData = manifest.agents[targetAgent];
const assetBuffer = fs.readFileSync(assetPath);
const assetHash = crypto.createHash('sha256').update(assetBuffer).digest('hex').substring(0, 12);
const binding = {
    vector_id: `v_${assetHash}`,
    source_agent: targetAgent,
    structural_anchor: agentData.signature_hash,
    asset_integrity: assetHash,
    gate_level: 2,
    timestamp_sealed: new Date().toISOString()
};
if (!fs.existsSync('vectors')) fs.mkdirSync('vectors');
fs.writeFileSync(`vectors/${targetAgent}.vector.json`, JSON.stringify(binding, null, 2));
console.log(`[SEAL] Vector created for ${targetAgent}.`);
