#!/usr/bin/env node
// Extract curated game-icons.net SVG path data into a compact JS object.
const fs = require('fs');
const path = require('path');
const ROOT = '/tmp/gameicons';

// Each slot: array of candidates (first existing wins).
const M = {
  // ---------- Middle-earth ----------
  mid_rapid:  ['delapouite/bow-arrow'],
  mid_cannon: ['delapouite/trebuchet','heavenly-dog/catapult'],
  mid_frost:  ['delapouite/wizard-face','lorc/wizard-staff'],
  mid_sniper: ['delapouite/archer','lorc/on-target'],
  mid_poison: ['carl-olsen/spider-alt','lorc/hanging-spider'],
  mid_tesla:  ['lorc/lightning-storm','lorc/heavy-lightning'],
  mid_grunt:  ['caro-asercion/goblin','delapouite/goblin-head'],
  mid_runner: ['lorc/werewolf','lorc/wolf-head'],
  mid_tank:   ['skoll/troll','delapouite/ogre'],
  mid_boss:   ['lorc/ifrit','faithtoken/dragon-head'],
  // ---------- Alien Invasion ----------
  sci_rapid:  ['delapouite/laser-turret','sbed/laser-gun'],
  sci_cannon: ['delapouite/missile-launcher','lorc/missile-pod'],
  sci_frost:  ['lorc/ice-spell-cast','lorc/snowflake-2','lorc/frozen-orb'],
  sci_sniper: ['lorc/ray-gun','sbed/blaster'],
  sci_poison: ['sbed/acid','lorc/acid-blob','lorc/poison-gas','sbed/poison-cloud'],
  sci_tesla:  ['lorc/tesla-turret'],
  sci_grunt:  ['delapouite/ufo'],
  sci_runner: ['delapouite/alien-bug'],
  sci_tank:   ['delapouite/brain-tentacle','lorc/squid-head'],
  sci_boss:   ['lorc/alien-skull','lorc/cracked-alien-skull'],
  // ---------- Caveman ----------
  cav_rapid:  ['delapouite/stone-spear','lorc/barbed-spear','lorc/stone-axe'],
  cav_cannon: ['heavenly-dog/catapult','lorc/stone-axe'],
  cav_frost:  ['cathelineau/polar-bear','lorc/frostfire'],
  cav_sniper: ['delapouite/eagle-head','lorc/hawk-emblem'],
  cav_poison: ['lorc/scorpion','lorc/scorpion-tail'],
  cav_tesla:  ['delapouite/totem','lorc/totem-head'],
  cav_grunt:  ['caro-asercion/boar','delapouite/velociraptor'],
  cav_runner: ['delapouite/velociraptor','delapouite/ninja-velociraptor'],
  cav_tank:   ['delapouite/mammoth'],
  cav_boss:   ['lorc/dinosaur-rex','delapouite/t-rex-skull'],
  // ---------- Zombie ----------
  zom_rapid:  ['skoll/ak47','skoll/machine-gun'],
  zom_cannon: ['skoll/grenade','lorc/grenade','sbed/grenade','delapouite/hand-grenade'],
  zom_frost:  ['lorc/frozen-orb','lorc/ice-bolt','lorc/snowflake-1'],
  zom_sniper: ['skoll/spectre-m4','sbed/target-laser'],
  zom_poison: ['sbed/poison-cloud','lorc/poison-gas'],
  zom_tesla:  ['caro-asercion/tesla-coil','lorc/tesla-coil'],
  zom_grunt:  ['delapouite/shambling-zombie','skoll/raise-zombie'],
  zom_runner: ['lorc/ghost','delapouite/floating-ghost'],
  zom_tank:   ['delapouite/brute'],
  zom_boss:   ['lorc/gooey-daemon','lorc/daemon-skull'],
  // ---------- Pirate ----------
  pir_rapid:  ['lorc/crossed-pistols','john-colburn/pistol-gun'],
  pir_cannon: ['delapouite/pirate-cannon','lorc/cannon'],
  pir_frost:  ['lorc/fishing-net','delapouite/anchor','lorc/anchor'],
  pir_sniper: ['skoll/musket','lorc/on-target'],
  pir_poison: ['lorc/poison-bottle'],
  pir_tesla:  ['lorc/heavy-lightning','lorc/focused-lightning'],
  pir_grunt:  ['lorc/pirate-skull','delapouite/pirate-hat'],
  pir_runner: ['delapouite/parrot-head','delapouite/shark-fin'],
  pir_tank:   ['lorc/shark-jaws','delapouite/shark-bite'],
  pir_boss:   ['delapouite/kraken-tentacle','lorc/octopus','lorc/giant-squid'],
  // ---------- Wild West ----------
  wes_rapid:  ['delapouite/revolver','skoll/revolver'],
  wes_cannon: ['lorc/explosive-materials','lorc/rolling-bomb'],
  wes_frost:  ['delapouite/lasso','skoll/lasso','lorc/whirlwind'],
  wes_sniper: ['skoll/winchester-rifle','sbed/rifle'],
  wes_poison: ['delapouite/rattlesnake','lorc/snake'],
  wes_tesla:  ['lorc/tesla-coil','caro-asercion/tesla-coil'],
  wes_grunt:  ['delapouite/bandit'],
  wes_runner: ['lorc/wolf-head','lorc/wolf-howl'],
  wes_tank:   ['lorc/bull','lorc/bull-horns'],
  wes_boss:   ['lorc/desert-skull','sbed/death-skull'],
  // ---------- Ninja ----------
  nin_rapid:  ['faithtoken/ninja-star','lorc/thrown-daggers'],
  nin_cannon: ['lorc/firework-rocket','lorc/rocket'],
  nin_frost:  ['lorc/yin-yang','delapouite/yin-yang','lorc/frostfire'],
  nin_sniper: ['lorc/supersonic-arrow','lorc/target-arrows'],
  nin_poison: ['delapouite/dart','lorc/snake-bite','lorc/poison-bottle'],
  nin_tesla:  ['lorc/lightning-frequency','lorc/focused-lightning'],
  nin_grunt:  ['lorc/ninja-mask','darkzaitzev/ninja-head'],
  nin_runner: ['darkzaitzev/running-ninja','darkzaitzev/ninja-heroic-stance'],
  nin_tank:   ['delapouite/samurai-helmet','delapouite/sumo'],
  nin_boss:   ['delapouite/devil-mask','lorc/oni-mask'],
  // ---------- Frozen ----------
  ice_rapid:  ['carl-olsen/crossbow'],
  ice_cannon: ['lorc/ice-bomb','lorc/frozen-orb','lorc/avalanche','delapouite/falling-rocks','lorc/ice-bolt'],
  ice_frost:  ['lorc/snowflake-1','lorc/snowflake-2'],
  ice_sniper: ['caro-asercion/barn-owl','lorc/owl'],
  ice_poison: ['lorc/frostfire','lorc/icicles-fence'],
  ice_tesla:  ['lorc/lightning-tree','lorc/lightning-branches'],
  ice_grunt:  ['delapouite/sasquatch'],
  ice_runner: ['lorc/direwolf','lorc/wolf-head'],
  ice_tank:   ['delapouite/ice-golem','delapouite/rock-golem'],
  ice_boss:   ['delapouite/frost-giant','cathelineau/polar-bear','delapouite/golem-head'],
  // ---------- Egyptian ----------
  egy_rapid:  ['delapouite/anubis'],
  egy_cannon: ['delapouite/great-pyramid','delapouite/mayan-pyramid'],
  egy_frost:  ['lorc/scarab-beetle'],
  egy_sniper: ['delapouite/eye-of-horus','lorc/eye-target'],
  egy_poison: ['delapouite/sand-snake','lorc/snake-totem'],
  egy_tesla:  ['lorc/sunbeams','lorc/sun','delapouite/sun'],
  egy_grunt:  ['delapouite/mummy-head'],
  egy_runner: ['lorc/gold-scarab','lorc/scarab-beetle'],
  egy_tank:   ['delapouite/egyptian-sphinx','delapouite/greek-sphinx'],
  egy_boss:   ['delapouite/horus','lorc/ankh'],
  // ---------- Cyberpunk ----------
  cyb_rapid:  ['sbed/turret','delapouite/walking-turret'],
  cyb_cannon: ['lorc/laser-blast','lorc/ion-cannon-blast'],
  cyb_frost:  ['lorc/brain-freeze','lorc/snowflake-2'],
  cyb_sniper: ['sbed/target-laser','delapouite/delivery-drone'],
  cyb_poison: ['lorc/virus','sbed/biohazard','lorc/poison-gas'],
  cyb_tesla:  ['sbed/tesla','lorc/tesla-coil'],
  cyb_hack:   ['delapouite/spider-bot','delapouite/cyber-eye'],
  cyb_grunt:  ['delapouite/robot-helmet','lorc/vintage-robot'],
  cyb_runner: ['delapouite/mono-wheel-robot','delapouite/tracked-robot'],
  cyb_tank:   ['delapouite/battle-mech','delapouite/mecha-head'],
  cyb_boss:   ['lorc/brain','delapouite/cyber-eye'],
  // ---------- Shared / UI ----------
  ui_coin:    ['delapouite/two-coins','lorc/crown-coin'],
  ui_heart:   ['delapouite/health-normal','lorc/hearts','badges/heart'],
  ui_wave:    ['lorc/big-wave','lorc/waves','delapouite/wave-surfer'],
  ui_star:    ['delapouite/round-star','lorc/round-star','badges/star','lorc/star-formation'],
  ui_skull:   ['sbed/death-skull','badges/skull'],
  ui_castle:  ['lorc/castle','delapouite/castle','lorc/white-tower'],
  ui_portal:  ['lorc/magic-portal','lorc/portal'],
  ab_strike:  ['delapouite/carpet-bombing','lorc/missile-swarm','lorc/incoming-rocket'],
  ab_freeze:  ['lorc/ice-spell-cast','lorc/snowflake-2','lorc/snowflake-1'],
  ab_rally:   ['lorc/sword-clash','lorc/crossed-swords','lorc/battle-gear'],
  ui_play:    ['guard13007/play-button'],
  ui_speed:   ['delapouite/fast-forward-button','lorc/fast-forward'],
  ui_sound:   ['delapouite/speaker','lorc/speaker','delapouite/sound-on'],
  ui_range:   ['lorc/radar-sweep','delapouite/radar-sweep'],
};

const BG = 'M0 0h512v512H0z';
const out = {};
const missing = [];
const used = {};
for (const [key, candidates] of Object.entries(M)) {
  let found = null;
  for (const cand of candidates) {
    const p = path.join(ROOT, cand + '.svg');
    if (fs.existsSync(p)) { found = { cand, p }; break; }
  }
  if (!found) { missing.push(key + ' -> ' + candidates.join(', ')); continue; }
  const svg = fs.readFileSync(found.p, 'utf8');
  const ds = [...svg.matchAll(/<path[^>]*\bd="([^"]+)"/g)].map(m => m[1]).filter(d => d !== BG);
  if (!ds.length) { missing.push(key + ' (no paths) -> ' + found.cand); continue; }
  out[key] = ds.join('~');
  used[key] = found.cand;
}
if (missing.length) { console.log('MISSING:'); missing.forEach(m => console.log('  ' + m)); }
let js = 'const ICON_SRC=' + JSON.stringify(out) + ';\n';
fs.writeFileSync('/tmp/icons_data.js', js);
const authors = new Set(Object.values(used).map(v => v.split('/')[0]));
console.log('Extracted', Object.keys(out).length, 'icons,', (js.length/1024).toFixed(0)+'KB');
console.log('Authors:', [...authors].sort().join(', '));
fs.writeFileSync('/tmp/icons_used.json', JSON.stringify(used, null, 1));
