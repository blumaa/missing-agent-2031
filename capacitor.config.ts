import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.blumaa.missingagent2031',
  appName: 'Missing Agent 2031',
  webDir: 'dist',
  ios: {
    preferredContentMode: 'mobile',
    allowsLinkPreview: false,
  },
  server: {
    iosScheme: 'capacitor',
  },
  plugins: {
    SplashScreen: {
      launchAutoHide: false,
      backgroundColor: '#0a0a14',
      showSpinner: false,
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#0a0a14',
    },
  },
};

export default config;
