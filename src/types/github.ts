export interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  public_gists: number;
  created_at: string;
  location?: string;
  blog?: string;
  email?: string;
  twitter_username?: string;
  contributions_count: number;
  detailed_data?: any;
}

export interface PokemonStats {
  hp: number;
  attack: number;
  defense: number;
  speed: number;
}

export interface PokemonProfile {
  type: string;
  color: string;
  description: string;
  pokemon: string;
  moves: string[];
  background: string;
  rarity: number;
  specialization: string;
  name?: string;
}

export interface PokemonType {
  name: string;
  color: string;
  description: string;
  pokemon: string;
  moves: string[];
  background: string;
  rarity: number;
  specialization: string;
}

export interface LanguageStats {
  [key: string]: number;
}
