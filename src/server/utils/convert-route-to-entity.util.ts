const mapping: Record<string, string> = {
  'business-owners': 'business_owner',
  games: 'game',
  participations: 'participation',
  players: 'player',
  'team-members': 'team_member',
  users: 'user',
  wins: 'win',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
