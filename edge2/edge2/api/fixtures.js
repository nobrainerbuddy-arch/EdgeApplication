// Uses football-data.org — free tier, no credit card
// Covers: Premier League, Bundesliga, Serie A, Ligue 1, La Liga + more
// Get free key at: https://www.football-data.org/client/register
// Set env var: FOOTBALL_DATA_KEY

const LEAGUE_IDS = [
  2021, // Premier League
  2002, // Bundesliga
  2019, // Serie A
  2015, // Ligue 1
  2014, // La Liga
  2003, // Eredivisie
  2017, // Primeira Liga
  2016, // Championship
  2152, // Copa Libertadores
  2001, // Champions League
];

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { date } = req.query;
  const key = 'fb6695bef76f4b059179fc129f039d17';

  // key is hardcoded

  try {
    // Fetch matches for the given date across all leagues
    const url = `https://api.football-data.org/v4/matches?date=${date}`;
    const r = await fetch(url, {
      headers: { 'X-Auth-Token': key }
    });

    if (!r.ok) {
      return res.json({ source: 'none', matches: [] });
    }

    const data = await r.json();
    const matches = (data.matches || []).map(m => ({
      id: m.id,
      league: m.competition?.name,
      leagueCode: m.competition?.code,
      home: m.homeTeam?.shortName || m.homeTeam?.name,
      away: m.awayTeam?.shortName || m.awayTeam?.name,
      homeId: m.homeTeam?.id,
      awayId: m.awayTeam?.id,
      status: m.status, // SCHEDULED, IN_PLAY, FINISHED, etc.
      utcDate: m.utcDate,
      scoreHome: m.score?.fullTime?.home,
      scoreAway: m.score?.fullTime?.away,
      htHome: m.score?.halfTime?.home,
      htAway: m.score?.halfTime?.away,
    }));

    res.json({ source: 'football-data.org', matches });
  } catch (e) {
    res.json({ source: 'error', matches: [], error: e.message });
  }
}
