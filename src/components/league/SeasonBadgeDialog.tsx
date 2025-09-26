import * as React from 'react';
import {Dialog, DialogContent, DialogDescription, DialogTitle, DialogClose, Image} from '../../ui';
import {League, Season} from "../../types";


export interface SeasonBadgeDialogProps {
    league: League | null;
    seasonBadge: Season | null;
    loading: boolean;
    onClose: () => void;
}

export default function SeasonBadgeDialog({league, seasonBadge, loading, onClose}: SeasonBadgeDialogProps) {
    return (
        <Dialog open={!!league} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogTitle>{league?.strLeague} Season</DialogTitle>
                <DialogDescription>
                    {league?.strSport}
                </DialogDescription>
                <DialogClose
                    className="absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none">
                    <span className="sr-only">Close</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="size-4" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </DialogClose>
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
                                    <Image
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
                        </div>
                    ) : null}
                </div>
            </DialogContent>
        </Dialog>
    );
}