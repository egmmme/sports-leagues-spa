import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

interface League {
  idLeague: string;
  strLeague: string;
  strSport: string;
  strLeagueAlternate: string;
}

interface LeagueCardProps {
  league: League;
  onClick: () => void;
}

export function LeagueCard({ league, onClick }: LeagueCardProps) {
  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-shadow duration-200 hover:bg-accent/50"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <CardTitle className="line-clamp-2 min-h-[3rem]">
          {league.strLeague}
        </CardTitle>
        <Badge variant="secondary" className="w-fit">
          {league.strSport}
        </Badge>
      </CardHeader>
      <CardContent>
        {league.strLeagueAlternate && (
          <div>
            <p className="text-sm text-muted-foreground mb-1">Alternate Name:</p>
            <p className="text-sm">{league.strLeagueAlternate}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}