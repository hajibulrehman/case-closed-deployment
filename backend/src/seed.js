require('dotenv').config();
const prisma = require('./utils/prisma');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // Create admin
  const adminPass = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@caseclosed.com' },
    update: {},
    create: { email: 'admin@caseclosed.com', username: 'Admin', password: adminPass, role: 'admin' }
  });

  // Create test user
  const userPass = await bcrypt.hash('user123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'user@caseclosed.com' },
    update: {},
    create: { email: 'user@caseclosed.com', username: 'TestUser', password: userPass, role: 'user' }
  });

  // Sample cases
  const cases = [
    {
      title: 'The Zodiac Killer Mystery',
      category: 'murder',
      summary: 'A series of unsolved murders in Northern California in the late 1960s and early 1970s, perpetrated by an unidentified killer who called himself the Zodiac.',
      fullContent: 'The Zodiac Killer was a serial killer who operated in Northern California from at least the late 1960s to the early 1970s. The killer\'s identity remains unknown. The Zodiac murdered victims in Benicia, Vallejo, Lake Berryessa, and San Francisco between December 1968 and October 1969. Four men and three women between the ages of 16 and 29 were targeted. The killer sent taunting letters to police and the press, including four cryptograms (ciphers). Of these four ciphers, three remain unsolved.',
      location: 'Northern California, USA',
      date: '1968-1974',
      featured: true
    },
    {
      title: 'The Jonestown Massacre',
      category: 'genocide',
      summary: 'On November 18, 1978, 918 people died in Jonestown, Guyana — the largest mass death in American history prior to 9/11.',
      fullContent: 'The Peoples Temple Agricultural Project, better known by its informal name "Jonestown", was a remote settlement established by the Peoples Temple, a San Francisco-based cult led by Jim Jones. On November 18, 1978, 918 people died in the settlement, at the nearby airstrip in Port Kaituma, and in Georgetown, Guyana\'s capital. The event is the largest mass suicide/murder in history and resulted in the largest single loss of American civilian life in a deliberate act until 9/11.',
      location: 'Jonestown, Guyana',
      date: 'November 18, 1978',
      featured: true
    },
    {
      title: 'The Disappearance of Madeleine McCann',
      category: 'missing',
      summary: 'British girl Madeleine McCann disappeared from her holiday apartment in Praia da Luz, Portugal on May 3, 2007.',
      fullContent: 'Madeleine Beth McCann disappeared on the evening of 3 May 2007 from her bed in a holiday apartment in Praia da Luz, a resort in the Algarve region of Portugal. The three-year-old was on holiday with her parents and twin siblings. The disappearance became the most widely reported missing-person case in history, generating unprecedented media coverage. Despite an extensive investigation by Portuguese and British authorities, Madeleine has not been found and no one has been charged with her disappearance or abduction.',
      location: 'Praia da Luz, Portugal',
      date: 'May 3, 2007',
      featured: true
    },
    {
      title: 'The Ted Bundy Murders',
      category: 'murder',
      summary: 'Ted Bundy confessed to 30 homicides committed in seven states between 1974 and 1978, though the true total is unknown.',
      fullContent: 'Theodore Robert Bundy was an American serial killer who kidnapped, raped, and murdered numerous young women and girls during the 1970s. He confessed to 30 homicides committed in seven states between 1974 and 1978, though the actual number of victims is believed to be higher. Bundy was notable for his good looks, charm, and intelligence. He used these qualities to lure his victims. He was arrested twice and escaped from custody twice before his final capture in 1978.',
      location: 'Multiple US States',
      date: '1974-1978',
      featured: false
    },
    {
      title: 'The Rwandan Genocide',
      category: 'genocide',
      summary: 'In 1994, members of the Hutu ethnic majority massacred an estimated 500,000–800,000 people, mostly Tutsi, in a 100-day period.',
      fullContent: 'The Rwandan genocide, also known as the genocide against the Tutsi, was a mass slaughter of Tutsi, Twa, and moderate Hutu in Rwanda, which took place between 7 April and 15 July 1994 during the Rwandan Civil War. An estimated 500,000 to 800,000 Rwandans were killed during the 100-day period. The genocide was preceded by years of ethnic tensions and political instability. The killing was organized by members of the Hutu-led government.',
      location: 'Rwanda, Africa',
      date: 'April–July 1994',
      featured: true
    },
    {
      title: 'The O.J. Simpson Murder Trial',
      category: 'police',
      summary: 'The highly publicized criminal trial of former NFL player O.J. Simpson, accused of murdering his ex-wife Nicole Brown Simpson and Ron Goldman.',
      fullContent: 'The O.J. Simpson murder case was a criminal trial held in Los Angeles County Superior Court in which former NFL running back O.J. Simpson was tried for the murders of his ex-wife Nicole Brown Simpson and her friend Ron Goldman. The murders took place on June 12, 1994. The trial began in January 1995 and concluded in October 1995 with a controversial not guilty verdict. It was described as the "trial of the century" due to the extensive media coverage it received.',
      location: 'Los Angeles, California, USA',
      date: '1994-1995',
      featured: false
    }
  ];

  for (const c of cases) {
    await prisma.case.upsert({
      where: { id: c.title.toLowerCase().replace(/\s+/g, '-').substring(0, 20) },
      update: {},
      create: { ...c, id: c.title.toLowerCase().replace(/\s+/g, '-').substring(0, 20) }
    }).catch(() => prisma.case.create({ data: c }));
  }

  // Sample fantasy story
  await prisma.story.create({
    data: {
      title: 'What if Zodiac Was Never Caught: A Parallel Universe',
      content: 'In a world where forensic science developed differently, the Zodiac Killer continued his cryptic communications well into the 1980s...',
      authorId: user.id,
      type: 'fantasy',
      status: 'published',
      genre: 'thriller',
      tags: 'zodiac,mystery,alternate-history'
    }
  }).catch(() => {});

  console.log('Seed complete!');
  console.log('Admin: admin@caseclosed.com / admin123');
  console.log('User:  user@caseclosed.com / user123');
}

main().catch(console.error).finally(() => prisma.$disconnect());
