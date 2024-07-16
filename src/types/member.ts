export interface MemberInfo {
  memberId?: string | null;
  email?: string | null;
  nickname: string;
  profileImagePath?: string | null;
  money: Money;
  socialInfo: SocialInfo;
  settings: Settings;
  position: MemberPosition;
  status: MemberStatus;
  grade: Grade;
}

export enum MemberStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  SUSPENSE = "SUSPENSE",
}

export enum Tier {
  BRONZE = "BRONZE",
  SILVER = "SILVER",
  GOLD = "GOLD",
  PLATINUM = "PLATINUM",
  DIAMOND = "DIAMOND",
  RUBY = "RUBY",
}

export enum MemberPosition {
  NONE = "NONE",
  DEVELOPER = "DEVELOPER",
}

export interface Money {
  value: number;
}

export interface SocialInfo {
  socialId: string;
  socialType: string;
}

export interface Grade {
  point: number;
  tier: Tier;
}

export interface Settings {
  chatPeePoint: number;
  chatRefusal: boolean;
}
