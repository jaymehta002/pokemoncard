import { GoogleGenerativeAI } from "@google/generative-ai";
import { GitHubUser, PokemonProfile } from "../types/github";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export async function generateUserPokemonProfile(
  userData: GitHubUser
): Promise<PokemonProfile> {
  // Calculate rarity based on followers and contributions
  const rarity = calculateRarity(
    userData.followers,
    userData.contributions_count
  );

  // Determine type based on creation date and repos
  const type = determineType(userData.created_at, userData.public_repos);

  // Generate consistent color and background based on username
  const { color, background } = generateColorScheme(userData.login);

  // Generate moves based on user stats
  const moves = generateMoves(userData);

  // Match Pokemon based on rarity and type
  const pokemon = determinePokemon(rarity, type);

  // Generate consistent name based on username and type
  const name = generatePokemonName(userData.login, type);

  return {
    name,
    type,
    color,
    description: generateDescription(userData),
    pokemon,
    moves,
    background,
    rarity,
    specialization: determineSpecialization(userData),
  };
}

// Helper functions to generate consistent results
function calculateRarity(followers: number, contributions: number): number {
  const score = followers * 0.4 + contributions * 0.6;
  if (score > 10000) return 5;
  if (score > 5000) return 4;
  if (score > 1000) return 3;
  if (score > 100) return 2;
  return 1;
}

function determineType(createdAt: string, repoCount: number): string {
  const years =
    (new Date().getTime() - new Date(createdAt).getTime()) /
    (1000 * 60 * 60 * 24 * 365);
  const types = ["Normal", "Electric", "Psychic", "Steel", "Dark"];
  const index = Math.min(Math.floor(years + repoCount / 50), types.length - 1);
  return types[index];
}

function generateColorScheme(username: string): {
  color: string;
  background: string;
} {
  const hash = username
    .split("")
    .reduce((acc, char) => char.charCodeAt(0) + acc, 0);
  const color = `hsl(${hash % 360}, 100%, 50%)`;
  const background = `linear-gradient(135deg, ${color} 0%, #4A5568 100%)`;
  return { color, background };
}

function generateMoves(userData: GitHubUser): string[] {
  // Create a deterministic hash from username and creation date
  const hash = userData.login
    .split("")
    .reduce((acc, char) => char.charCodeAt(0) + acc * 31, 0);

  // Define a larger pool of moves
  const allMoves = [
    "Code Commit",
    "Pull Request",
    "Debug Strike",
    "Collaboration Wave",
    "Git Push Force",
    "Repository Clone",
    "Issue Tracker",
    "Branch Merger",
    "Code Review",
    "Unit Test",
    "Deploy Script",
    "API Design",
  ];

  // Deterministically select 4 moves based on user hash
  const moves: string[] = [];
  for (let i = 0; i < 4; i++) {
    const index = (hash + i) % allMoves.length;
    moves.push(allMoves[index]);
  }
  return moves;
}

function determinePokemon(rarity: number, type: string): string {
  // Define pokemon options for each type and rarity
  const pokemonMap: Record<string, Record<number, string[]>> = {
    Normal: {
      1: ["Pidgey", "Rattata"],
      2: ["Pidgeotto", "Raticate"],
      3: ["Pidgeot", "Tauros"],
      4: ["Snorlax", "Kangaskhan"],
      5: ["Mewtwo", "Mew"],
    },
    Electric: {
      1: ["Pichu", "Voltorb"],
      2: ["Pikachu", "Electrode"],
      3: ["Raichu", "Electabuzz"],
      4: ["Jolteon", "Magneton"],
      5: ["Zapdos", "Raikou"],
    },
    // Add more types as needed
  };

  // Get pokemon options for this type and rarity
  const options = pokemonMap[type]?.[rarity] || ["Ditto"];

  // Deterministically select based on type string
  const hash = type
    .split("")
    .reduce((acc, char) => char.charCodeAt(0) + acc, 0);
  return options[hash % options.length];
}

function generatePokemonName(username: string, type: string): string {
  const name = username;
  return name;
}

function generateDescription(userData: GitHubUser): string {
  const description = "Digital Developer";
  return description;
}

function determineSpecialization(userData: GitHubUser): string {
  const specialization = "Versatile Development";
  return specialization;
}
