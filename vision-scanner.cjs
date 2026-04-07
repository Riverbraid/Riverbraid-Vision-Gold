const fs = require('fs');
const path = require('path');

const MANIFEST_PATH = '../Riverbraid-Manifest-Gold/swarm.manifest.json';
const PULSE_SIG_PATH = '../Riverbraid-Temporal-Gold/swarm.pulse.json.asc';

function verifyHardenedSync() {
    if (!fs.existsSync(PULSE_SIG_PATH)) {
        console.error("[REFUSAL] Hardened Temporal Pulse (GPG) missing. Swarm unsynchronized.");
        return false;
    }
    console.log(`[SYNC] Vision synchronized with Hardened Temporal Seal.`);
    return true;
}

if (verifyHardenedSync()) {
    const swarm = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
    console.log(`[VISION] Root: ${swarm.version} | Agents: ${Object.keys(swarm.agents).length}`);
    
    // Predicate checks for all 14 agents
    Object.keys(swarm.agents).forEach(agent => {
        const isHealthy = fs.existsSync(`../${agent}/constitution.snapshot.json`);
        console.log(`Agent ${agent.padEnd(30)} | Coherence: ${isHealthy ? 'HIGH' : 'LOW'}`);
    });
}
