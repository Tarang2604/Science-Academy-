export interface SubjectConfig {
  slug: string;
  name: string;
  iconName: string;
  color: 'cyan' | 'emerald' | 'indigo' | 'rose' | 'amber' | 'violet';
  tagline: string;
}

export const ACADEMY_CONFIG = {
  name: "Science Academy",
  tagline: "Serious Academics, Modern Thinking",
  city: "Ratlam",
  state: "Madhya Pradesh",
  country: "India",
  verifiedContact: {
    phoneDisplay: "+91 78281 21320",
    phoneRaw: "+917828121320",
    whatsappUrl: "https://wa.me/917828121320?text=Hello%20Science%20Academy,%20I%20want%20to%20enquire%20about%20admissions.",
    addressDisplay: "617, Gali Number 6, Central Plaza Colony, Kasturba Nagar, Ratlam, Madhya Pradesh 457001, India",
    mapUrl: "https://maps.app.goo.gl/MsJqrRB5f67cSFyJ9",
    emailDisplay: "CONTENT_TO_BE_PROVIDED",
    isAddressVerified: true,
    isEmailVerified: false,
  },
  subjects: [
    {
      slug: "physics",
      name: "Physics",
      iconName: "Atom",
      color: "cyan",
      tagline: "Mechanics, Electromagnetism & Conceptual Physics",
    },
    {
      slug: "chemistry",
      name: "Chemistry",
      iconName: "FlaskConical",
      color: "emerald",
      tagline: "Organic Reactions, Physical Thermodynamics & Bonding",
    },
    {
      slug: "mathematics",
      name: "Mathematics",
      iconName: "Sigma",
      color: "indigo",
      tagline: "Calculus, Linear Algebra & Analytical Problem Solving",
    },
    {
      slug: "biology",
      name: "Biology",
      iconName: "Dna",
      color: "rose",
      tagline: "Cell Biology, Genetics & Human Physiology",
    },
    {
      slug: "commerce",
      name: "Commerce",
      iconName: "TrendingUp",
      color: "amber",
      tagline: "Accountancy, Business Studies & Micro-Economics",
    },
    {
      slug: "informatics-practices",
      name: "Informatics Practices",
      iconName: "Code",
      color: "violet",
      tagline: "Python Programming, Data Handling & SQL Databases",
    },
  ] as SubjectConfig[],
  navigation: [
    { label: "Home", href: "/" },
    { label: "Courses", href: "/courses" },
    { label: "Teachers", href: "/teachers" },
    { label: "Results", href: "/results" },
    { label: "Admissions", href: "/admissions" },
    { label: "About", href: "/about" },
  ],
  labels: {
    todoVerify: "TODO_VERIFY",
    contentPending: "CONTENT_TO_BE_PROVIDED",
    unverifiedNotice: "Verified details to be updated",
  },
};
