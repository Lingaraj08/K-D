import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding data...");

  // Create K-Degree
  const aiDegree = await prisma.kDegree.create({
    data: {
      title: "Master of Artificial Intelligence",
      description: "A comprehensive K-Degree program covering foundations of AI, Machine Learning, and Neural Networks.",
      courses: {
        create: [
          {
            title: "Introduction to AI",
            description: "Learn the history and basic concepts of AI.",
            modules: {
              create: [
                {
                  title: "Getting Started",
                  order: 1,
                  lessons: {
                    create: [
                      { title: "What is AI?", videoUrl: "https://www.youtube.com/embed/2ePf9rue1Ao", order: 1 },
                      { title: "Brief History of AI", videoUrl: "https://www.youtube.com/embed/5m3l3qH8m0o", order: 2 }
                    ]
                  }
                }
              ]
            }
          },
          {
            title: "Python for AI",
            description: "Mast the language of AI.",
            modules: {
              create: [
                {
                  title: "Basics of Python",
                  order: 1,
                  lessons: {
                    create: [
                      { title: "Variables and Types", videoUrl: "https://www.youtube.com/embed/rfscVS0vtbw", order: 1 }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  });

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
