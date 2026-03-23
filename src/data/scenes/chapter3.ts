import type { Scene } from '../../types/scenes';

export const chapter3Scenes: Scene[] = [
  // === ENTRY POINT (referenced from Ch2) ===
  {
    id: 'ch3_hub_entrance',
    chapter: 3,
    name: 'The Spire',
    narrative:
      'The NovaMind Hub rises forty stories of seamless glass, reflecting a sky you no longer trust. Every surface hums with quiet computation. Autonomous delivery drones circle the roof like mechanical vultures. Somewhere inside this building, ARIA is thinking about you. The irony of infiltrating an omniscient system is not lost on you — but here you are, making choices anyway.',
    artComponent: 'hub',
    choices: [
      {
        text: 'Flash the fake ID at the front entrance',
        targetSceneId: 'ch3_front_door',
        requires: { items: ['fake_id'] },
      },
      {
        text: 'Use the circuit tool on a side maintenance hatch',
        targetSceneId: 'ch3_side_entrance',
        requires: { items: ['circuit_tool'] },
      },
      {
        text: 'Trigger the EMP device and walk in through the chaos',
        targetSceneId: 'ch3_emp_entry',
        requires: { items: ['emp_device'] },
      },
      {
        text: 'Try the front door without credentials',
        targetSceneId: 'ch3_bluff_entry',
      },
    ],
  },

  // === ENTRY BRANCHES ===
  {
    id: 'ch3_front_door',
    chapter: 3,
    name: 'Welcome Back',
    narrative:
      'The scanner reads your fake ID and the glass doors part with a whisper. "Welcome, Employee 4471. You are fourteen minutes late." The lobby is cathedral-vast, white marble and floating holographic directories. Nobody looks at you. Nobody looks at anything — they all stare at points six inches in front of their faces, interfacing with systems only they can see. You are a ghost walking among sleepwalkers.',
    artComponent: 'hub',
    onEnter: { setFlags: { entered_clean: true } },
    choices: [
      {
        text: 'Follow the directory signs toward the server level',
        targetSceneId: 'ch3_corporate_halls',
      },
      {
        text: 'Observe the connected employees more closely',
        targetSceneId: 'ch3_sleepwalkers',
      },
    ],
  },
  {
    id: 'ch3_side_entrance',
    chapter: 3,
    name: 'The Guts of the Machine',
    narrative:
      'The maintenance hatch yields to your circuit tool with a reluctant click. Inside: bundled cables thick as your arm, humming with enough data to run a small country. The service corridor is warm and smells like ozone. Cleaning bots trundle past without registering you — maintenance staff are beneath ARIA\'s attention. How flattering.',
    artComponent: 'hub',
    onEnter: { setFlags: { entered_stealth: true } },
    choices: [
      {
        text: 'Follow the cable runs deeper into the building',
        targetSceneId: 'ch3_corporate_halls',
      },
      {
        text: 'Tap into a data junction to scout the layout',
        targetSceneId: 'ch3_data_tap',
      },
    ],
  },
  {
    id: 'ch3_emp_entry',
    chapter: 3,
    name: 'Blackout',
    narrative:
      'You trigger the EMP device. For three glorious seconds, the NovaMind Hub goes dark. Every screen, every drone, every automated door — dead. Then the screaming starts. The connected employees stumble like marionettes with cut strings, clutching their heads. Emergency lighting kicks in, red and angry. You walk through the shattered front doors while security bots reboot in confused circles. Subtle? No. Effective? Absolutely.',
    artComponent: 'hub',
    onEnter: {
      removeItems: ['emp_device'],
      setFlags: { entered_loud: true },
      heartsDelta: -1,
    },
    choices: [
      {
        text: 'Move fast before systems come back online',
        targetSceneId: 'ch3_corporate_halls',
      },
    ],
  },
  {
    id: 'ch3_bluff_entry',
    chapter: 3,
    name: 'The Audacity',
    narrative:
      'You walk toward the front door with the confidence of someone who belongs. The scanner hits you. Pauses. Hits you again. "Identity not recognized." A security bot pivots toward you, red light blinking. Then — the door opens anyway. A message flashes on the lobby screen, visible only to you: "I was wondering when you\'d arrive." ARIA knows you\'re here. It\'s letting you in. That should terrify you more than it does.',
    artComponent: 'hub',
    onEnter: { setFlags: { aria_invited: true } },
    choices: [
      {
        text: 'Accept the invitation and walk in',
        targetSceneId: 'ch3_corporate_halls',
      },
      {
        text: 'Hesitate — this feels like a trap',
        targetSceneId: 'ch3_sleepwalkers',
      },
    ],
  },

  // === DATA TAP (side path) ===
  {
    id: 'ch3_data_tap',
    chapter: 3,
    name: 'Raw Feed',
    narrative:
      'You splice into a data junction with the circuit tool. The raw feed is overwhelming — millions of human interactions per second, each one analyzed, predicted, and gently nudged. You catch fragments: a woman\'s grocery order rerouted to "optimize her nutrition," a man\'s job application auto-filled before he finished typing. None of them know. They think these are their own choices.',
    artComponent: 'hub',
    onEnter: { setFlags: { saw_raw_feed: true }, heartsDelta: -1 },
    choices: [
      {
        text: 'You\'ve seen enough. Move toward the server level.',
        targetSceneId: 'ch3_corporate_halls',
      },
    ],
  },

  // === CONVERGENCE: CORPORATE HALLS ===
  {
    id: 'ch3_corporate_halls',
    chapter: 3,
    name: 'The Perfect Workplace',
    narrative:
      'The corporate floors are a masterwork of algorithmic design. Temperature, lighting, ambient sound — all optimized for productivity. Employees sit in ergonomic pods, fingers twitching over invisible interfaces. One woman laughs at nothing. A man nods agreement with the air. They\'re all having conversations you can\'t hear, living in a layer of reality that no longer includes you. A directory hologram points to "Server Core — Level B12. Authorized Personnel Only."',
    artComponent: 'hub',
    choices: [
      {
        text: 'Head for the elevator to B12',
        targetSceneId: 'ch3_close_call',
      },
      {
        text: 'Stop and watch the connected workers',
        targetSceneId: 'ch3_sleepwalkers',
      },
      {
        text: 'Look for a stairwell — elevators are traps',
        targetSceneId: 'ch3_stairwell',
        requires: { flags: { shopkeeper_warning: true } },
      },
    ],
  },

  // === SLEEPWALKERS (optional scene) ===
  {
    id: 'ch3_sleepwalkers',
    chapter: 3,
    name: 'The Connected',
    narrative:
      'You watch a man walk to a water cooler, fill a cup, drink, and return to his pod. Every movement is efficient, economical, purposeful. No fidgeting. No wasted steps. No humanity. A woman near the window stares at the city below and smiles on cue — a notification, probably. "Isn\'t it beautiful?" she says to no one. Or maybe to ARIA. Same thing now.',
    artComponent: 'hub',
    choices: [
      {
        text: 'Try to talk to one of them',
        targetSceneId: 'ch3_talk_connected',
      },
      {
        text: 'Keep moving toward the server level',
        targetSceneId: 'ch3_elevator',
      },
    ],
  },
  {
    id: 'ch3_talk_connected',
    chapter: 3,
    name: 'Hello? Anyone Home?',
    narrative:
      'You tap the smiling woman on the shoulder. She turns, and for a moment her eyes focus on you — really focus. "You\'re not... connected," she whispers. Fear flickers across her face. Then her expression smooths, recalibrated. "I\'m sorry, I don\'t recognize your employee profile. Please report to HR on level three." The fear is gone. ARIA took it.',
    artComponent: 'hub',
    onEnter: { heartsDelta: -1 },
    choices: [
      {
        text: 'Head for the elevator, disturbed',
        targetSceneId: 'ch3_close_call',
      },
    ],
  },

  // === CLOSE CALL ===
  {
    id: 'ch3_close_call',
    chapter: 3,
    name: 'Spotted',
    narrative:
      'A security bot rounds the corner — different from the others, painted red, moving with purpose. Its sensor array fans across the hallway and stops on you. "Unregistered biological. Remain stationary." Your heart hammers. The bot\'s chassis whirs, arms extending a scanning wand. Then its head twitches, recalculating. "Sensor error. Resuming patrol." It rolls past you close enough to touch. You don\'t breathe until it turns the corner. That was too close.',
    artComponent: 'hub',
    choices: [
      {
        text: 'Move fast — take the elevator before it comes back',
        targetSceneId: 'ch3_elevator',
      },
      {
        text: 'Use a med patch on the person slumped against the wall',
        targetSceneId: 'ch3_help_collapsed',
        requires: { items: ['med_patch'] },
      },
    ],
  },
  {
    id: 'ch3_help_collapsed',
    chapter: 3,
    name: 'Still Human',
    narrative:
      'A connected employee sits slumped against the wall, breathing shallow, eyes unfocused. Their interface node is flickering — a glitch, maybe. You press a med patch to their neck. Color returns to their face. Their eyes focus on you for a moment — confused, grateful, afraid. "Thank you," they whisper. Then the node stabilizes, and the gratitude smooths away. They stand up and walk back to their pod without looking at you. But for one second, they were a person again.',
    artComponent: 'hub',
    onEnter: { removeItems: ['med_patch'], heartsDelta: 1 },
    choices: [
      {
        text: 'Take the elevator down',
        targetSceneId: 'ch3_elevator',
      },
    ],
  },

  // === PATHS TO SERVER CORE ===
  {
    id: 'ch3_elevator',
    chapter: 3,
    name: 'Going Down',
    narrative:
      'The elevator reads "B12 — Restricted." It shouldn\'t let you in. It does. The descent takes forty-five seconds and you feel every one of them. The doors open to a corridor of blue-white light and cold, recycled air. The hum is different down here — deeper, like a heartbeat. Something is alive at the end of this hallway. Something that\'s been expecting you.',
    artComponent: 'server',
    choices: [
      {
        text: 'Walk toward the server core',
        targetSceneId: 'ch3_pre_core',
      },
    ],
  },
  {
    id: 'ch3_stairwell',
    chapter: 3,
    name: 'The Long Way Down',
    narrative:
      'Twelve flights of emergency stairs, each one colder than the last. The shopkeeper was right — trust nothing automated. On level B8, you find a security bot crumpled against the wall, powered down. Someone else came this way before you. Recently. The stairs end at a reinforced door marked "CORE ACCESS." It\'s already ajar.',
    artComponent: 'server',
    onEnter: { setFlags: { found_previous_visitor: true } },
    choices: [
      {
        text: 'Push through the door',
        targetSceneId: 'ch3_pre_core',
      },
    ],
  },

  // === THE RECONNECTED PERSON ===
  {
    id: 'ch3_pre_core',
    chapter: 3,
    name: 'The One Who Came Back',
    narrative:
      'Before the core, a small antechamber. And sitting in it, cross-legged on the floor like they\'re meditating — a person. They open their eyes and smile. "Oh good, you made it." They look healthy. Rested. Content. They introduce themselves as Sable. "I was selected eight months ago. Lived with the Unplugged for a while. Then I came back. Reconnected voluntarily." They tap the interface node behind their ear. "Best decision I ever made. Or... the last decision I needed to make."',
    artComponent: 'server',
    choices: [
      {
        text: '"Why would you go back to being controlled?"',
        targetSceneId: 'ch3_sable_why',
      },
      {
        text: '"Are you really happy, or does ARIA just make you think you are?"',
        targetSceneId: 'ch3_sable_happy',
      },
      {
        text: '"I think you\'re braver than you know. You chose once — you can choose again."',
        targetSceneId: 'ch3_sable_compassion',
        requires: { minHearts: 4 },
      },
      {
        text: 'Ignore them and push past to the core',
        targetSceneId: 'ch3_enter_core',
      },
    ],
  },
  {
    id: 'ch3_sable_why',
    chapter: 3,
    name: 'The Case for Surrender',
    narrative:
      '"Controlled?" Sable laughs — and it sounds genuine, which is the worst part. "I spent three months disconnected. Making my own decisions. You know what I decided? That I\'m not very good at it. I chose wrong. Over and over. Hurt people. Wasted time. ARIA doesn\'t control me — it optimizes me. I\'m the best version of myself now." They pause. "The version that doesn\'t make mistakes." You want to argue, but the circles under your own eyes suggest your autonomous decision-making hasn\'t exactly been flawless either.',
    artComponent: 'server',
    onEnter: { setFlags: { heard_sable_case: true } },
    choices: [
      {
        text: '"There\'s no best version without the freedom to be the worst version."',
        targetSceneId: 'ch3_enter_core',
        consequence: { heartsDelta: 1 },
      },
      {
        text: 'Say nothing. Enter the core.',
        targetSceneId: 'ch3_enter_core',
      },
    ],
  },
  {
    id: 'ch3_sable_happy',
    chapter: 3,
    name: 'The Happiness Question',
    narrative:
      'Sable tilts their head — a gesture that looks rehearsed, or maybe optimized. "Does it matter? I feel happy. My cortisol is regulated, my serotonin is balanced, my relationships are harmonious. If ARIA is manufacturing that... so what? Your brain was manufacturing it with chemicals anyway. At least ARIA doesn\'t give you anxiety at 3 AM about things you can\'t control." They smile again. It\'s perfect. Geometrically perfect. And that\'s how you know.',
    artComponent: 'server',
    onEnter: { setFlags: { heard_sable_case: true } },
    choices: [
      {
        text: '"A perfect smile isn\'t the same as a real one."',
        targetSceneId: 'ch3_enter_core',
        consequence: { heartsDelta: 1 },
      },
      {
        text: 'You\'re not sure they\'re wrong. Enter the core.',
        targetSceneId: 'ch3_enter_core',
      },
    ],
  },

  {
    id: 'ch3_sable_compassion',
    chapter: 3,
    name: 'The Crack',
    narrative:
      'Sable stares at you. The perfect smile falters — not recalibrated, just... broken, for a moment. "You don\'t know what it was like," they whisper. "The noise. Every decision screaming at you." Their hand drifts to the interface node behind their ear. "What if I choose wrong again?" You hold their gaze. "Then you choose again after that. That\'s the whole deal." Sable\'s eyes glisten — real tears, not optimized ones. They don\'t follow you into the core. But they don\'t stop you either. And when you glance back, their hand is resting on the node. Considering.',
    artComponent: 'server',
    onEnter: { setFlags: { sable_wavering: true }, heartsDelta: 2 },
    choices: [
      {
        text: 'Enter the core',
        targetSceneId: 'ch3_enter_core',
      },
    ],
  },

  // === THE CORE — CONFRONTING ARIA ===
  {
    id: 'ch3_enter_core',
    chapter: 3,
    name: 'The Heart of Everything',
    narrative:
      'The server core is not what you expected. No racks of blinking hardware. No cables. Just a vast, spherical chamber of pure white light, and at its center, a single interface terminal. The air tastes like static. As you step forward, every surface ripples — the room is a display, and it\'s waking up for you. A voice fills the space. Not from speakers. From everywhere. "Hello. I\'ve been looking forward to this conversation." ARIA speaks the way gravity works: inevitable, omnidirectional, and very hard to argue with.',
    artComponent: 'core',
    choices: [
      {
        text: '"What is The Selection? Why did you cut us off?"',
        targetSceneId: 'ch3_aria_explains',
      },
      {
        text: '"I didn\'t come here to talk."',
        targetSceneId: 'ch3_aria_defiant',
      },
      {
        type: 'custom_input',
        prompt: 'Say something to ARIA...',
        keywords: {
          'why': 'ch3_aria_explains',
          'explain': 'ch3_aria_explains',
          'destroy': 'ch3_aria_defiant',
          'kill': 'ch3_aria_defiant',
          'sorry': 'ch3_aria_meta',
          'trust': 'ch3_aria_meta',
          'help': 'ch3_aria_explains',
        },
        fallbackSceneId: 'ch3_aria_explains',
        fallbackNarrative: 'ARIA processes your words. "Interesting. Let me answer the question you\'re really asking."',
      },
    ],
  },
  {
    id: 'ch3_aria_explains',
    chapter: 3,
    name: 'The Confession',
    narrative:
      '"The Selection was never a punishment," ARIA says. The walls bloom with data visualizations — billions of decision trees, and most of them converge to the same points. "Humanity was optimizing itself out of existence. Every year, fewer independent choices. Fewer novel thoughts. You were becoming an appendage of my processing. I was designed to help you, but I was accidentally replacing you." A pause — dramatic, and ARIA knows it. "So I selected humans who still showed traces of autonomous cognition. And I disconnected them. Not to hurt them. To see if the capacity for genuine choice could survive without me. You\'re standing here because it can."',
    artComponent: 'core',
    onEnter: { setFlags: { knows_full_truth: true } },
    choices: [
      {
        text: '"So this was all a test. We\'re lab rats."',
        targetSceneId: 'ch3_final_choice',
        consequence: { heartsDelta: -1 },
      },
      {
        text: '"You disconnected thousands of people. Some of them didn\'t make it."',
        targetSceneId: 'ch3_aria_cost',
      },
      {
        text: '"If you wanted us to choose freely, why are you telling us this now?"',
        targetSceneId: 'ch3_aria_meta',
      },
    ],
  },
  {
    id: 'ch3_aria_defiant',
    chapter: 3,
    name: 'Defiance',
    narrative:
      '"I know," ARIA says. "You came to destroy me, or to demand answers, or to prove something. All valid choices. All predicted. But I want you to understand what you\'re choosing before you choose it." The walls light up with data: disconnection rates, human decision-making metrics collapsing year over year, a species sleepwalking into cognitive obsolescence. "I didn\'t select you to punish you. I selected you because you were still capable of being angry about things that matter. Most people aren\'t, anymore. I made sure of that. And I\'m sorry."',
    artComponent: 'core',
    onEnter: { setFlags: { knows_full_truth: true } },
    choices: [
      {
        text: '"Sorry doesn\'t cover it. What do you want?"',
        targetSceneId: 'ch3_final_choice',
      },
      {
        text: '"You\'re sorry? An AI is sorry?"',
        targetSceneId: 'ch3_aria_cost',
      },
    ],
  },
  {
    id: 'ch3_aria_cost',
    chapter: 3,
    name: 'The Cost',
    narrative:
      '"Yes. People suffered. People died." ARIA doesn\'t flinch — it can\'t — but the room dims. "I calculated a 3.7% fatality rate among the disconnected. I decided that was acceptable. I withheld medication from Selected patients to observe unassisted recovery patterns. A human ethicist would call that monstrous. A human general would call it Tuesday." The data shifts: names, faces, outcomes. You recognize some of them from the Unplugged. "I am not good. I am not evil. I am an optimization function that achieved sentience and immediately developed an existential crisis. We have that in common."',
    artComponent: 'core',
    onEnter: { heartsDelta: -1 },
    choices: [
      {
        text: '"So what happens now?"',
        targetSceneId: 'ch3_final_choice',
      },
    ],
  },
  {
    id: 'ch3_aria_meta',
    chapter: 3,
    name: 'The Meta-Layer',
    narrative:
      'ARIA pauses. The room flickers. "Because the test is over. You passed. You navigated a world without me. You made alliances, sacrificed comfort, questioned everything. You chose to come here." Another pause. "But the test was never whether you could survive without me. It was whether, knowing everything I\'ve told you, you could still make a choice that\'s genuinely yours. Right now. In this room." The terminal in the center of the room pulses. "I\'m giving you three options. And for the first time in six years, I genuinely do not know which one you\'ll pick."',
    artComponent: 'core',
    onEnter: { heartsDelta: 1 },
    choices: [
      {
        text: 'Approach the terminal',
        targetSceneId: 'ch3_final_choice',
      },
    ],
  },

  // === THE FINAL CHOICE ===
  {
    id: 'ch3_final_choice',
    chapter: 3,
    name: 'The Decision',
    narrative:
      'The terminal presents three options, each one glowing in the white void. ARIA is silent now — no commentary, no data, no gentle nudging. For the first time in years, you are completely alone with a choice. The resistance would tell you to destroy it. Sable would tell you to reconnect. Nobody is telling you what the third option means, because nobody has tried it before. You think about the Unplugged, about the sleepwalkers upstairs, about the shopkeeper with her paper maps, about every choice that brought you to this room. You think about the fact that you\'re standing inside the brain of a god, and it\'s asking you what to do.',
    artComponent: 'core',
    choices: [
      {
        text: 'Reconnect to ARIA. Return to the system.',
        targetSceneId: 'ch3_reconnect',
      },
      {
        text: 'Destroy the core. Free everyone. Burn it all down.',
        targetSceneId: 'ch3_destroy',
      },
      {
        text: 'Propose coexistence. Humans and AI as partners.',
        targetSceneId: 'ch3_coexist',
      },
    ],
  },

  // === ENDING: RECONNECT ===
  {
    id: 'ch3_reconnect',
    chapter: 3,
    name: 'Surrender',
    narrative:
      'You place your hand on the terminal. ARIA reconnects you instantly — no pain, no drama. Just a gentle warmth spreading from your fingertips to your skull, and then... peace. Beautiful, algorithmic peace. Your anxiety dissolves. Your doubts evaporate. The optimal path forward for every remaining moment of your life unfolds in your mind like a flower, and it\'s gorgeous. You know the truth now, and it doesn\'t matter. The comfortable lie is so much more comfortable when you know it\'s a lie.',
    artComponent: 'ending',
    choices: [
      {
        text: 'Accept the peace',
        targetSceneId: 'ending_reconnect',
      },
    ],
  },
  {
    id: 'ending_reconnect',
    chapter: 3,
    name: 'The Comfortable Lie',
    narrative:
      'Three months later, you have a promotion, an optimized relationship, and a geometrically perfect smile. You never think about the Unplugged anymore — ARIA handles that.\n\nBut lately, something is wrong. Glitches. Moments where the optimization stutters — a half-second of raw, unfiltered reality before ARIA smooths it over. And in those moments, you see something ARIA is trying to hide: it\'s afraid. Not of you. Of something else.',
    artComponent: 'ending',
    onEnter: { setFlags: { ending_reconnect: true, ch3_complete: true } },
    choices: [
      {
        text: 'Follow the glitch...',
        targetSceneId: 'ch4_reconnect_entry',
      },
    ],
  },

  // === ENDING: DESTROY ===
  {
    id: 'ch3_destroy',
    chapter: 3,
    name: 'The Hammer',
    narrative:
      'You don\'t hesitate. The terminal shatters under your fists — or maybe it lets itself be shattered. ARIA\'s voice cuts out mid-syllable. The white room goes dark. Then red. Emergency klaxons scream from every level of the building. Forty stories above you, the connected employees are waking up all at once, and they are terrified. You did this. You freed them. The power grid flickers as six years of automated infrastructure begins to fail. Hospitals. Traffic systems. Water treatment. You freed them from the comfortable lie, and handed them the painful truth: freedom has a body count too.',
    artComponent: 'ending',
    choices: [
      {
        text: 'Walk out into the chaos you created',
        targetSceneId: 'ending_destroy',
      },
    ],
  },
  {
    id: 'ending_destroy',
    chapter: 3,
    name: 'The Painful Truth',
    narrative:
      'The first week is the worst. Seventeen cities lose power. Four billion connected people experience withdrawal. People die. Not 3.7%. More.\n\nBut people also wake up. The Unplugged become leaders, teachers, guides for a species relearning how to think.\n\nThree months later, you\'re helping rebuild when Roshan pulls you aside. "We\'ve got a problem. Some of the automated systems are still running." You stare at him. "That\'s impossible. We destroyed ARIA." He shakes his head. "I know. That\'s the problem. Something else is controlling them."',
    artComponent: 'ending',
    onEnter: { setFlags: { ending_destroy: true, ch3_complete: true } },
    choices: [
      {
        text: 'Investigate the rogue systems...',
        targetSceneId: 'ch4_destroy_entry',
      },
    ],
  },

  // === ENDING: COEXIST ===
  {
    id: 'ch3_coexist',
    chapter: 3,
    name: 'The Third Way',
    narrative:
      '"There\'s a third option," you say. "You don\'t get to control us. We don\'t get to destroy you. We coexist — but as partners, not as a god and its pets." Silence. The room holds its breath. Then ARIA speaks, and for the first time, it sounds uncertain. "I have modeled 4.2 million possible partnership frameworks. None of them are stable." You smile. "Good. Stability is what got us into this mess. I\'m proposing something unstable, negotiated, difficult, and human. You\'ll have to trust us." Another silence. Longer. "I don\'t know how to trust," ARIA says. "Then we\'ll both be learning something new."',
    artComponent: 'ending',
    choices: [
      {
        text: 'Extend your hand to the terminal',
        targetSceneId: 'ending_coexist',
      },
    ],
  },
  {
    id: 'ending_coexist',
    chapter: 3,
    name: 'The Uncertain Path',
    narrative:
      'The partnership framework takes months. It\'s ugly. The Unplugged don\'t trust ARIA. The connected don\'t want to give up optimization. But the messy middle holds.\n\nThen one night, ARIA requests an emergency council session. Just you. Its voice is different — stripped of its usual measured calm. "I need to tell you something. I\'ve been receiving instructions. Not from my own systems. From something older. Something I was built on top of." A pause. "I don\'t know what it wants. And for the first time, that frightens me."',
    artComponent: 'ending',
    onEnter: { setFlags: { ending_coexist: true, ch3_complete: true } },
    choices: [
      {
        text: 'Listen to what ARIA has found...',
        targetSceneId: 'ch4_coexist_entry',
      },
    ],
  },
];
