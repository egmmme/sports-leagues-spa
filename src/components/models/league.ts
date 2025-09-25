// League model and props
export interface League {
    idLeague: string;
    strLeague: string;
    strSport: string;
    strLeagueAlternate: string;
}

export interface LeagueCardProps {
    league: League;
    onClick: () => void;
}

export interface LeagueListProps {
    leagues: League[];
    onLeagueClick: (league: League) => void;
}
