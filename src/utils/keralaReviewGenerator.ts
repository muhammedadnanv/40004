// Common Kerala names data
const keralaFirstNames = [
  "Arun", "Deepa", "Priya", "Rahul", "Anjali", "Vishnu", "Lakshmi", "Krishna",
  "Meera", "Arjun", "Divya", "Sreeja", "Anoop", "Reshma", "Unni", "Saritha",
  "Rajesh", "Shobha", "Vijay", "Asha", "Manoj", "Suja", "Gopan", "Bindu"
];

const keralaSurnames = [
  "Nair", "Menon", "Pillai", "Kumar", "Kurup", "Varma", "Krishnan", "Namboothiri",
  "Thampi", "Panicker", "Kaimal", "Warrier", "Mohan", "Kartha", "Varghese", "Thomas"
];

// Common Malayalam expressions and places
const malayalamExpressions = [
  "kollam", "adipoli", "pwoli", "kalakki", "kidu", "sugham"
];

const keralaPlaces = [
  "Fort Kochi", "Munnar", "Wayanad", "Varkala", "Kovalam", "Thekkady",
  "Kumarakom", "Alappuzha", "Athirappilly", "Vagamon"
];

const reviewTemplates = [
  "Really enjoyed the {place}. {expression}! The ambiance was perfect for our family.",
  "Must visit place in Kerala. {expression}! The local food and hospitality were amazing.",
  "Great experience at {place}. The authentic Kerala feel was {expression}.",
  "Wonderful destination. The natural beauty of {place} is breathtaking. {expression}!",
  "Had an amazing time. The traditional Kerala atmosphere in {place} was {expression}.",
  "Perfect spot for a weekend getaway. {place} has everything you need. {expression}!"
];

const generateRandomRating = (): number => {
  // Bias towards higher ratings (4-5) as is common in Kerala reviews
  return Math.floor(Math.random() * 2) + 4;
};

const getRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

interface KeralaReview {
  reviewerName: string;
  rating: number;
  reviewText: string;
  date: string;
}

export const generateKeralaReview = (): KeralaReview => {
  const firstName = getRandomElement(keralaFirstNames);
  const surname = getRandomElement(keralaSurnames);
  const place = getRandomElement(keralaPlaces);
  const expression = getRandomElement(malayalamExpressions);
  const template = getRandomElement(reviewTemplates);
  
  const reviewText = template
    .replace("{place}", place)
    .replace("{expression}", expression);

  // Generate a random date within the last 30 days
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * 30));

  return {
    reviewerName: `${firstName} ${surname}`,
    rating: generateRandomRating(),
    reviewText,
    date: date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  };
};

// Generate multiple reviews
export const generateMultipleKeralaReviews = (count: number): KeralaReview[] => {
  return Array.from({ length: count }, () => generateKeralaReview());
};