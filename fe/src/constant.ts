/**
 * 常量文件
 */
// 游戏状态
export const GameStatus = {
  Ready: 0,
  Playing: 1,
  Pause: 2,
  Over: 3,
} as const;
export type GameStatusType = (typeof GameStatus)[keyof typeof GameStatus];
