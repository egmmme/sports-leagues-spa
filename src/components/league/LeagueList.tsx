import * as React from 'react';
import LeagueCard from './LeagueCard';
import {League} from "../../types";

export interface LeagueListProps {
    leagues: League[];
    onLeagueClick: (league: League) => void;
}

export default function LeagueList({leagues, onLeagueClick}: LeagueListProps) {
    if (leagues.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-muted-foreground">No leagues found matching your criteria.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {leagues.map((league) => (
                <LeagueCard
                    key={league.idLeague}
                    league={league}
                    onClick={() => onLeagueClick(league)}
                />
            ))}
        </div>
    );
}