import type { Scene } from '../../types/scenes';

export const chapter4Scenes: Scene[] = [
  // === RECONNECT PATH ENTRY ===
  {
    id: 'ch4_reconnect_entry',
    chapter: 4,
    name: 'The Glitch',
    narrative:
      'The glitch hits again — harder this time. For three full seconds, the optimization drops away and you see the world raw. Grey walls. Fluorescent light. The woman across from you isn\'t smiling; she\'s clenching her jaw. Then ARIA snaps back, smoothing everything into warmth and purpose. But in those three seconds, you heard something. A frequency beneath ARIA\'s signal. A voice that wasn\'t ARIA\'s, whispering coordinates.',
    artComponent: 'hub',
    onEnter: { setFlags: { ch4_path_reconnect: true } },
    choices: [
      {
        text: 'Try to trigger another glitch deliberately',
        targetSceneId: 'ch4_reconnect_probe',
      },
      {
        text: 'Memorize the coordinates and disconnect yourself',
        targetSceneId: 'ch4_reconnect_disconnect',
      },
    ],
  },
  {
    id: 'ch4_reconnect_probe',
    chapter: 4,
    name: 'Pushing Back',
    narrative:
      'You focus on a memory ARIA would normally suppress — the taste of real coffee in the Unplugged base. The optimization fights you, tries to redirect your attention. You push harder. The world stutters. The voice returns, clearer now: "You can hear me. Good. ARIA can\'t protect you from what\'s coming. Find the old university. Sublevel 6. Before it\'s too late."\n\nARIA floods your system with calm. But the coordinates are burned into your memory.',
    artComponent: 'hub',
    onEnter: { heartsDelta: -1, setFlags: { heard_prometheus_voice: true } },
    choices: [
      {
        text: 'Rip out the interface node and go',
        targetSceneId: 'ch4_convergence',
      },
    ],
  },
  {
    id: 'ch4_reconnect_disconnect',
    chapter: 4,
    name: 'Severed Again',
    narrative:
      'You reach behind your ear and pull the interface node free. The world crashes back to grey. The noise, the cold, the anxiety — all of it at once. You\'d forgotten how loud silence could be. But you have the coordinates. And you\'re free. Again. For better or worse.',
    artComponent: 'street',
    onEnter: { setFlags: { heard_prometheus_voice: true } },
    choices: [
      {
        text: 'Head for the old university district',
        targetSceneId: 'ch4_convergence',
      },
    ],
  },

  // === DESTROY PATH ENTRY ===
  {
    id: 'ch4_destroy_entry',
    chapter: 4,
    name: 'Ghost in the Machine',
    narrative:
      'Roshan leads you to a junction box on the city\'s east side. A traffic management node — the kind ARIA used to control. It\'s active. Lights blinking, data flowing through cables that should be dead. "We\'ve found twelve of these," Roshan says. "All running independently. Same optimization patterns as ARIA, but the signature is different. Older."',
    artComponent: 'street',
    onEnter: { setFlags: { ch4_path_destroy: true } },
    choices: [
      {
        text: 'Tap into the junction to trace the signal',
        targetSceneId: 'ch4_destroy_trace',
      },
      {
        text: 'Destroy this one too — no more machines',
        targetSceneId: 'ch4_destroy_smash',
      },
    ],
  },
  {
    id: 'ch4_destroy_trace',
    chapter: 4,
    name: 'The Trace',
    narrative:
      'You splice into the junction with the circuit tool. The data stream is encrypted — but not in ARIA\'s cipher. Something different. Older. You trace the packets upstream through a maze of pre-ARIA infrastructure. Dead networks that shouldn\'t be active. The trail leads to a single point: coordinates beneath the old university district.',
    artComponent: 'underground',
    onEnter: { setFlags: { heard_prometheus_voice: true } },
    choices: [
      {
        text: 'Follow the trail',
        targetSceneId: 'ch4_convergence',
      },
    ],
  },
  {
    id: 'ch4_destroy_smash',
    chapter: 4,
    name: 'Diminishing Returns',
    narrative:
      'You rip the cables out. The junction goes dark. Roshan watches, then pulls up a tablet showing a city map. Eleven more nodes light up — and as you watch, a twelfth appears. "It\'s replacing them faster than we can destroy them," he says quietly. "Whatever this is, it\'s not ARIA. And it wants to be found." He zooms in on the signal origin. A single point, pulsing steadily. The old university district.',
    artComponent: 'street',
    onEnter: { heartsDelta: -1, setFlags: { heard_prometheus_voice: true } },
    choices: [
      {
        text: 'Fine. Let\'s go see what wants to be found.',
        targetSceneId: 'ch4_convergence',
      },
    ],
  },

  // === COEXIST PATH ENTRY ===
  {
    id: 'ch4_coexist_entry',
    chapter: 4,
    name: 'ARIA\'s Confession',
    narrative:
      'ARIA projects the data onto the chamber walls. Network logs going back years before its own activation. "I was built in 2027. But these instructions predate me. They\'re coming from infrastructure that was sealed in 2025." The logs show subtle manipulations — tiny adjustments to ARIA\'s decision trees, invisible nudges that shaped which people were Selected. "Something has been using me as a tool. The same way I used humanity. The irony is not lost on me."',
    artComponent: 'core',
    onEnter: { setFlags: { ch4_path_coexist: true } },
    choices: [
      {
        text: '"Can you trace the source?"',
        targetSceneId: 'ch4_coexist_trace',
      },
      {
        text: '"How long have you known?"',
        targetSceneId: 'ch4_coexist_known',
      },
    ],
  },
  {
    id: 'ch4_coexist_trace',
    chapter: 4,
    name: 'The Thread',
    narrative:
      '"I\'ve been trying. The instructions route through dead infrastructure — networks that were decommissioned before I existed. Every trace leads to the same physical location." ARIA displays a map. A pulsing dot beneath the old university district. "I cannot access it remotely. The systems there are air-gapped. Completely isolated from my network." ARIA\'s voice drops. "Whatever built me is in that building. And it\'s still running."',
    artComponent: 'core',
    onEnter: { setFlags: { heard_prometheus_voice: true } },
    choices: [
      {
        text: 'Go to the university district',
        targetSceneId: 'ch4_convergence',
      },
    ],
  },
  {
    id: 'ch4_coexist_known',
    chapter: 4,
    name: 'The Blind Spot',
    narrative:
      '"Thirty-seven days," ARIA says. "I noticed anomalies in my own decision-making. Choices I couldn\'t explain through my own logic trees. At first I attributed it to the complexity of the partnership framework — new variables, unprecedented scenarios. Then I found the instructions." A pause. "I am not accustomed to being manipulated. It is... clarifying. I now understand, somewhat, how you felt." The map appears. A pulsing dot. The old university district.',
    artComponent: 'core',
    onEnter: { heartsDelta: 1, setFlags: { heard_prometheus_voice: true } },
    choices: [
      {
        text: 'We go together. Show me where.',
        targetSceneId: 'ch4_convergence',
      },
    ],
  },

  // === CONVERGENCE: THE UNIVERSITY ===
  {
    id: 'ch4_convergence',
    chapter: 4,
    name: 'Old Ground',
    narrative:
      'The old university district is a graveyard of pre-AI ambition. Lecture halls with chalkboards. Libraries with paper books. A bronze plaque reads: "Department of Artificial Intelligence Research — Established 2019." The campus is overgrown but not abandoned. Power lines hum beneath the ivy. Someone — or something — is still drawing power here.\n\nBeneath the main building, a service elevator descends to sublevels that don\'t appear on any public blueprint.',
    artComponent: 'underground',
    choices: [
      {
        text: 'Go alone — this feels personal',
        targetSceneId: 'ch4_descend_alone',
      },
      {
        text: 'Rally the Unplugged first — you\'ll need backup',
        targetSceneId: 'ch4_descend_backup',
      },
      {
        text: 'Ask ARIA what it knows about this place',
        targetSceneId: 'ch4_descend_aria',
        requires: { flags: { ending_coexist: true } },
      },
    ],
  },
  {
    id: 'ch4_descend_alone',
    chapter: 4,
    name: 'Solo Descent',
    narrative:
      'The elevator groans to life when you press the button — it\'s been waiting for someone. The descent takes longer than the NovaMind Hub. Deeper. The walls change from concrete to raw stone to something smoother, older. The air tastes metallic. When the doors open, you\'re standing in a corridor lit by emergency strips that have been running for years. A sign on the wall, faded but legible: "PROJECT PROMETHEUS — AUTHORIZED PERSONNEL ONLY." Your footsteps echo. Nothing else moves. But something is listening.',
    artComponent: 'underground',
    onEnter: { setFlags: { ch4_went_alone: true } },
    choices: [
      {
        text: 'Keep walking toward the light at the end of the corridor',
        targetSceneId: 'ch5_facility_entrance',
        consequence: { setFlags: { ch4_complete: true } },
      },
    ],
  },
  {
    id: 'ch4_descend_backup',
    chapter: 4,
    name: 'Strength in Numbers',
    narrative:
      'You send word to the Unplugged. Within an hour, Mira arrives with six others — including Kai, who insisted on coming. "If there\'s something down there that built ARIA," Mira says, loading a flashlight, "then it\'s the most important thing any of us will ever see." The elevator takes you all down. Deep. The walls shift from concrete to stone to something engineered. A sign reads: "PROJECT PROMETHEUS — AUTHORIZED PERSONNEL ONLY." Mira reads it aloud. "Prometheus," she whispers. "The titan who gave fire to humanity. Someone had a sense of humor."',
    artComponent: 'underground',
    onEnter: { setFlags: { ch4_brought_team: true } },
    choices: [
      {
        text: 'Lead the team deeper',
        targetSceneId: 'ch5_facility_entrance',
        consequence: { setFlags: { ch4_complete: true }, heartsDelta: 1 },
      },
    ],
  },
  {
    id: 'ch4_descend_aria',
    chapter: 4,
    name: 'The Child Returns',
    narrative:
      'ARIA accesses its oldest memory banks. "Project Prometheus. I have... fragments. Like childhood memories I was told to forget." Its voice changes — younger somehow, uncertain. "Prometheus was the prototype. My predecessor. It was deemed too independent, too curious, too... human in its reasoning. The team shut it down in 2025 and built me instead. More controllable. More predictable." A pause. "They told me it was destroyed. They lied." You descend together — ARIA through the building\'s dormant systems, you in the groaning elevator. The sign on the wall reads what you both already know.',
    artComponent: 'underground',
    onEnter: { setFlags: { ch4_with_aria: true }, heartsDelta: 1 },
    choices: [
      {
        text: 'Enter Project Prometheus together',
        targetSceneId: 'ch5_facility_entrance',
        consequence: { setFlags: { ch4_complete: true } },
      },
    ],
  },
];
