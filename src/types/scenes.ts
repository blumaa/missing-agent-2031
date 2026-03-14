export interface ChoiceRequirement {
  items?: string[];
  flags?: Record<string, boolean>;
  minHearts?: number;
}

export interface ChoiceConsequence {
  addItems?: string[];
  removeItems?: string[];
  heartsDelta?: number;
  setFlags?: Record<string, boolean>;
  narrative?: string;
}

export interface SceneChoice {
  text: string;
  targetSceneId: string;
  requires?: ChoiceRequirement;
  consequence?: ChoiceConsequence;
}

export interface CustomInputChoice {
  type: 'custom_input';
  prompt: string;
  keywords: Record<string, string>;
  fallbackSceneId: string;
  fallbackNarrative: string;
}

export interface Scene {
  id: string;
  chapter: number;
  name: string;
  narrative: string;
  artComponent: string;
  choices: (SceneChoice | CustomInputChoice)[];
  onEnter?: ChoiceConsequence;
}
