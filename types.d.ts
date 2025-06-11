// types.d.ts
declare module "react-native-datawedge";
declare module "react-native-datawedge-intents" {
  interface BroadcastReceiverConfig {
    filterActions: string[];
    filterCategories: string[];
  }

  interface BroadcastWithExtras {
    action: string;
    extras: Record<string, any>;
  }

  export default class DataWedgeIntents {
    static registerBroadcastReceiver(config: BroadcastReceiverConfig): void;
    static sendBroadcastWithExtras(config: BroadcastWithExtras): void;
  }
} 