import { GitHubUser, PokemonType } from "../types/github";

export const POKEMON_TYPES: Record<string, PokemonType> = {
  // Extensive developer types with unique characteristics
  QUANTUM_ARCHITECT: {
    name: "Psychic",
    color: "purple.500",
    description:
      "Visionary architect creating transformative technological solutions",
    pokemon: "Mewtwo",
    moves: [
      "Quantum Algorithm",
      "Neural Architecture",
      "System Design Insight",
      "Recursive Innovation",
    ],
    background: "linear-gradient(135deg, #8A4FFF 0%, #5200FF 100%)",
    rarity: 5,
    specialization: "Advanced AI & Machine Learning",
  },
  CLOUD_DRAGON: {
    name: "Dragon",
    color: "blue.500",
    description:
      "Scalable infrastructure maestro with global cloud engineering expertise",
    pokemon: "Rayquaza",
    moves: [
      "Multi-Cloud Strategy",
      "Serverless Surge",
      "Microservice Evolution",
      "Global Scale Deploy",
    ],
    background: "linear-gradient(135deg, #2C5282 0%, #1A365D 100%)",
    rarity: 5,
    specialization: "Cloud Native Architecture",
  },
  CYBERSECURITY_SENTINEL: {
    name: "Steel",
    color: "gray.600",
    description: "Robust security expert protecting digital ecosystems",
    pokemon: "Aegislash",
    moves: [
      "Threat Detection",
      "Penetration Analysis",
      "Cryptographic Shield",
      "Secure Code Forge",
    ],
    background: "linear-gradient(135deg, #4A5568 0%, #2D3748 100%)",
    rarity: 5,
    specialization: "Information Security",
  },
  BLOCKCHAIN_INNOVATOR: {
    name: "Fire",
    color: "red.500",
    description: "Decentralized technology pioneer reshaping digital economies",
    pokemon: "Charizard",
    moves: [
      "Smart Contract Forge",
      "Decentralized Network",
      "Crypto Protocol",
      "Token Ecosystem Design",
    ],
    background: "linear-gradient(135deg, #FF5733 0%, #C70039 100%)",
    rarity: 4,
    specialization: "Blockchain & Cryptocurrency",
  },
  DATA_SCIENCE_WIZARD: {
    name: "Psychic",
    color: "teal.500",
    description:
      "Advanced data alchemist transforming raw information into intelligent insights",
    pokemon: "Alakazam",
    moves: [
      "Predictive Model",
      "Statistical Inference",
      "Machine Learning Spell",
      "Data Visualization",
    ],
    background: "linear-gradient(135deg, #319795 0%, #2C7A7B 100%)",
    rarity: 4,
    specialization: "Advanced Analytics & ML",
  },
  FULL_STACK_WARRIOR: {
    name: "Fighting",
    color: "orange.500",
    description:
      "Versatile developer mastering both frontend and backend realms",
    pokemon: "Machamp",
    moves: [
      "Frontend Fusion",
      "Backend Battle",
      "Full Stack Strike",
      "Responsive Design",
    ],
    background: "linear-gradient(135deg, #DD6B20 0%, #C05621 100%)",
    rarity: 3,
    specialization: "Full Stack Development",
  },
  MOBILE_EVOLUTION: {
    name: "Electric",
    color: "yellow.500",
    description:
      "Mobile application architect creating next-generation mobile experiences",
    pokemon: "Jolteon",
    moves: [
      "Cross Platform Deploy",
      "Mobile UX Lightning",
      "App Store Breakthrough",
      "Performance Optimization",
    ],
    background: "linear-gradient(135deg, #ECC94B 0%, #D69E2E 100%)",
    rarity: 3,
    specialization: "Mobile App Development",
  },
  DEVOPS_ENGINEER: {
    name: "Steel",
    color: "cyan.500",
    description:
      "Automation maestro bridging development and operational excellence",
    pokemon: "Registeel",
    moves: [
      "CI/CD Pipeline",
      "Container Deployment",
      "Infrastructure Automation",
      "Monitoring Mastery",
    ],
    background: "linear-gradient(135deg, #00B5D8 0%, #0987A0 100%)",
    rarity: 4,
    specialization: "DevOps & Infrastructure",
  },
  OPEN_SOURCE_CHAMPION: {
    name: "Grass",
    color: "green.500",
    description:
      "Community-driven innovator contributing to global technological ecosystems",
    pokemon: "Celebi",
    moves: [
      "Collaborative Coding",
      "Global Contribution",
      "Community Impact",
      "Open Source Wave",
    ],
    background: "linear-gradient(135deg, #48BB78 0%, #38A169 100%)",
    rarity: 3,
    specialization: "Open Source Development",
  },
  GAME_DEVELOPER: {
    name: "Water",
    color: "blue.400",
    description:
      "Interactive experience creator pushing boundaries of digital entertainment",
    pokemon: "Blastoise",
    moves: [
      "Game Engine Mastery",
      "Interactive Design",
      "Multiplayer Architecture",
      "Graphics Optimization",
    ],
    background: "linear-gradient(135deg, #4299E1 0%, #3182CE 100%)",
    rarity: 3,
    specialization: "Game Development",
  },
  STARTUP_INNOVATOR: {
    name: "Normal",
    color: "pink.500",
    description:
      "Entrepreneurial technologist building disruptive digital solutions",
    pokemon: "Eevee",
    moves: [
      "MVP Creation",
      "Startup Agility",
      "Product Market Fit",
      "Rapid Iteration",
    ],
    background: "linear-gradient(135deg, #ED64A6 0%, #D53F8C 100%)",
    rarity: 2,
    specialization: "Startup Technology",
  },
};

export function getPokemonType(user: GitHubUser): PokemonType {
  // Create a deterministic score based on user data
  const accountAge =
    new Date().getFullYear() - new Date(user.created_at).getFullYear();
  const totalContributions =
    (user.public_repos || 0) + (user.public_gists || 0);
  const influence = (user.followers || 0) * 2;
  const score = totalContributions * 3 + influence + accountAge * 10;

  // Create a deterministic hash from username
  const usernameHash = user.login
    .split("")
    .reduce((acc, char) => char.charCodeAt(0) + acc * 31, 0);

  // Instead of random selection, use deterministic logic
  if (score > 350 && accountAge >= 6 && (user.followers || 0) > 1000)
    return POKEMON_TYPES.QUANTUM_ARCHITECT;

  if (totalContributions > 100 && (user.followers || 0) > 500)
    return POKEMON_TYPES.CLOUD_DRAGON;

  // Use bio-based matching if available
  if (user.bio) {
    const bioLower = user.bio.toLowerCase();
    if (bioLower.includes("security") || bioLower.includes("encrypt"))
      return POKEMON_TYPES.CYBERSECURITY_SENTINEL;
    if (bioLower.includes("blockchain") || bioLower.includes("crypto"))
      return POKEMON_TYPES.BLOCKCHAIN_INNOVATOR;
    if (bioLower.includes("data") || bioLower.includes("machine learning"))
      return POKEMON_TYPES.DATA_SCIENCE_WIZARD;
  }

  // Deterministic fallback based on username hash
  const typeKeys = Object.keys(POKEMON_TYPES);
  const typeIndex = usernameHash % typeKeys.length;
  return POKEMON_TYPES[typeKeys[typeIndex]];
}

// Add new function to analyze user's primary languages
function analyzePrimaryLanguages(detailedData: any): string[] {
  if (!detailedData?.repositories?.nodes) return [];

  const languageCounts: Record<string, number> = {};
  detailedData.repositories.nodes.forEach((repo: any) => {
    repo.languages?.edges?.forEach((edge: any) => {
      const lang = edge.node.name;
      languageCounts[lang] = (languageCounts[lang] || 0) + edge.size;
    });
  });

  return Object.entries(languageCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([lang]) => lang);
}

// Modify getElementalWeakness to use detailed data
export function getElementalWeakness(
  type: PokemonType,
  userData: GitHubUser
): string[] {
  const detailedData = userData.detailed_data;
  if (!detailedData) return ["Unknown Challenges"];

  const languages = analyzePrimaryLanguages(detailedData);
  const contributions = detailedData.contributionsCollection;

  // Calculate activity ratios
  const prRatio =
    contributions.totalPullRequestContributions /
    contributions.totalCommitContributions;
  const reviewRatio =
    contributions.totalPullRequestReviewContributions /
    contributions.totalPullRequestContributions;
  const issueRatio =
    contributions.totalIssueContributions /
    contributions.totalCommitContributions;

  const weaknesses: string[] = [];

  // Determine weaknesses based on activity patterns
  if (prRatio < 0.1) weaknesses.push("Code Integration");
  if (reviewRatio < 0.2) weaknesses.push("Code Review");
  if (issueRatio < 0.1) weaknesses.push("Project Planning");

  // Language-based weaknesses
  if (!languages.includes("JavaScript") && !languages.includes("TypeScript")) {
    weaknesses.push("Frontend Development");
  }
  if (!languages.includes("Python") && !languages.includes("Java")) {
    weaknesses.push("Backend Systems");
  }
  if (!languages.includes("SQL")) {
    weaknesses.push("Database Management");
  }

  return weaknesses.length > 0
    ? weaknesses.slice(0, 3)
    : ["Balanced Developer"];
}

// Add new function to generate moves based on user activity
export function generateSpecialMoves(userData: GitHubUser): string[] {
  const detailedData = userData.detailed_data;
  if (!detailedData)
    return ["Code Commit", "Basic Deploy", "Debug", "Refactor"];

  const languages = analyzePrimaryLanguages(detailedData);
  const contributions = detailedData.contributionsCollection;
  const moves: string[] = [];

  // Language-based moves
  if (languages.includes("JavaScript") || languages.includes("TypeScript")) {
    moves.push("Frontend Fusion");
  }
  if (languages.includes("Python") || languages.includes("Java")) {
    moves.push("Backend Blast");
  }
  if (languages.includes("Go")) {
    moves.push("Concurrent Strike");
  }

  // Activity-based moves
  if (contributions.totalPullRequestReviewContributions > 100) {
    moves.push("Code Review Master");
  }
  if (contributions.totalIssueContributions > 50) {
    moves.push("Issue Resolution");
  }
  if (contributions.totalCommitContributions > 500) {
    moves.push("Commit Storm");
  }

  // Ensure we have 4 moves
  const defaultMoves = [
    "Code Commit",
    "Debug Strike",
    "Refactor Wave",
    "Deploy Blast",
  ];
  return Array.from(new Set([...moves, ...defaultMoves])).slice(0, 4);
}
