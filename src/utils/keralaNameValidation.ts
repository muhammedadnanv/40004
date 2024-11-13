// Common Malayalam name prefixes and suffixes
const malayalamPrefixes = [
  'Achu', 'Ammu', 'Appu', 'Kutty', 'Unni', 'Kannan', 'Gopan',
  'Rajan', 'Mani', 'Babu', 'Raj', 'Krishna', 'Gopal', 'Vijayan'
];

const malayalamSuffixes = [
  'an', 'en', 'on', 'amma', 'achan', 'ayan', 'ar', 'kar',
  'nair', 'menon', 'kurup', 'pillai', 'kutty', 'namboothiri'
];

const commonKeralaNames = [
  'Aravind', 'Deepak', 'Girish', 'Harish', 'Jayesh', 'Mahesh',
  'Nimisha', 'Priya', 'Rahul', 'Sajith', 'Sreeja', 'Vinod',
  'Anjali', 'Divya', 'Gopika', 'Lakshmi', 'Meera', 'Nisha',
  'Parvathy', 'Remya', 'Sandeep', 'Vishnu'
];

export const isKeralaName = (name: string): boolean => {
  const normalizedName = name.toLowerCase().trim();
  
  // Check if it's a common Kerala name
  if (commonKeralaNames.some(kname => 
    normalizedName.includes(kname.toLowerCase()))) {
    return true;
  }

  // Check for Malayalam prefixes and suffixes
  const hasPrefix = malayalamPrefixes.some(prefix => 
    normalizedName.startsWith(prefix.toLowerCase()));
  const hasSuffix = malayalamSuffixes.some(suffix => 
    normalizedName.endsWith(suffix.toLowerCase()));

  return hasPrefix || hasSuffix;
};

export const suggestKeralaNames = (partialName: string): string[] => {
  return commonKeralaNames
    .filter(name => name.toLowerCase().includes(partialName.toLowerCase()))
    .slice(0, 5); // Return top 5 suggestions
};