import type { ItemDefinition } from '../types/items';

export const ITEMS: Record<string, ItemDefinition> = {
  burner_phone: {
    id: 'burner_phone',
    name: 'Burner Phone',
    description: 'An old pre-AI phone. No tracking, no assistant.',
    icon: 'phone',
  },
  circuit_tool: {
    id: 'circuit_tool',
    name: 'Circuit Tool',
    description: 'A multitool for bypassing electronic locks.',
    icon: 'tool',
  },
  analog_map: {
    id: 'analog_map',
    name: 'Analog Map',
    description: 'Paper city map. No GPS needed.',
    icon: 'map',
  },
  fake_id: {
    id: 'fake_id',
    name: 'Fake ID',
    description: 'A convincing identity chip. Borrowed, not stolen.',
    icon: 'id',
  },
  med_patch: {
    id: 'med_patch',
    name: 'Med Patch',
    description: 'Adhesive medical patch. Heals minor injuries.',
    icon: 'med',
  },
  emp_device: {
    id: 'emp_device',
    name: 'EMP Device',
    description: 'Single-use electromagnetic pulse. Disables nearby electronics.',
    icon: 'emp',
  },
  old_cash: {
    id: 'old_cash',
    name: 'Old Cash',
    description: 'Physical currency. Most places stopped accepting it years ago.',
    icon: 'cash',
  },
  resistance_badge: {
    id: 'resistance_badge',
    name: 'Resistance Badge',
    description: 'Marks you as one of the Unplugged. Opens doors — and closes others.',
    icon: 'badge',
  },
};
