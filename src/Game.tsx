import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { VIEWBOX, PALETTE, computeLayout } from './utils/constants';
import { useGameState } from './hooks/useGameState';
import { useViewBoxHeight } from './hooks/useViewBox';
import { useSceneTransition } from './hooks/useSceneTransition';
import { useSaveGame } from './hooks/useSaveGame';
import { loadGame, clearSave } from './utils/saveSystem';
import { getSceneById } from './data/scenes/index';
import { getAvailableChoices } from './utils/storyEngine';
import { haptics } from './hooks/useHaptics';
import { sfx } from './hooks/useSoundEffects';
import type { SceneChoice, CustomInputChoice } from './types/scenes';
import { CollapseScreen } from './components/screens/CollapseScreen';

import { TitleScreen } from './components/screens/TitleScreen';
import { SettingsOverlay } from './components/screens/SettingsOverlay';
import { HUD } from './components/hud/HUD';
import { SceneArt } from './components/scene/SceneArt';
import { NarrativeBox } from './components/narrative/NarrativeBox';
import { ChoiceButtons } from './components/narrative/ChoiceButtons';
import { CustomInput } from './components/narrative/CustomInput';
import { InventoryOverlay } from './components/overlays/InventoryOverlay';
import { EndingScreen } from './components/screens/EndingScreen';

type Overlay = 'none' | 'inventory' | 'settings';

export function Game() {
  const viewBoxHeight = useViewBoxHeight();
  const layout = useMemo(() => computeLayout(viewBoxHeight), [viewBoxHeight]);
  const {
    state,
    startGame,
    continueGame,
    navigateScene,
    addItem,
    removeItem,
    changeHearts,
    setFlag,
    setChapter,
    tickPlaytime,
    pauseGame,
    resumeGame,
    resetGame,
  } = useGameState();

  useSaveGame(state);

  // Playtime timer — tick every second while playing
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    if (state.status === 'playing') {
      tickRef.current = setInterval(() => tickPlaytime(1), 1000);
    }
    return () => {
      if (tickRef.current) clearInterval(tickRef.current);
    };
  }, [state.status, tickPlaytime]);

  const { containerRef, transitionOut, transitionIn } = useSceneTransition();
  const [overlay, setOverlay] = useState<Overlay>('none');
  const [showChoices, setShowChoices] = useState(false);
  const [customInputChoice, setCustomInputChoice] = useState<CustomInputChoice | null>(null);
  const [consequenceNarrative, setConsequenceNarrative] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState(false);

  // Only check for save on title screen to avoid parsing localStorage every render
  const hasSave = state.status === 'idle' ? loadGame() !== null : false;
  const scene = getSceneById(state.currentSceneId);

  // Track latest hearts in a ref for stale-closure-safe collapse detection
  const heartsRef = useRef(state.hearts);
  useEffect(() => {
    heartsRef.current = state.hearts;
  }, [state.hearts]);

  useEffect(() => {
    if (state.status !== 'playing' || !scene) return;

    // Auto-update chapter from scene data
    if (scene.chapter !== state.currentChapter) {
      setChapter(scene.chapter);
    }

    if (!scene.onEnter) return;
    const c = scene.onEnter;
    if (c.addItems) c.addItems.forEach(item => addItem(item));
    if (c.removeItems) c.removeItems.forEach(item => removeItem(item));
    if (c.heartsDelta) changeHearts(c.heartsDelta);
    if (c.setFlags) Object.entries(c.setFlags).forEach(([k, v]) => setFlag(k, v));
  }, [state.currentSceneId, state.status, state.currentChapter, scene, setChapter, addItem, removeItem, changeHearts, setFlag]);

  const handleNewGame = useCallback(() => {
    clearSave();
    startGame();
    setShowChoices(false);
    setConsequenceNarrative(null);
  }, [startGame]);

  const handleContinue = useCallback(() => {
    const saved = loadGame();
    if (saved) {
      continueGame(saved);
      setShowChoices(true);
    }
  }, [continueGame]);

  const handleNarrativeTap = useCallback(() => {
    setShowChoices(true);
  }, []);

  const handleChoiceSelect = useCallback(async (choice: SceneChoice) => {
    sfx.choiceSelect();
    haptics.choiceSelect();

    if (choice.consequence) {
      if (choice.consequence.addItems) choice.consequence.addItems.forEach(item => addItem(item));
      if (choice.consequence.removeItems) choice.consequence.removeItems.forEach(item => removeItem(item));
      if (choice.consequence.heartsDelta) changeHearts(choice.consequence.heartsDelta);
      if (choice.consequence.setFlags) Object.entries(choice.consequence.setFlags).forEach(([k, v]) => setFlag(k, v));

      if (choice.consequence.narrative) {
        setConsequenceNarrative(choice.consequence.narrative);
      }

      if (choice.consequence.heartsDelta && choice.consequence.heartsDelta < 0) {
        sfx.damage();
        haptics.damage();

        // Use ref for fresh hearts value to avoid stale closure
        const currentHearts = heartsRef.current;
        const newHearts = Math.max(0, currentHearts + choice.consequence.heartsDelta);
        if (newHearts <= 0) {
          sfx.collapse();
          haptics.collapse();
          setCollapsed(true);
          return;
        }
      }
      if (choice.consequence.addItems?.length) {
        sfx.itemPickup();
        haptics.itemPickup();
      }
    }

    sfx.sceneTransition();
    haptics.sceneTransition();
    await transitionOut();
    navigateScene(choice.targetSceneId);
    setShowChoices(false);
    setCustomInputChoice(null);
    setConsequenceNarrative(null);
    transitionIn();
  }, [addItem, removeItem, changeHearts, setFlag, navigateScene, transitionOut, transitionIn]);

  const handleCustomInput = useCallback((choice: CustomInputChoice) => {
    setCustomInputChoice(choice);
  }, []);

  const handleCustomInputResult = useCallback(async (sceneId: string, narrative?: string) => {
    sfx.choiceSelect();
    if (narrative) setConsequenceNarrative(narrative);
    await transitionOut();
    navigateScene(sceneId);
    setShowChoices(false);
    setCustomInputChoice(null);
    transitionIn();
  }, [navigateScene, transitionOut, transitionIn]);

  const handleCustomInputCancel = useCallback(() => {
    setCustomInputChoice(null);
  }, []);

  const handleMainMenu = useCallback(() => {
    resetGame();
    setOverlay('none');
    setShowChoices(false);
    setConsequenceNarrative(null);
  }, [resetGame]);

  const handleMenuOpen = useCallback(() => {
    pauseGame();
    setOverlay('settings');
  }, [pauseGame]);

  const handleMenuClose = useCallback(() => {
    resumeGame();
    setOverlay('none');
  }, [resumeGame]);

  const handleCollapseRecover = useCallback(() => {
    changeHearts(Math.ceil(state.maxHearts / 2) - state.hearts);
    setCollapsed(false);
    setShowChoices(true);
  }, [changeHearts, state.maxHearts, state.hearts]);

  const handleInventoryOpen = useCallback(() => setOverlay('inventory'), []);
  const handleOverlayClose = useCallback(() => setOverlay('none'), []);

  // Detect ending type from flags
  const isGameComplete = state.narrativeFlags.game_complete === true;
  const endingType: 'reconnect' | 'destroy' | 'coexist' | 'unknown' =
    state.narrativeFlags.ending_reconnect ? 'reconnect' :
    state.narrativeFlags.ending_destroy ? 'destroy' :
    state.narrativeFlags.ending_coexist ? 'coexist' : 'unknown';

  if (state.status === 'idle') {
    return (
      <svg
        viewBox={`0 0 ${VIEWBOX.width} ${viewBoxHeight}`}
        style={{ width: '100%', height: '100%', display: 'block', backgroundColor: PALETTE.bgDarkest }}
      >
        <TitleScreen hasSave={hasSave} onNewGame={handleNewGame} onContinue={handleContinue} viewBoxHeight={viewBoxHeight} />
      </svg>
    );
  }

  // Show collapse screen when hearts reach 0
  if (collapsed) {
    return (
      <svg
        viewBox={`0 0 ${VIEWBOX.width} ${viewBoxHeight}`}
        style={{ width: '100%', height: '100%', display: 'block', backgroundColor: PALETTE.bgDarkest }}
      >
        <CollapseScreen viewBoxHeight={viewBoxHeight} onRecover={handleCollapseRecover} />
      </svg>
    );
  }

  // Show error if scene not found
  if (!scene) {
    return (
      <svg
        viewBox={`0 0 ${VIEWBOX.width} ${viewBoxHeight}`}
        style={{ width: '100%', height: '100%', display: 'block', backgroundColor: PALETTE.bgDarkest }}
      >
        <text x={VIEWBOX.width / 2} y={viewBoxHeight / 2 - 20} fill={PALETTE.accentMagenta}
          fontSize={12} fontFamily="'Press Start 2P', monospace" textAnchor="middle">
          SCENE NOT FOUND
        </text>
        <text x={VIEWBOX.width / 2} y={viewBoxHeight / 2 + 20} fill={PALETTE.textSecondary}
          fontSize={13} fontFamily="'Share Tech Mono', monospace" textAnchor="middle">
          ID: {state.currentSceneId}
        </text>
        <g onClick={handleMainMenu} style={{ cursor: 'pointer' }}>
          <rect x={VIEWBOX.width / 2 - 80} y={viewBoxHeight / 2 + 50} width={160} height={44} rx={6}
            fill={PALETTE.buttonBg} stroke={PALETTE.accentCyan} strokeWidth={1.5} />
          <text x={VIEWBOX.width / 2} y={viewBoxHeight / 2 + 78} fill={PALETTE.accentCyan}
            fontSize={12} fontFamily="'Press Start 2P', monospace" textAnchor="middle">
            MAIN MENU
          </text>
        </g>
      </svg>
    );
  }

  // Show ending screen when game is complete and scene has no choices
  if (isGameComplete && scene.choices.length === 0) {
    return (
      <svg
        viewBox={`0 0 ${VIEWBOX.width} ${viewBoxHeight}`}
        style={{ width: '100%', height: '100%', display: 'block', backgroundColor: PALETTE.bgDarkest }}
      >
        <EndingScreen
          endingType={endingType}
          sceneName={scene.name}
          narrative={scene.narrative}
          playtimeSeconds={state.playtimeSeconds}
          viewBoxHeight={viewBoxHeight}
          onMainMenu={handleMainMenu}
        />
      </svg>
    );
  }

  const narrativeText = consequenceNarrative || scene?.narrative || '';
  const choices = scene ? getAvailableChoices(scene.choices, state) : [];

  return (
    <svg
      viewBox={`0 0 ${VIEWBOX.width} ${viewBoxHeight}`}
      style={{ width: '100%', height: '100%', display: 'block', backgroundColor: PALETTE.bgDarkest }}
    >
      <g ref={containerRef}>
        {scene && <SceneArt artComponent={scene.artComponent} layout={layout} />}

        <NarrativeBox text={narrativeText} onTap={handleNarrativeTap} layout={layout} />

        {showChoices && !customInputChoice && (
          <ChoiceButtons
            choices={choices}
            onChoiceSelect={handleChoiceSelect}
            onCustomInput={handleCustomInput}
            layout={layout}
          />
        )}

        {customInputChoice && (
          <CustomInput
            choice={customInputChoice}
            onResult={handleCustomInputResult}
            onCancel={handleCustomInputCancel}
            layout={layout}
          />
        )}
      </g>

      <HUD
        chapter={state.currentChapter}
        hearts={state.hearts}
        maxHearts={state.maxHearts}
        inventoryCount={state.inventory.length}
        onInventoryOpen={handleInventoryOpen}
        onMenuOpen={handleMenuOpen}
      />

      {overlay === 'inventory' && (
        <InventoryOverlay
          inventory={state.inventory}
          onClose={handleOverlayClose}
          viewBoxHeight={viewBoxHeight}
        />
      )}
      {overlay === 'settings' && (
        <SettingsOverlay
          onClose={handleMenuClose}
          onMainMenu={handleMainMenu}
          viewBoxHeight={viewBoxHeight}
        />
      )}
    </svg>
  );
}
