import {League} from "../../types";

export interface LeagueCardProps {
    league: League;
    onClick: () => void;
}

export interface LeagueListProps {
    leagues: League[];
    onLeagueClick: (league: League) => void;
}
