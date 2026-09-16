import { PrismaClient, SubjectType } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database for Science Academy Ratlam...');

  // Create Admin User if environment credentials are provided
  const adminEmail = process.env.ADMIN_EMAIL || 'kehul125@gmail.com';
  const rawAdminPassword = process.env.ADMIN_INITIAL_PASSWORD;

  if (rawAdminPassword) {
    const adminPassword = await bcrypt.hash(rawAdminPassword, 12);
    const admin = await prisma.user.upsert({
      where: { email: adminEmail },
      update: {
        password: adminPassword,
      },
      create: {
        email: adminEmail,
        name: 'Science Academy Administrator',
        password: adminPassword,
        role: 'ADMIN',
      },
    });
    console.log('Admin user configured:', admin.email);
  } else {
    console.log('Skipping initial admin user creation: ADMIN_INITIAL_PASSWORD not set in environment.');
  }

  // Initial Subject Courses Setup
  const coursesData = [
    {
      slug: 'physics',
      name: 'Physics',
      subject: SubjectType.PHYSICS,
      tagline: 'Mechanics, Electromagnetism & Modern Physics for Academic Mastery',
      description: 'Comprehensive concept building in Physics focused on fundamental principles, mathematical problem solving, and analytical reasoning.',
      overview: 'Our Physics program stresses deep conceptual clarity over rote learning, empowering students to break down complex physical phenomena step-by-step.',
      curriculum: [
        'Kinematics & Newton Laws of Motion',
        'Work, Energy & Power',
        'Rotational Dynamics & Gravitation',
        'Electrostatics & Current Electricity',
        'Magnetism & Electromagnetic Induction',
        'Optics & Modern Physics'
      ],
      isVerified: true,
    },
    {
      slug: 'chemistry',
      name: 'Chemistry',
      subject: SubjectType.CHEMISTRY,
      tagline: 'Physical, Organic & Inorganic Chemistry with Structural Clarity',
      description: 'Systematic instruction bridging atomic structures, chemical bonding, organic reaction mechanisms, and physical thermodynamics.',
      overview: 'Chemistry is taught through visual molecular modeling, detailed step-by-step reaction mechanisms, and rigorous numerical problem sets.',
      curriculum: [
        'Atomic Structure & Periodic Properties',
        'Chemical Bonding & Molecular Geometry',
        'Thermodynamics & Equilibrium',
        'Organic Chemistry Principles & Hydrocarbons',
        'Coordination Compounds & Electrochemistry',
        'Aldehydes, Ketones & Biomolecules'
      ],
      isVerified: true,
    },
    {
      slug: 'mathematics',
      name: 'Mathematics',
      subject: SubjectType.MATHEMATICS,
      tagline: 'Calculus, Algebra & Trigonometric Analytical Excellence',
      description: 'Rigorous mathematical training building logical reasoning, speed, and accuracy across algebraic structures, calculus, and coordinate geometry.',
      overview: 'Mathematics demands structural understanding. Our approach guides students through step-by-step proofs, pattern recognition, and speed techniques.',
      curriculum: [
        'Sets, Relations & Functions',
        'Trigonometry & Complex Numbers',
        'Linear Algebra & Matrices',
        'Differential & Integral Calculus',
        'Vectors & 3D Geometry',
        'Probability & Mathematical Reasoning'
      ],
      isVerified: true,
    },
    {
      slug: 'biology',
      name: 'Biology',
      subject: SubjectType.BIOLOGY,
      tagline: 'Cell Biology, Genetics & Human Physiology',
      description: 'Detailed study of living systems, cellular mechanisms, genetics, plant physiology, and human anatomical processes.',
      overview: 'Biology demands both conceptual depth and accurate diagrams. We focus on structural diagrams, physiological pathways, and precise scientific terminology.',
      curriculum: [
        'Diversity in Living World & Cell Biology',
        'Plant Physiology & Photosynthesis',
        'Human Physiology & Neural Coordination',
        'Reproductive Biology & Genetics',
        'Molecular Basis of Inheritance',
        'Ecology, Environment & Biotechnology'
      ],
      isVerified: true,
    },
    {
      slug: 'commerce',
      name: 'Commerce',
      subject: SubjectType.COMMERCE,
      tagline: 'Accountancy, Business Studies & Financial Economics',
      description: 'Foundation and advanced concepts in financial accounting, corporate organization, business economics, and financial markets.',
      overview: 'Commerce education at Science Academy combines theoretical principles with real-world financial case studies and practical ledger accounting.',
      curriculum: [
        'Financial Accounting Principles',
        'Partnership Accounts & Company Balance Sheets',
        'Business Organization & Management Functions',
        'Micro & Macro Economics',
        'Financial Markets & Consumer Protection'
      ],
      isVerified: true,
    },
    {
      slug: 'informatics-practices',
      name: 'Informatics Practices',
      subject: SubjectType.INFORMATICS_PRACTICES,
      tagline: 'Python Programming, Data Handling & SQL Database Management',
      description: 'Hands-on practical guidance in computer science fundamentals, Python data structures, pandas data frames, and SQL querying.',
      overview: 'Informatics Practices prepares students for the digital economy through practical coding exercises, database queries, and data visualization.',
      curriculum: [
        'Python Basics & Control Structures',
        'Data Handling with Pandas & Matplotlib',
        'Database Concepts & SQL Queries',
        'Computer Networks & Cyber Ethics',
        'Project Work & Practical Coding'
      ],
      isVerified: true,
    },
  ];

  for (const item of coursesData) {
    await prisma.course.upsert({
      where: { slug: item.slug },
      update: {},
      create: {
        slug: item.slug,
        name: item.name,
        subject: item.subject,
        tagline: item.tagline,
        description: item.description,
        overview: item.overview,
        curriculum: item.curriculum,
        isVerified: item.isVerified,
      },
    });
  }

  console.log('Courses seeded successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
