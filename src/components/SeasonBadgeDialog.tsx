import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface League {
  idLeague: string;
  strLeague: string;
  strSport: string;
  strLeagueAlternate: string;
}

interface SeasonBadge {
  strBadge: string;
  strSeason: string;
}

interface SeasonBadgeDialogProps {
  league: League | null;
  seasonBadge: SeasonBadge | null;
  loading: boolean;
  onClose: () => void;
}

export function SeasonBadgeDialog({ league, seasonBadge, loading, onClose }: SeasonBadgeDialogProps) {
  return (
    <Dialog open={!!league} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{league?.strLeague} Season Badge</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center space-y-4 py-4">
          {loading ? (
            <div className="flex flex-col items-center space-y-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="text-sm text-muted-foreground">Loading season badge...</p>
            </div>
          ) : seasonBadge ? (
            <div className="flex flex-col items-center space-y-4">
              {seasonBadge.strBadge ? (
                <div className="relative">
                  <ImageWithFallback
                    src={seasonBadge.strBadge}
                    alt={`${league?.strLeague} season badge`}
                    className="max-w-full h-auto max-h-64 rounded-lg shadow-md"
                  />
                </div>
              ) : (
                <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-sm text-muted-foreground text-center">No badge available</p>
                </div>
              )}
              
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Season:</p>
                <p>{seasonBadge.strSeason || 'Unknown'}</p>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-muted-foreground">League:</p>
                <p>{league?.strLeague}</p>
                <p className="text-sm text-muted-foreground">{league?.strSport}</p>
              </div>
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}