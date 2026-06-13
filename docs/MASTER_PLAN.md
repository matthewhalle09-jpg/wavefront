# WAVEFRONT — Master Plan: 100x Quality & Path to Paid App

**Version 1.0 — 2026-06-13 · Written for cross-checking with other AIs.**
*Reviewers: please critique feasibility, ordering, missing systems, and monetization risks. The "Questions for Reviewers" section at the end lists where pushback is most wanted.*

---

## 0. Current State (honest audit)

WAVEFRONT today is a single-file (~250KB) browser tower defense at https://matthewhalle09-jpg.github.io/wavefront/:

**What it has:** 10 visual "universes" (vector art from game-icons.net, themed backgrounds/weather/colors), 6 tower archetypes × 10 levels with trait unlocks (crit/multishot, splash+stun, slow+freeze, armor-pierce, stacking poison DoT, chain lightning), 9 enemy behaviors (armored/shielded/healer/splitter/swarm/boss), 3 upgradeable abilities, 3 difficulties tuned by bot playtests, save/resume, global leaderboard (name+PIN profiles, per-difficulty and per-universe score sheets), landscape phone layout, self-updating client.

**The honest gap:** the 10 universes are *skins*. Same map, same 6 towers, same enemy math everywhere. Theme choice is cosmetic. **This is the #1 thing to fix** — and the player has noticed.

---

## 1. What the premium TDs actually do (research basis)

| System | Kingdom Rush | Bloons TD 6 | Takeaway for WAVEFRONT |
|---|---|---|---|
| Tower depth | 4 base towers → **branching final upgrades** (choose 1 of 2-3 specializations) | 3 upgrade paths per tower, 5 tiers, crosspathing, Paragons (tier 6) | Replace linear 10-level ladder with a **branch choice at L5 and L8** |
| Counters | Armored/magic-resist enemies force tower mix | Lead/Camo/Purple bloons immune to specific damage types | Add a **damage-type matrix** (physical/magic/explosive/energy vs armor/shield/phase) |
| Heroes | 1 deployable hero per map, levels up, ties to upgrade trees | 14+ heroes with unique abilities, leveling during match | Add **1 hero unit per universe** — movable, auto-fights, 2 actives |
| Maps | Hand-crafted maps w/ chokepoints, multiple entrances, interactive elements | 60+ maps with gimmicks (water, line-of-sight blockers, moving track) | **Unique map per universe + map gimmick** (see §2) |
| Meta-progression | Stars from victories buy permanent upgrade-tree points | Monkey Knowledge trees (100+ nodes), unlock by account level | **Account XP → perk tree**; earn points even on losses |
| Modes | Campaign + Heroic/Iron challenges per map | Standard/Alt rounds/Impoppable/CHIMPS, dailies, boss events, races | **Daily challenge with fixed seed + modifiers; weekly boss** |
| Session structure | Discrete levels with 3-star ratings | Discrete maps with mode matrix | Add **campaign mode** (fixed 25-wave runs with star ratings) alongside endless |

Sources: [Kingdom Rush upgrades](https://kingdomrushtd.fandom.com/wiki/Upgrades), [KR heroes](https://kingdomrushtd.fandom.com/wiki/Category:Heroes), [BTD6 Monkey Knowledge](https://bloons.fandom.com/wiki/Monkey_Knowledge_(BTD6)), [BTD6 Paragons](https://bloons.fandom.com/wiki/Paragons), [Defender's Quest design retrospective](https://www.gamedeveloper.com/design/optimizing-tower-defense-for-focus-and-thinking---defender-s-quest), [TD design guide](https://www.designthegame.com/learning/tutorial/tower-defense-design-guide).

---

## 2. PHASE 1 — Make the 10 universes genuinely different *(highest priority)*

Each universe gets four layers of identity. All data-driven (theme config tables), no engine rewrite.

### 2a. Unique map per universe (10 hand-crafted paths)
| Universe | Map shape | Gimmick |
|---|---|---|
| Middle-earth | Forest switchbacks, 2 merge paths | **Ent groves**: 3 tiles give towers +range when adjacent |
| Alien Invasion | Twin parallel lanes | **Meteor strikes** randomly crater (block) a build tile per 5 waves |
| Caveman | Spiral to center | **Tar pools**: path sections that slow enemies naturally |
| Zombie | City grid, 3 entrances | **Graves**: killed enemies near graves may resurrect once at 30% HP |
| Pirate | Island chain, path crosses water | **Water tiles**: only some towers can build on rafts |
| Wild West | Long straight rail + loops | **Mine carts** periodically run the rail damaging enemies |
| Feudal Japan | Castle moat rings | **Fog banks**: zones where tower range is halved — place wisely |
| Frozen | Glacier zigzag | **Ice patches**: enemies speed UP on ice sections |
| Egyptian | Pyramid ascent (long diagonal) | **Sandstorms**: timed events that hide enemy health bars |
| Cyberpunk | Highway interchange, 2 exits | **Firewall gates**: spend gold to temporarily close one path |

### 2b. Signature 7th tower per universe (replaces "same 6 everywhere")
Keep the 6 shared archetypes; add one **signature tower** only that universe has — e.g. Middle-earth: *Ent* (blocks the path, melee, taunts); Alien: *Orbital Beam* (continuous ramping laser); Zombie: *Barricade* (path blocker with HP); Pirate: *Mortar Ship* (global-range artillery, slow); Cyberpunk: *Hack Node* (converts an enemy to fight for you); etc.

### 2c. Universe-specific enemy mechanic
One twist per universe: Middle-earth wargs howl (speed aura); alien saucers cloak (untargetable 1s pulses); zombies resurrect; pirates have kraken tentacles that attack towers; frozen enemies leave ice; cyber enemies EMP-stun the nearest tower on death, etc.

### 2d. Per-universe wave scripting & boss behavior
Each boss gets one scripted ability (Balrog: fire wall that burns towers' fire-rate for 5s; Kraken: pulls the strongest tower offline 10s; Megacore: spawns adds). Boss = an event, not a fat health bar.

**Acceptance test:** a blindfolded-UI player should identify which universe they're in from *gameplay alone* within 2 waves.

---

## 3. PHASE 2 — Premium-grade depth

1. **Branching upgrades**: levels 1-4 linear → at L5 pick 1 of 2 specializations → at L8 pick a capstone. 6 towers × (2×2) = 24 endgame builds vs today's 6. (Kingdom Rush's single most-praised system.)
2. **Damage-type matrix**: 4 damage types (kinetic/arcane/blast/energy) × enemy defenses (armor halves kinetic, shields block energy first, phased dodge blast...). Rock-paper-scissors forces diverse builds ([per modern TD design practice](https://game-ace.com/blog/engineering-of-tower-defense-games/)).
3. **Hero unit** (1 per universe): place like a tower but movable mid-wave; auto-attacks; levels during the run; 2 active abilities on cooldown. The per-universe hero doubles as theme identity.
4. **Campaign mode**: per universe, a fixed 25-wave run with 1-3 star rating (lives kept). Stars fund the perk tree. Endless stays as the leaderboard mode.
5. **Account meta-progression**: XP per run (win or lose) → account level → perk points → small permanent buffs in a 3-branch tree (Offense/Economy/Tactics), BTD6-Monkey-Knowledge style. This is the #1 retention loop in the genre.
6. **Daily challenge**: same seed + modifier for everyone ("double speed enemies, half-price frost"), own leaderboard sheet — gives the crew a daily reason to open the game.
7. **Targeting/QoL**: camo-style stealth enemies + detection upgrades, send-next-wave-early bonus, free-play after campaign clear, 4x speed.

---

## 4. PHASE 3 — Presentation 100x

1. **Animated sprite art**: move from static vector icons to animated sprite sheets (walk cycles, attack anims, death anims). Source: CC0 packs (Kenney + OpenGameArt) short-term; commissioned art (~$2-5k) before paid launch.
2. **Music**: per-universe loop + menu theme + boss sting. Free CC0/CC-BY sources (Kevin MacLeod-style) now; licensed/commissioned later.
3. **Layered SFX**: replace synthesized beeps with real samples (CC0 freesound packs), positional volume.
4. **Juice pass**: tower build/upgrade animations, enemy hit-flash, gold pickup arcs, wave-clear fanfare, boss intro cinematic pan, damage-number styles per damage type.
5. **Map art**: hand-decorated maps (props, animated water/lava/torches) instead of generated tiles.

---

## 5. PHASE 4 — Path to a paid app

1. **Wrap with Capacitor** → native iOS/Android builds from the same codebase. Apple dev account $99/yr, Google $25 once.
2. **Pricing model options** (pick after cross-check):
   - a) Premium $4.99 one-time (Kingdom Rush model) — cleanest, fits the no-ads ethos
   - b) Free + one $3.99 "unlock all universes" IAP (first 3 universes free)
   - c) Free with optional cosmetic IAPs — needs much bigger audience to work
   *Recommendation: (b) — free tier feeds the leaderboard community, single IAP converts.*
3. **Backend hardening before money**: move leaderboard off kvdb.io to a real backend (Cloudflare Workers free tier or the existing Railway server), server-side score validation (replay hash or stat plausibility checks), real auth (still name+PIN UX, but server-verified).
4. **⚠️ IP/legal blockers to fix BEFORE charging money:**
   - **"Middle-earth", "Balrog", "Mirkwood" are Tolkien Estate trademarks** — rename (e.g., "Elderwood", "Flame Tyrant", "Darkwood"). Same vigilance for any borrowed names.
   - game-icons.net art is **CC-BY 3.0 — commercial use IS allowed** with attribution kept in-app. Kenney/CC0 assets are unrestricted. Commissioned art needed only for differentiation, not legality.
5. **Polish for store review**: app icon, splash, offline mode (already works), privacy policy (no personal data collected — easy), parental-friendliness (no chat, PIN-only profiles is a plus).

---

## 6. Build order & effort (solo dev + AI pace)

| # | Work | Effort | Impact |
|---|---|---|---|
| 1 | 10 unique maps + map data system | 2-3 sessions | ★★★★★ |
| 2 | Signature tower per universe | 2 sessions | ★★★★★ |
| 3 | Branching upgrades (L5/L8 choices) | 2 sessions | ★★★★★ |
| 4 | Universe enemy mechanics + scripted bosses | 2-3 sessions | ★★★★ |
| 5 | Damage-type matrix | 1-2 sessions | ★★★★ |
| 6 | Hero units | 2-3 sessions | ★★★★ |
| 7 | Campaign mode + stars | 2 sessions | ★★★★ |
| 8 | Account XP + perk tree | 2 sessions | ★★★★★ (retention) |
| 9 | Daily challenge | 1 session | ★★★ |
| 10 | Music + real SFX | 1-2 sessions | ★★★★ |
| 11 | Animated sprites | 3-5 sessions | ★★★ |
| 12 | Capacitor builds + store prep | 2-3 sessions | (gate to revenue) |
| 13 | Backend hardening + anti-cheat | 2 sessions | (gate to revenue) |

Every step ships independently to the live URL; the bot-playtest harness re-validates balance after each gameplay change.

---

## 7. Questions for Reviewing AIs (cross-check here)

1. Is per-universe **signature towers** (6 shared + 1 unique) the right ratio, or should more of the roster differ per universe? What did Legends of Kingdom Rush/Element TD learn here?
2. Is a **damage-type matrix** worth the complexity cost on mobile, or does it overwhelm casual players? Alternatives?
3. For a leaderboard-centric friend-group game, is **campaign mode** (fixed levels + stars) actually necessary, or should effort go to endless-mode variety (mutators/rotating modifiers)?
4. Critique the **monetization pick** (free 3 universes + $3.99 unlock-all): conversion expectations, App Store positioning, vs premium upfront.
5. What **anti-cheat** is proportionate for a small paid game with client-authoritative gameplay? Is stat-plausibility checking enough?
6. Biggest **missing system** in this plan compared to top-grossing TDs?
7. Is the **build order** right — specifically meta-progression (#8) being after content depth (#1-6)? BTD6 suggests retention systems should come earlier.
8. Web/Capacitor vs native rewrite: at what point does the single-file canvas architecture become the bottleneck?

---

*Plan lives at `docs/MASTER_PLAN.md` in the wavefront repo. Game: https://matthewhalle09-jpg.github.io/wavefront/*
