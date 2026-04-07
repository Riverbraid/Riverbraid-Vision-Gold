const fs = require('fs');
const { execSync } = require('child_process');

const agents = fs.readdirSync('..').filter(n => n.startsWith('Riverbraid-') && n.endsWith('-Gold'));

agents.forEach(agent => {
    // Ensure a mock asset exists for every agent for this mapping phase
    const mockAsset = `assets/${agent}.png`;
    if (!fs.existsSync(mockAsset)) {
        fs.writeFileSync(mockAsset, `MOCK_VISUAL_DATA_FOR_${agent}`);
    }
    
    try {
        console.log(`--- Processing ${agent} ---`);
        execSync(`node ingest-asset.cjs ${mockAsset} ${agent}`, { stdio: 'inherit' });
    } catch (e) {
        console.error(`[FAIL] ${agent} ingestion failed.`);
    }
});
