const fs = require('fs');
const manifest = require('../Riverbraid-Manifest-Gold/swarm.manifest.json');

const spoofAgent = 'Riverbraid-Refusal-Gold';
const stolenAnchor = manifest.agents['Riverbraid-Crypto-Gold'].signature_hash;

console.log(`[TEST] Attempting Cross-Domain Replay: ${spoofAgent} using anchor from Crypto-Gold`);

function verifyVector(vector) {
    const actualAnchor = manifest.agents[vector.source_agent].signature_hash;
    
    if (vector.structural_anchor !== actualAnchor) {
        console.error(`[REJECTED] Signature Mismatch! Vector anchor does belong to a different domain.`);
        return false;
    }
    console.log(`[VERIFIED] Vector integrity confirmed for ${vector.source_agent}.`);
    return true;
}

const spoofedVector = {
    vector_id: "v_SPOOFED_DATA",
    source_agent: spoofAgent,
    structural_anchor: stolenAnchor,
    gate_level: 2
};

verifyVector(spoofedVector);
