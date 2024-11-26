import { GitHubUser, PokemonStats } from '../types/github';

export function calculatePokemonStats(user: GitHubUser): PokemonStats {
  // Calculate account age in years
  const createdAt = new Date(user.created_at);
  const now = new Date();
  const accountAge = Math.max(1, Math.floor((now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24 * 365)));
  
  // Calculate base metrics
  const totalContributions = (user.public_repos || 0) + (user.public_gists || 0);
  const influence = (user.followers || 0) * 2;
  
  // Calculate stats with proper bounds
  const stats = {
    hp: Math.min(Math.floor((accountAge * 15) + (totalContributions * 5)), 120),
    attack: Math.min(Math.floor(totalContributions * 8), 100),
    defense: Math.min(Math.floor(influence * 1.5), 100),
    speed: Math.min(Math.floor((totalContributions / accountAge) * 20), 100)
  };

  // Ensure minimum values
  return {
    hp: Math.max(stats.hp, 30),
    attack: Math.max(stats.attack, 20),
    defense: Math.max(stats.defense, 20),
    speed: Math.max(stats.speed, 20)
  };
}