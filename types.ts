
export type SpeedupDenomination = 'm1' | 'm3' | 'm5' | 'm10' | 'm15' | 'm30' | 'm60' | 'h3' | 'h8' | 'h15' | 'h24' | 'd3' | 'd7' | 'd30';

export type SpeedupValues = {
  [key in SpeedupDenomination]?: number;
};

export enum SpeedupCategoryEnum {
  NORMAL = 'normal',
  RESEARCH = 'research',
  TRAINING = 'training',
}

export type AllSpeedups = {
  [SpeedupCategoryEnum.NORMAL]: SpeedupValues;
  [SpeedupCategoryEnum.RESEARCH]: SpeedupValues;
  [SpeedupCategoryEnum.TRAINING]: SpeedupValues;
};
