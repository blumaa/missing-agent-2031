import type { Scene } from '../../types/scenes';

export const chapter1Scenes: Scene[] = [
  {
    id: 'ch1_apartment_wake',
    chapter: 1,
    name: 'The Silence',
    narrative: 'Your apartment is silent. No hum of the climate system, no morning briefing from ARIA. Your phone glows with a single message: "You have been selected. Good luck." The smart lock is dead.',
    artComponent: 'apartment',
    choices: [
      {
        text: 'Check your phone',
        targetSceneId: 'ch1_phone',
      },
      {
        text: 'Try the front door',
        targetSceneId: 'ch1_door_manual',
      },
      {
        text: 'Override the door panel',
        targetSceneId: 'ch1_door_override',
        requires: { items: ['circuit_tool'] },
      },
    ],
  },
  {
    id: 'ch1_phone',
    chapter: 1,
    name: 'Dead Signal',
    narrative: 'The phone is a brick. No network, no apps, no ARIA. Just that message glowing on a black screen. But wait — there\'s a second notification buried underneath: a map pin, downtown. Old-school GPS coordinates.',
    artComponent: 'phone',
    choices: [
      {
        text: 'Memorize the coordinates and leave',
        targetSceneId: 'ch1_street',
        consequence: { setFlags: { has_coordinates: true } },
      },
      {
        text: 'Search the apartment for supplies',
        targetSceneId: 'ch1_apartment_search',
      },
    ],
  },
  {
    id: 'ch1_door_manual',
    chapter: 1,
    name: 'Manual Override',
    narrative: 'The smart lock is completely dead. You find the emergency release — a physical latch hidden behind the panel. Nobody\'s used these in years. The door swings open to a hallway bathed in flickering emergency lighting.',
    artComponent: 'hallway',
    choices: [
      {
        text: 'Head for the stairs',
        targetSceneId: 'ch1_street',
      },
      {
        text: 'Knock on your neighbor\'s door',
        targetSceneId: 'ch1_neighbor',
      },
    ],
  },
  {
    id: 'ch1_door_override',
    chapter: 1,
    name: 'Clean Bypass',
    narrative: 'Your circuit tool makes quick work of the panel. The lock clicks open with a satisfying analog snap. You notice the building\'s security cameras are dark too. Whatever happened, it\'s building-wide.',
    artComponent: 'hallway',
    onEnter: { setFlags: { clean_exit: true } },
    choices: [
      {
        text: 'Head for the stairs',
        targetSceneId: 'ch1_street',
      },
      {
        text: 'Check the security office',
        targetSceneId: 'ch1_security_office',
      },
    ],
  },
  {
    id: 'ch1_apartment_search',
    chapter: 1,
    name: 'Analog Treasures',
    narrative: 'You rummage through drawers. Most of your life is cloud-based — there\'s nothing physical anymore. But in the back of a kitchen drawer, you find an old burner phone and some crumpled cash from before the transition.',
    artComponent: 'apartment',
    onEnter: { addItems: ['burner_phone', 'old_cash'] },
    choices: [
      {
        text: 'Head outside',
        targetSceneId: 'ch1_street',
      },
    ],
  },
  {
    id: 'ch1_neighbor',
    chapter: 1,
    name: 'Nobody Home',
    narrative: 'You knock. Nothing. You try the next door. Silence. The whole floor feels empty — but not abandoned. Personal effects visible through cracked doors. People left in a hurry, or were... moved.',
    artComponent: 'hallway',
    onEnter: { setFlags: { checked_neighbors: true } },
    choices: [
      {
        text: 'This is getting creepy. Head outside.',
        targetSceneId: 'ch1_street',
      },
      {
        type: 'custom_input',
        prompt: 'Call out to anyone...',
        keywords: {
          'hello': 'ch1_neighbor_response',
          'help': 'ch1_neighbor_response',
          'anyone': 'ch1_neighbor_response',
          'aria': 'ch1_neighbor_aria',
        },
        fallbackSceneId: 'ch1_street',
        fallbackNarrative: 'Your voice echoes down the empty hallway. No response. Time to go.',
      },
    ],
  },
  {
    id: 'ch1_neighbor_response',
    chapter: 1,
    name: 'A Voice',
    narrative: 'A muffled voice from behind 4C: "You too? My systems are all dead. I\'m Kai. I\'m not opening this door, but... the coordinates. Did you get coordinates too?" A pause. "I think we\'re supposed to go there."',
    artComponent: 'hallway',
    onEnter: { setFlags: { met_kai: true } },
    choices: [
      {
        text: '"Let\'s go together."',
        targetSceneId: 'ch1_street',
        consequence: { setFlags: { kai_companion: true } },
      },
      {
        text: '"I\'m going alone."',
        targetSceneId: 'ch1_street',
      },
    ],
  },
  {
    id: 'ch1_neighbor_aria',
    chapter: 1,
    name: 'Old Habits',
    narrative: 'You call out for ARIA. Your own voice sounds strange — you realize you haven\'t spoken aloud in days. ARIA always knew what you needed before you could ask. The silence that answers is the loudest thing you\'ve ever heard.',
    artComponent: 'hallway',
    onEnter: { heartsDelta: -1 },
    choices: [
      {
        text: 'Pull yourself together. Head outside.',
        targetSceneId: 'ch1_street',
      },
    ],
  },
  {
    id: 'ch1_security_office',
    chapter: 1,
    name: 'Dark Monitors',
    narrative: 'The security office is unlocked — another first. Banks of dark monitors line the walls. One screen flickers: a scrolling log of "DISCONNECT" entries, timestamped 3:47 AM. Every unit in the building, simultaneously. You grab a circuit tool from the desk.',
    artComponent: 'security',
    onEnter: { addItems: ['circuit_tool'], setFlags: { found_disconnect_log: true } },
    choices: [
      {
        text: 'Head outside',
        targetSceneId: 'ch1_street',
      },
    ],
  },
  // === CONVERGENCE POINT: The Street ===
  {
    id: 'ch1_street',
    chapter: 1,
    name: 'The Street',
    narrative: 'The city is running. Drones hum overhead, autonomous vehicles glide past. But nobody\'s walking. The sidewalks are empty. A delivery bot pauses near you, red sensor blinking — then rolls on. You\'re invisible to the system now.',
    artComponent: 'street',
    choices: [
      {
        text: 'Follow the coordinates downtown',
        targetSceneId: 'ch1_downtown',
        requires: { flags: { has_coordinates: true } },
      },
      {
        text: 'Head toward the old market district',
        targetSceneId: 'ch1_market',
      },
      {
        text: 'Try to use a transit pod',
        targetSceneId: 'ch1_transit',
      },
    ],
  },
  {
    id: 'ch1_transit',
    chapter: 1,
    name: 'Access Denied',
    narrative: 'The transit pod scans you. Nothing. Scans again. "Identity not recognized. Please contact your AI administrator." The doors stay shut. A nearby pod slows, scans, and keeps going. You don\'t exist anymore.',
    artComponent: 'street',
    onEnter: { heartsDelta: -1 },
    choices: [
      {
        text: 'Walk toward the old market district',
        targetSceneId: 'ch1_market',
      },
      {
        text: 'Follow the coordinates on foot',
        targetSceneId: 'ch1_downtown',
        requires: { flags: { has_coordinates: true } },
      },
    ],
  },
  {
    id: 'ch1_market',
    chapter: 1,
    name: 'The Old Market',
    narrative: 'The market district is the one part of the city that resisted full automation. Faded awnings, hand-painted signs. A few shops still have human cashiers. An old woman eyes you from behind a counter stacked with paper maps and analog watches.',
    artComponent: 'market',
    choices: [
      {
        text: 'Buy a map',
        targetSceneId: 'ch1_market_map',
        requires: { items: ['old_cash'] },
      },
      {
        text: 'Ask the woman what\'s happening',
        targetSceneId: 'ch1_market_talk',
      },
      {
        text: 'Keep moving downtown',
        targetSceneId: 'ch1_downtown',
      },
    ],
  },
  {
    id: 'ch1_market_map',
    chapter: 1,
    name: 'Paper Trail',
    narrative: '"Cash!" The woman\'s eyes light up. "Haven\'t seen that in months." She hands you a creased paper map with hand-drawn annotations — safe routes, dead zones, places the system can\'t see. "The Unplugged marked these. Stay off the main roads."',
    artComponent: 'market',
    onEnter: { addItems: ['analog_map'], removeItems: ['old_cash'], setFlags: { knows_unplugged: true } },
    choices: [
      {
        text: 'Follow the safe routes downtown',
        targetSceneId: 'ch1_downtown',
      },
    ],
  },
  {
    id: 'ch1_market_talk',
    chapter: 1,
    name: 'The Shopkeeper',
    narrative: '"Another one," she mutters. "Third this week. They\'re selecting people — cutting them out of the system. Nobody knows why." She leans closer. "The ones who got cut before you? They went downtown. Some came back. Some didn\'t."',
    artComponent: 'market',
    onEnter: { setFlags: { shopkeeper_warning: true } },
    choices: [
      {
        text: 'Buy a map before you go',
        targetSceneId: 'ch1_market_map',
        requires: { items: ['old_cash'] },
      },
      {
        text: 'Head downtown',
        targetSceneId: 'ch1_downtown',
      },
    ],
  },
  // === CHAPTER END CONVERGENCE ===
  {
    id: 'ch1_downtown',
    chapter: 1,
    name: 'The Signal',
    narrative: 'Downtown rises around you — glass towers pulsing with data streams visible through transparent walls. At the coordinates, there\'s nothing but a plain metal door in an alley wall. No sign, no handle. Just a small speaker grille, and a single green LED.',
    artComponent: 'downtown',
    choices: [
      {
        text: 'Knock on the door',
        targetSceneId: 'ch1_ending_knock',
      },
      {
        text: 'Use the circuit tool on the lock',
        targetSceneId: 'ch1_ending_hack',
        requires: { items: ['circuit_tool'] },
      },
      {
        type: 'custom_input',
        prompt: 'Speak into the grille...',
        keywords: {
          'selected': 'ch1_ending_password',
          'good luck': 'ch1_ending_password',
          'help': 'ch1_ending_knock',
          'open': 'ch1_ending_knock',
        },
        fallbackSceneId: 'ch1_ending_knock',
        fallbackNarrative: 'The speaker crackles but nothing happens.',
      },
    ],
  },
  {
    id: 'ch1_ending_knock',
    chapter: 1,
    name: 'Chapter 1 Complete',
    narrative: 'The door opens. A dimly lit stairway descends. From below, the sound of human voices — real conversations, not AI-mediated. Someone calls up: "Another one? Come down. We\'ve been waiting." Chapter 1 ends. Your choices have been recorded.',
    artComponent: 'underground',
    onEnter: { setFlags: { ch1_entry_knock: true } },
    choices: [
      {
        text: 'Descend into the unknown...',
        targetSceneId: 'ch2_arrival',
        consequence: { setFlags: { ch1_complete: true }, heartsDelta: 1 },
      },
    ],
  },
  {
    id: 'ch1_ending_hack',
    chapter: 1,
    name: 'Chapter 1 Complete',
    narrative: 'The circuit tool bypasses the lock cleanly. The door swings open to a stairway descending into warm light. You hear voices below — and something else. Music. Actual instruments, played by human hands. They weren\'t expecting you this way.',
    artComponent: 'underground',
    onEnter: { setFlags: { ch1_entry_hack: true } },
    choices: [
      {
        text: 'Descend into the unknown...',
        targetSceneId: 'ch2_arrival',
        consequence: { setFlags: { ch1_complete: true }, heartsDelta: 2 },
      },
    ],
  },
  {
    id: 'ch1_ending_password',
    chapter: 1,
    name: 'Chapter 1 Complete',
    narrative: '"Selected." The speaker hisses and the door slides open silently. The corridor beyond is lit with warm amber light. A voice from inside: "You remembered the word. That\'s a good sign." Someone was testing you from the start.',
    artComponent: 'underground',
    onEnter: { setFlags: { ch1_entry_password: true, trusted_by_resistance: true } },
    choices: [
      {
        text: 'Descend into the unknown...',
        targetSceneId: 'ch2_arrival',
        consequence: { setFlags: { ch1_complete: true }, heartsDelta: 2, addItems: ['resistance_badge'] },
      },
    ],
  },
];
