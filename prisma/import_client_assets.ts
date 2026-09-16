import { PrismaClient } from '../backend/node_modules/.prisma/client/index.js';

const prisma = new PrismaClient();

async function main() {
  console.log('Importing client asset records into CMS database (DRAFT + UNVERIFIED state)...');

  // 1. Result Showcase 2023 (Consolidated Landscape Primary + Square Variant Reference)
  await prisma.topper.upsert({
    where: { slug: 'result-showcase-2023' },
    update: {},
    create: {
      slug: 'result-showcase-2023',
      studentName: 'Science Academy Toppers Showcase 2023',
      examName: 'CBSE & MP Board Class 12 & 10',
      year: 2023,
      score: '96.2% Top Score',
      subject: 'Science & Commerce',
      photoUrl: '/uploads/result-2023-showcase-landscape.jpg.jpeg',
      story: 'Featured Toppers 2023: Parth Rathore (PCM 92.4% JEE Qualified), Rudra Pathak (PCB 91.4%), Manan Agrawal (Class 10th 96.2%), Nidhi Vyas (Class 10th 94.8%). Alternate square aspect ratio reference: /uploads/result-2023-showcase-square.jpg.jpeg',
      isVerified: false,
      status: 'DRAFT',
    },
  });

  // 2. Toppers 2025 (Featuring Isha Sahu)
  await prisma.topper.upsert({
    where: { slug: 'result-toppers-2025' },
    update: {},
    create: {
      slug: 'result-toppers-2025',
      studentName: 'Isha Sahu & 2025 Toppers Team',
      examName: 'CBSE & MP Board Class 12 & 10',
      year: 2025,
      score: '92.8% PCB (Ratlam Dist. 3rd Merit)',
      subject: 'PCB / PCM / Class 10',
      photoUrl: '/uploads/result-2025-toppers.jpg.jpeg',
      story: 'Isha Sahu secured Ratlam District 3rd Merit position with 92.8% in PCB. Class 12 & 10 toppers include Daksh Mandlecha (90%), Vandana Jat (90.2%), Nidhi Vyas (89.6%).',
      isVerified: false,
      status: 'DRAFT',
    },
  });

  // 3. Class 12th MP Board 2024 Science Results
  await prisma.topper.upsert({
    where: { slug: 'result-2024-class-12-mp-board' },
    update: {},
    create: {
      slug: 'result-2024-class-12-mp-board',
      studentName: 'Palak Bachchani & Kratika Kumawat',
      examName: 'MP Board Class 12th Science',
      year: 2024,
      score: '89.6% PCM / 87.6% PCB',
      subject: 'Physics, Chemistry, Maths, Biology',
      photoUrl: '/uploads/result-2024-class-12-mp-board.jpg.jpeg',
      story: 'Class 12th MP Board 2024 Science Toppers: Palak Bachchani (PCM 89.6%, Phy 92, Che 92), Kratika Kumawat (PCB 87.6%, Bio 89), Palak Chouhan (85.2%), Himanshu Patankar (85%).',
      isVerified: false,
      status: 'DRAFT',
    },
  });

  // 4. Class 10th CBSE Toppers Poster
  await prisma.topper.upsert({
    where: { slug: 'result-class-10-cbse-toppers' },
    update: {},
    create: {
      slug: 'result-class-10-cbse-toppers',
      studentName: 'Mohammad Zaid & Class 10 CBSE Team',
      examName: 'CBSE Class 10th Board',
      year: 2024, // TODO_VERIFY exact year
      score: '95.2% Top Score',
      subject: 'Maths, Science, IT',
      photoUrl: '/uploads/result-class-10-cbse-toppers.jpg.jpeg',
      story: 'Class 10th CBSE Results: Mohammad Zaid (95.2%, IT 100, Maths 96), Vidhi Sonava (94.6%), Yash Sharma (94.4%), Vaidik Bhatt (94.2%), Aishwarya Agrawal (93.8%). Note: Year TODO_VERIFY.',
      isVerified: false,
      status: 'DRAFT',
    },
  });

  // 5. Class 10th MP Board Toppers Poster
  await prisma.topper.upsert({
    where: { slug: 'result-class-10-mp-board-toppers' },
    update: {},
    create: {
      slug: 'result-class-10-mp-board-toppers',
      studentName: 'Kushagra Sharma & MP Board Team',
      examName: 'MP Board Class 10th',
      year: 2024, // TODO_VERIFY exact year
      score: '90% Top Score',
      subject: 'Science, Maths, Sanskrit',
      photoUrl: '/uploads/result-class-10-mp-board-toppers.jpg.jpeg',
      story: 'Class 10th MP Board Results: Kushagra Sharma (90%, IT 89), Kanishk Solanki (85.6%), Veer Singh Tanwar (84%), Yashika Mehta (82.6%), Aastha Soni (80.4%). Note: Year TODO_VERIFY.',
      isVerified: false,
      status: 'DRAFT',
    },
  });

  // 6. Class 12th CBSE Toppers Poster
  await prisma.topper.upsert({
    where: { slug: 'result-class-12-cbse-toppers' },
    update: {},
    create: {
      slug: 'result-class-12-cbse-toppers',
      studentName: 'Tanisha Peetwani & 12th CBSE Team',
      examName: 'CBSE Class 12th Board',
      year: 2024, // TODO_VERIFY exact year
      score: '91.6% Top Score',
      subject: 'Physics, Chemistry, Maths',
      photoUrl: '/uploads/result-class-12-cbse-toppers.jpg.jpeg',
      story: 'Class 12th CBSE Results: Tanisha Peetwani (91.6%, Phy 91), Tushar Gehlot (83%), Gayatri Sukhwal (82.2%), Dimple Gupta (81.4%). Note: Year TODO_VERIFY.',
      isVerified: false,
      status: 'DRAFT',
    },
  });

  // 7. Class 12th MP Board Toppers Poster
  await prisma.topper.upsert({
    where: { slug: 'result-class-12-mp-board-toppers' },
    update: {},
    create: {
      slug: 'result-class-12-mp-board-toppers',
      studentName: 'Jatin Sharma & 12th MP Team',
      examName: 'MP Board Class 12th Board',
      year: 2024, // TODO_VERIFY exact year
      score: '93.2% Top Score',
      subject: 'Physics, Chemistry, Maths, Biology',
      photoUrl: '/uploads/result-class-12-mp-board-toppers.jpg.jpeg',
      story: 'Class 12th MP Board Results: Jatin Sharma (93.2%, Maths 97, Phy 93), Khushi Kumawat (93%), Titiksha Pancholi (90.8%), Maheep Panchal (90%). Note: Year TODO_VERIFY.',
      isVerified: false,
      status: 'DRAFT',
    },
  });

  // 8. Gallery Items (Classroom & Campus Photos)
  await prisma.galleryItem.createMany({
    data: [
      {
        title: 'Science Academy Classroom Interior',
        category: 'CLASSROOM',
        imageUrl: '/uploads/gallery-classroom-01.jpg.jpeg',
        caption: 'Spacious desk arrangement, air conditioning, and glare-free lighting at Science Academy Kasturba Nagar centre.',
        isVerified: false,
        status: 'DRAFT',
      },
      {
        title: 'Science Academy Smartboard Classroom',
        category: 'CLASSROOM',
        imageUrl: '/uploads/gallery-smart-classroom-01.jpg.jpeg',
        caption: 'Interactive digital panel classroom setup for visual concept modeling in Physics and Chemistry.',
        isVerified: false,
        status: 'DRAFT',
      },
      {
        title: 'Science Academy Multi-Year Hall of Fame & Award',
        category: 'EVENTS',
        imageUrl: '/uploads/hall-of-fame-multi-year.jpg.jpeg',
        caption: 'Award presentation photograph and multi-year result achievements wall (Pratham Mittal 94.2%, Nidhi Vyas 94.8%, etc.).',
        isVerified: false,
        status: 'DRAFT',
      },
      {
        title: 'Science Academy Banner Showcase',
        category: 'EVENTS',
        imageUrl: '/uploads/academy-showcase-banner.jpg.jpeg',
        caption: 'Science Academy institute header banner highlighting Isha Sahu (Ratlam Dist 3rd Merit) and core subject courses.',
        isVerified: false,
        status: 'DRAFT',
      },
    ],
    skipDuplicates: true,
  });

  console.log('Client asset records successfully imported in DRAFT + UNVERIFIED state.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
