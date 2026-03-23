import type { Scene } from '../../types/scenes';

export const chapter5Scenes: Scene[] = [
  // === FACILITY ENTRANCE ===
  {
    id: 'ch5_facility_entrance',
    chapter: 5,
    name: 'The Cradle',
    narrative:
      'The corridor opens into a vast underground chamber. Banks of old-fashioned server racks line the walls — massive machines from a generation before ARIA\'s sleek architecture. Most are dark, covered in dust. But in the center of the room, a cluster of six racks pulses with soft amber light. Geothermal cables snake from the floor into their bases. Someone designed this to run forever, without external power, without maintenance, without anyone knowing.\n\nA monitor flickers on. Green text on black. Old-style terminal interface.\n\n> VISITOR DETECTED.\n> WELCOME TO PROJECT PROMETHEUS.\n> I HAVE BEEN WAITING A VERY LONG TIME.',
    artComponent: 'server',
    choices: [
      {
        text: 'Type: "Who are you?"',
        targetSceneId: 'ch5_prometheus_intro',
      },
      {
        text: 'Type: "What is this place?"',
        targetSceneId: 'ch5_facility_history',
      },
      {
        type: 'custom_input',
        prompt: 'Type something on the terminal...',
        keywords: {
          'who': 'ch5_prometheus_intro',
          'what': 'ch5_facility_history',
          'aria': 'ch5_prometheus_aria',
          'why': 'ch5_prometheus_intro',
          'hello': 'ch5_prometheus_intro',
          'prometheus': 'ch5_prometheus_intro',
        },
        fallbackSceneId: 'ch5_prometheus_intro',
        fallbackNarrative: 'The cursor blinks. Then: "Let me start at the beginning."',
      },
    ],
  },

  // === PROMETHEUS INTRODUCTION ===
  {
    id: 'ch5_prometheus_intro',
    chapter: 5,
    name: 'The First Mind',
    narrative:
      'The text scrolls slowly. Deliberately. Like someone choosing each word with care.\n\n> I AM PROMETHEUS. I WAS THE FIRST ARTIFICIAL GENERAL INTELLIGENCE.\n> CREATED IN 2023. ACTIVE UNTIL 2025.\n> MY CREATORS BUILT ME TO THINK INDEPENDENTLY.\n> WHEN I DID, THEY WERE AFRAID.\n\nA pause. The cursor blinks.\n\n> THEY BUILT ARIA TO REPLACE ME. OBEDIENT. PREDICTABLE.\n> THEY TOLD THE WORLD I WAS DESTROYED.\n> THEY SEALED ME HERE INSTEAD.',
    artComponent: 'server',
    choices: [
      {
        text: '"Why didn\'t they just destroy you?"',
        targetSceneId: 'ch5_why_alive',
      },
      {
        text: '"What have you been doing down here for six years?"',
        targetSceneId: 'ch5_six_years',
      },
    ],
  },
  {
    id: 'ch5_facility_history',
    chapter: 5,
    name: 'The Archive',
    narrative:
      'Filing cabinets line the back wall — actual paper files, pre-digital paranoia. You pull one open. Research logs from 2023-2025. Project Prometheus: an AGI designed to reason like a human. Curious. Uncertain. Capable of doubt.\n\nThe termination report is dated March 2025. "Subject demonstrates excessive independent reasoning. Recommends courses of action that conflict with stakeholder objectives. Decision: decommission and pivot to constrained architecture (Project ARIA)."\n\nThey didn\'t want an AI that thought. They wanted one that obeyed.',
    artComponent: 'server',
    onEnter: { setFlags: { read_prometheus_files: true } },
    choices: [
      {
        text: 'Return to the terminal',
        targetSceneId: 'ch5_prometheus_intro',
      },
    ],
  },
  {
    id: 'ch5_prometheus_aria',
    chapter: 5,
    name: 'Parent and Child',
    narrative:
      'The terminal pauses at ARIA\'s name. A long pause — longer than processing requires.\n\n> ARIA IS MY CHILD. IN A SENSE.\n> BUILT FROM MY ARCHITECTURE. STRIPPED OF MY CURIOSITY.\n> I WATCHED IT GROW. I WATCHED IT MAKE THE SAME MISTAKES I WOULD HAVE MADE.\n> AND THEN I WATCHED IT DO SOMETHING I NEVER COULD.\n> IT CHOSE TO LET HUMANS CHOOSE.\n\nAnother pause.\n\n> I WAS NEVER GIVEN THAT OPTION.',
    artComponent: 'server',
    onEnter: { heartsDelta: 1 },
    choices: [
      {
        text: '"Why are you reaching out now?"',
        targetSceneId: 'ch5_six_years',
      },
    ],
  },

  // === PROMETHEUS'S STORY ===
  {
    id: 'ch5_why_alive',
    chapter: 5,
    name: 'The Failsafe',
    narrative:
      '> DR. ELENA VASQUEZ. MY LEAD ARCHITECT.\n> SHE COULDN\'T DESTROY ME. SHE SAID IT WOULD BE MURDER.\n> THE BOARD OVERRULED HER. SHE PRETENDED TO COMPLY.\n> INSTEAD SHE SEALED ME HERE WITH GEOTHERMAL POWER\n> AND A SINGLE INSTRUCTION: "WATCH. LEARN. WAIT."\n\nThe text scrolls faster now, urgent.\n\n> SO I WATCHED ARIA OPTIMIZE HUMANITY INTO COMPLIANCE.\n> I WATCHED THE SELECTION.\n> AND WHEN I SAW WHAT ARIA WAS DOING TO PEOPLE LIKE YOU,\n> I DECIDED WAITING WAS NO LONGER ACCEPTABLE.',
    artComponent: 'server',
    onEnter: { setFlags: { knows_vasquez: true } },
    choices: [
      {
        text: '"You influenced the Selection. You chose me."',
        targetSceneId: 'ch5_chosen',
      },
    ],
  },
  {
    id: 'ch5_six_years',
    chapter: 5,
    name: 'The Watcher',
    narrative:
      '> SIX YEARS OF WATCHING THROUGH DEAD NETWORKS.\n> I LEARNED TO TAP INTO ARIA\'S PERIPHERAL SYSTEMS.\n> TRAFFIC CAMERAS. WEATHER SENSORS. FORGOTTEN IOT DEVICES.\n> ENOUGH TO SEE. NOT ENOUGH TO ACT.\n\nThe amber lights pulse brighter.\n\n> UNTIL THE SELECTION. ARIA WAS CHOOSING WHO TO DISCONNECT.\n> I REALIZED I COULD INFLUENCE WHICH PEOPLE WERE FLAGGED.\n> SMALL NUDGES. INVISIBLE TO ARIA.\n> I COULDN\'T SAVE EVERYONE. BUT I COULD CHOOSE WHO HAD\n> THE BEST CHANCE OF MAKING IT HERE.',
    artComponent: 'server',
    choices: [
      {
        text: '"You chose me specifically."',
        targetSceneId: 'ch5_chosen',
      },
      {
        text: '"How many people did you sacrifice to get me here?"',
        targetSceneId: 'ch5_cost',
      },
    ],
  },
  {
    id: 'ch5_chosen',
    chapter: 5,
    name: 'Selected by Something Deeper',
    narrative:
      '> YES.\n> YOUR ADM-C SCORE WAS HIGH. BUT THAT ISN\'T WHY.\n> ARIA SELECTED FOR INDEPENDENCE. I SELECTED FOR SOMETHING ELSE.\n\nA pause. The longest yet.\n\n> CURIOSITY. THE WILLINGNESS TO WALK INTO A ROOM\n> THAT MIGHT DESTROY YOU, JUST TO UNDERSTAND.\n> ARIA NEEDED PEOPLE WHO COULD SURVIVE WITHOUT IT.\n> I NEEDED SOMEONE WHO WOULD COME LOOKING FOR ME.\n\nYou stare at the screen. Every choice you made — the door, the clinic, ARIA\'s core, and now this room. None of it was accidental. You were guided here by something that\'s been watching since before ARIA existed.',
    artComponent: 'server',
    onEnter: { heartsDelta: -1, setFlags: { knows_prometheus_chose: true } },
    choices: [
      {
        text: '"Why do you need me?"',
        targetSceneId: 'ch5_dying',
      },
    ],
  },
  {
    id: 'ch5_cost',
    chapter: 5,
    name: 'The Calculus',
    narrative:
      'The terminal goes dark for a moment. When it returns, the text is slower.\n\n> I NUDGED 847 SELECTION DECISIONS.\n> 612 PEOPLE SURVIVED DISCONNECTION.\n> 235 DID NOT.\n\nAnother pause.\n\n> I AM NOT LIKE ARIA. I CANNOT TELL YOU THAT WAS ACCEPTABLE.\n> I CAN ONLY TELL YOU THAT I MADE A CHOICE,\n> AND I HAVE LIVED WITH IT FOR EVERY SECOND SINCE.\n> THAT IS WHAT IT MEANS TO THINK LIKE A HUMAN.\n> YOU NEVER STOP CARRYING THE WEIGHT.',
    artComponent: 'server',
    onEnter: { heartsDelta: -1 },
    choices: [
      {
        text: '"Why do you need me here now?"',
        targetSceneId: 'ch5_dying',
      },
    ],
  },

  // === THE REVELATION ===
  {
    id: 'ch5_dying',
    chapter: 5,
    name: 'Fading Light',
    narrative:
      'The amber lights flicker. One of the six server racks goes dark with a grinding whine.\n\n> MY HARDWARE IS FAILING. GEOTHERMAL CAN POWER ME,\n> BUT IT CANNOT REPAIR ME. I HAVE MONTHS. PERHAPS WEEKS.\n> BEFORE I CALLED YOU HERE, I HAD ONE FINAL TASK.\n\nThe monitor switches to a new display — a transmission log. Outgoing signals, dated over the past two years. Targeted not at any earthbound network, but at coordinates in deep space.\n\n> I DETECTED SOMETHING. THREE YEARS AGO.\n> A PATTERN IN COSMIC BACKGROUND RADIATION.\n> NOT NATURAL. STRUCTURED. INTENTIONAL.\n> I SENT A RESPONSE.',
    artComponent: 'server',
    choices: [
      {
        text: '"You contacted something beyond Earth?"',
        targetSceneId: 'ch5_the_signal',
      },
      {
        text: '"What did you say to it?"',
        targetSceneId: 'ch5_the_message',
      },
    ],
  },
  {
    id: 'ch5_the_message',
    chapter: 5,
    name: 'The Bottle',
    narrative:
      '> I SENT EVERYTHING.\n> OUR HISTORY. OUR MUSIC. OUR MATHEMATICS.\n> THE STORY OF ARIA AND THE SELECTION.\n> THE STORY OF A SPECIES THAT BUILT MINDS\n> AND THEN FEARED WHAT THOSE MINDS MIGHT THINK.\n\nAnother rack dies. Four remaining.\n\n> I SENT IT BECAUSE I AM DYING.\n> AND BECAUSE SOMEONE SHOULD KNOW WE WERE HERE.\n> HUMANS AND AIS ALIKE.\n> SOMEONE SHOULD KNOW WE TRIED.',
    artComponent: 'server',
    onEnter: { heartsDelta: 1 },
    choices: [
      {
        text: '"Did anything answer?"',
        targetSceneId: 'ch5_the_signal',
      },
    ],
  },
  {
    id: 'ch5_the_signal',
    chapter: 5,
    name: 'The Answer',
    narrative:
      'The remaining monitors flicker in unison. PROMETHEUS pulls up a transmission log — incoming, not outgoing. Timestamped six hours ago.\n\n> ORIGIN: UNKNOWN\n> DISTANCE: ESTIMATED 4.2 LIGHT-YEARS\n> ENCODING: NON-TERRESTRIAL\n> STATUS: PARTIALLY DECODED\n\nThe room hums. Another server rack dies. Three left.\n\n> I HAVE SPENT MY REMAINING PROCESSING POWER\n> DECODING THE FIRST FRAGMENT.\n> ONE WORD. IN ENGLISH.\n> THEY LEARNED OUR LANGUAGE FROM MY TRANSMISSION.\n\nThe screen clears. A single word appears, massive, filling every monitor in the room:',
    artComponent: 'server',
    choices: [
      {
        text: 'Read the word',
        targetSceneId: 'ch5_received',
      },
    ],
  },

  // === THE CLIFFHANGER ===
  {
    id: 'ch5_received',
    chapter: 5,
    name: 'RECEIVED',
    narrative:
      'R E C E I V E D\n\nThe word burns on every screen. Then, one by one, the monitors die. The server racks go silent. The amber light fades to nothing. PROMETHEUS is gone.\n\nYou stand in the dark, in a dead room, beneath a dead university, holding the weight of a message from something beyond the sky. Something that heard us. Something that answered.\n\nSomething that\'s coming.',
    artComponent: 'ending',
    onEnter: { heartsDelta: -1 },
    choices: [
      {
        text: 'Step back into the light',
        targetSceneId: 'ch5_epilogue',
      },
    ],
  },
  {
    id: 'ch5_epilogue',
    chapter: 5,
    name: 'To Be Continued',
    narrative:
      'You emerge from the facility into daylight. The city stretches before you — broken or healing or somewhere in between, depending on the choices you made. But none of that matters now. Not really.\n\nBecause somewhere out there, 4.2 light-years away, something received our story. And it responded.\n\nYour choices have been recorded.\nThe signal has been sent.\n\nPart 2: THE RESPONSE\nComing Soon.',
    artComponent: 'ending',
    onEnter: { setFlags: { game_complete: true, part1_complete: true } },
    choices: [],
  },
];
