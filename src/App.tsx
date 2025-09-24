// @ts-ignore
import React, { useState, useEffect } from 'react';
import { SearchBar } from './components/SearchBar';
import { SportFilter } from './components/SportFilter';
import { LeagueList } from './components/LeagueList';
import { SeasonBadgeDialog } from './components/SeasonBadgeDialog';

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
  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://www.thesportsdb.com/api/v1/json/3/all_leagues.php');
        if (!response.ok) {
          setError('Failed to fetch leagues');
        }
        const data = await response.json();
        setLeagues(data.leagues || []);
        setFilteredLeagues(data.leagues || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchLeagues();
  }, []);

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
    if (selectedSport !== 'all') {
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

    try {
      // Fetch seasons for the league
      const seasonsResponse = await fetch(`https://www.thesportsdb.com/api/v1/json/3/search_all_seasons.php?id=${league.idLeague}`);
      if (!seasonsResponse.ok) {
        setError('Failed to fetch seasons');
      }
      const seasonsData = await seasonsResponse.json();
      let seasonName = 'No season available';
      if (seasonsData.seasons && seasonsData.seasons.length > 0) {
        seasonName = seasonsData.seasons[0].strSeason;
      }

      // Fetch badge data for the league
      const badgeResponse = await fetch(`https://www.thesportsdb.com/api/v1/json/3/search_all_seasons.php?badge=1&id=${league.idLeague}`);
      let badgeUrl = '';
      if (badgeResponse.ok) {
        const badgeData = await badgeResponse.json();
        if (badgeData.seasons && badgeData.seasons.length > 0) {
          // Find the first season with a badge
          const seasonWithBadge = badgeData.seasons.find((season: any) => season.strBadge);
          if (seasonWithBadge) {
            badgeUrl = seasonWithBadge.strBadge;
          }
        }
      }

      setSeasonBadge({
        strBadge: badgeUrl,
        strSeason: seasonName
      });
    } catch (err) {
      console.error('Error fetching season or badge:', err);
      setSeasonBadge({
        strBadge: '',
        strSeason: 'No badge available'
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
          <p>Loading leagues...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center text-destructive">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-center">Sports Leagues Directory</h1>
        
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
            Showing {filteredLeagues.length} of {leagues.length} leagues
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