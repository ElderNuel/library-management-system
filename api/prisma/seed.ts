import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 1. Create Genres
  const sciFi = await prisma.genre.upsert({
    where: { name: 'Science Fiction' },
    update: {},
    create: { name: 'Science Fiction', description: 'Speculative fiction with advanced technology or futuristic elements.' },
  });

  const fantasy = await prisma.genre.upsert({
    where: { name: 'Fantasy' },
    update: {},
    create: { name: 'Fantasy', description: 'Books containing magical or supernatural elements.' },
  });

  const mystery = await prisma.genre.upsert({
    where: { name: 'Mystery' },
    update: {},
    create: { name: 'Mystery', description: 'Plot driven by a crime or puzzle that needs to be solved.' },
  });

  const history = await prisma.genre.upsert({
    where: { name: 'Historical Fiction' },
    update: {},
    create: { name: 'Historical Fiction', description: 'Fictional stories set against the backdrop of historical events.' },
  });

  // 2. Create Books
  const booksData = [
    // Science Fiction
    { title: 'Dune', author: 'Frank Herbert', isbn: '9780441172719', publicationYear: 1965, genreId: sciFi.id },
    { title: 'Neuromancer', author: 'William Gibson', isbn: '9780441569595', publicationYear: 1984, genreId: sciFi.id },
    { title: 'Snow Crash', author: 'Neal Stephenson', isbn: '9780553380958', publicationYear: 1992, genreId: sciFi.id },
    { title: 'The Left Hand of Darkness', author: 'Ursula K. Le Guin', isbn: '9780441478125', publicationYear: 1969, genreId: sciFi.id },
    // Fantasy
    { title: 'The Name of the Wind', author: 'Patrick Rothfuss', isbn: '9780756404741', publicationYear: 2007, genreId: fantasy.id },
    { title: 'Mistborn: The Final Empire', author: 'Brandon Sanderson', isbn: '9780765311788', publicationYear: 2006, genreId: fantasy.id },
    { title: 'The Lies of Locke Lamora', author: 'Scott Lynch', isbn: '9780553588941', publicationYear: 2006, genreId: fantasy.id },
    { title: 'The Color of Magic', author: 'Terry Pratchett', isbn: '9780062225672', publicationYear: 1983, genreId: fantasy.id },
    // Mystery
    { title: 'And Then There Were None', author: 'Agatha Christie', isbn: '9780062073488', publicationYear: 1939, genreId: mystery.id },
    { title: 'The Maltese Falcon', author: 'Dashiell Hammett', isbn: '9780679722649', publicationYear: 1930, genreId: mystery.id },
    { title: 'The Big Sleep', author: 'Raymond Chandler', isbn: '9780394758282', publicationYear: 1939, genreId: mystery.id },
    { title: 'Gone Girl', author: 'Gillian Flynn', isbn: '9780307588371', publicationYear: 2012, genreId: mystery.id },
    // Historical Fiction
    { title: 'The Book Thief', author: 'Markus Zusak', isbn: '9780375842207', publicationYear: 2005, genreId: history.id },
    { title: 'All the Light We Cannot See', author: 'Anthony Doerr', isbn: '9781476746586', publicationYear: 2014, genreId: history.id },
    { title: 'Wolf Hall', author: 'Hilary Mantel', isbn: '9780312429980', publicationYear: 2009, genreId: history.id },
  ];

  console.log('Seeding database with books...');
  for (const book of booksData) {
    await prisma.book.upsert({
      where: { isbn: book.isbn },
      update: {},
      create: book,
    });
  }

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });