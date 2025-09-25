// @ts-ignore
import React, {useState, useEffect} from 'react';
import {SearchBar} from './components/SearchBar';
import {SportFilter} from './components/SportFilter';
import {LeagueList} from './components/LeagueList';
import {SeasonBadgeDialog} from './components/SeasonBadgeDialog';
import {useFetch} from "./hooks/useFetch";
import {League, SeasonBadge} from "./types";
import {
    ALL_LEAGUES_URL,
    BADGE_URL,
    DEFAULT_SPORT,
    SEASONS_URL,
    LOADING_LEAGUES_TEXT,
    ERROR_PREFIX,
    SPORTS_LEAGUES_DIRECTORY,
    SHOWING_LEAGUES_TEXT, NO_SEASON_AVAILABLE, NO_BADGE_AVAILABLE
} from "./app.constants";

export default function App() {
    const [leagues, setLeagues] = useState<League[]>([]);
    const [filteredLeagues, setFilteredLeagues] = useState<League[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSport, setSelectedSport] = useState('all');
    const [selectedLeague, setSelectedLeague] = useState<League | null>(null);
    const [seasonBadge, setSeasonBadge] = useState<SeasonBadge | null>(null);
    const [badgeLoading, setBadgeLoading] = useState(false);

    // Fetch all leagues on component mount
    const {
        data: leaguesData,
        error: fetchError
    } = useFetch<{ leagues: League[] }>(ALL_LEAGUES_URL);

    // Manual fetch hooks for season and badge
    const {
        data: seasonData,
        fetchData: fetchSeasonData
    } = useFetch<any>('', {manual: true});
    const {
        data: badgeData,
        fetchData: fetchBadgeData
    } = useFetch<any>('', {manual: true});

    useEffect(() => {
        if (leaguesData && leaguesData.leagues) {
            setLeagues(leaguesData.leagues);
            setFilteredLeagues(leaguesData.leagues);
            setLoading(false);
        } else if (fetchError) {
            setError(fetchError);
            setLoading(false);
        }
    }, [leaguesData, fetchError]);

    // Filter leagues based on search term and selected sport
    useEffect(() => {
        let filtered = leagues;

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(league =>
                league.strLeague.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (league.strLeagueAlternate && league.strLeagueAlternate.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        // Filter by sport
        if (selectedSport !== DEFAULT_SPORT) {
            filtered = filtered.filter(league => league.strSport === selectedSport);
        }

        setFilteredLeagues(filtered);
    }, [leagues, searchTerm, selectedSport]);

    // Get unique sports for filter dropdown
    const uniqueSports = Array.from(new Set(leagues.map(league => league.strSport))).sort();

    // Handle league click to fetch season badge
    const handleLeagueClick = async (league: League) => {
        setSelectedLeague(league);
        setBadgeLoading(true);
        setSeasonBadge(null);
        setError(null);

        try {
            await fetchSeasonData(SEASONS_URL(league.idLeague));
            await fetchBadgeData(BADGE_URL(league.idLeague));

            let seasonName = NO_SEASON_AVAILABLE;
            if (seasonData && seasonData.seasons && seasonData.seasons.length > 0) {
                seasonName = seasonData.seasons[0].strSeason;
            }
            let badgeUrl = '';
            if (badgeData && badgeData.seasons && badgeData.seasons.length > 0) {
                const seasonWithBadge = badgeData.seasons.find((season: any) => season.strBadge);
                if (seasonWithBadge) {
                    badgeUrl = seasonWithBadge.strBadge;
                }
            }
            setSeasonBadge({
                strBadge: badgeUrl,
                strSeason: seasonName
            });
        } catch (err) {
            setSeasonBadge({
                strBadge: '',
                strSeason: NO_BADGE_AVAILABLE
            });
        } finally {
            setBadgeLoading(false);
        }
    };

    const handleCloseDialog = () => {
        setSelectedLeague(null);
        setSeasonBadge(null);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                    <p>{LOADING_LEAGUES_TEXT}</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center text-destructive">
                    <p>{ERROR_PREFIX}{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <h1 className="mb-8 text-center">{SPORTS_LEAGUES_DIRECTORY}</h1>

                <div className="mb-6 space-y-4 sm:space-y-0 sm:flex sm:gap-4">
                    <div className="flex-1">
                        <SearchBar
                            searchTerm={searchTerm}
                            onSearchChange={setSearchTerm}
                        />
                    </div>
                    <div className="sm:w-64">
                        <SportFilter
                            selectedSport={selectedSport}
                            onSportChange={setSelectedSport}
                            sports={uniqueSports}
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <p className="text-muted-foreground">
                        {SHOWING_LEAGUES_TEXT(filteredLeagues.length, leagues.length)}
                    </p>
                </div>

                <LeagueList
                    leagues={filteredLeagues}
                    onLeagueClick={handleLeagueClick}
                />

                <SeasonBadgeDialog
                    league={selectedLeague}
                    seasonBadge={seasonBadge}
                    loading={badgeLoading}
                    onClose={handleCloseDialog}
                />
            </div>
        </div>
    );
}