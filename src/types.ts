/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface UserInfo {
  name: string;
  partnerName: string;
}

export interface FetusInfo {
  dream: string;
  nickname: string;
  week: number;
  gender: 'male' | 'female' | 'unknown';
  characterDescription?: string;
  backgroundDescription?: string;
  characterImageUrl?: string;
  backgroundImageUrl?: string;
}

export interface DiaryEntry {
  id: string;
  date: string;
  content: string;
  imageUrl?: string;
  babyComment?: string;
  babyQuestion?: string;
}

export interface SharedQuestion {
  id: string;
  question: string;
  momAnswer?: string;
  dadAnswer?: string;
}

export interface DecorationItem {
  id: string;
  name: string;
  imageUrl: string;
  type: 'character_accessory' | 'background_item';
  position?: { x: number; y: number };
}

export interface Notification {
  id: string;
  type: 'walking' | 'diary' | 'question' | 'growth';
  message: string;
  timestamp: string;
}

export interface AppState {
  onboarded: boolean;
  user: UserInfo;
  fetus: FetusInfo;
  diaryEntries: DiaryEntry[];
  sharedQuestions: SharedQuestion[];
  happinessIndex: number;
  ownedDecorations: DecorationItem[];
  placedDecorations: DecorationItem[];
  notifications: Notification[];
}
