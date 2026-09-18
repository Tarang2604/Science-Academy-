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
    phoneDisplay: "+91 78281 21320 / +91 93032 95331",
    phoneRaw: "+917828121320",
    whatsappUrl: "https://wa.me/917828121320?text=Hello%20Science%20Academy,%20I%20want%20to%20enquire%20about%20admissions.",
    addressDisplay: "617, Gali Number 6, Central Plaza Colony, Kasturba Nagar, Ratlam, MP 457001",
    mapUrl: "https://share.google/qWqM5clMkc3XdSk6Z",
    emailDisplay: "CONTENT_TO_BE_PROVIDED",
    instagramUrl: "https://www.instagram.com/scienceacademyrtm/",
    isAddressVerified: true,
    isEmailVerified: false,
    branches: [
      {
        id: "branch-kasturba",
        name: "Campus 1 — Kasturba Nagar",
        address: "617, Gali No. 6, Central Plaza Colony, Kasturba Nagar, Ratlam (M.P.) 457001",
        mapUrl: "https://share.google/qWqM5clMkc3XdSk6Z",
      },
      {
        id: "branch-shakti",
        name: "Campus 2 — Shakti Nagar",
        address: "Shakti Nagar / 80 Feet Road Centre, Ratlam (M.P.) 457001",
        mapUrl: "https://share.google/qWqM5clMkc3XdSk6Z",
      },
    ],
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
    { label: "About Us", href: "/about" },
    { label: "Courses", href: "/courses" },
    { label: "Results & Toppers", href: "/results" },
    { label: "Faculty", href: "/teachers" },
    { label: "Admissions", href: "/admissions" },
    { label: "Contact Us", href: "/contact" },
  ],
  labels: {
    todoVerify: "TODO_VERIFY",
    contentPending: "CONTENT_TO_BE_PROVIDED",
    unverifiedNotice: "Verified details to be updated",
  },
};
