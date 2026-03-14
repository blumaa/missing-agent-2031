import { Capacitor } from '@capacitor/core';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';

const isNative = Capacitor.isNativePlatform();

function noop() {}

export const haptics = {
  choiceSelect: isNative
    ? () => Haptics.impact({ style: ImpactStyle.Light })
    : noop,
  sceneTransition: isNative
    ? () => Haptics.impact({ style: ImpactStyle.Medium })
    : noop,
  damage: isNative
    ? () => Haptics.impact({ style: ImpactStyle.Heavy })
    : noop,
  collapse: isNative
    ? () => Haptics.notification({ type: NotificationType.Error })
    : noop,
  itemPickup: isNative
    ? () => Haptics.notification({ type: NotificationType.Success })
    : noop,
};
