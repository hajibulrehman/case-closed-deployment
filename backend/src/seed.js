require('dotenv').config();
const prisma = require('./utils/prisma');
const bcrypt = require('bcryptjs');

async function main() {
  // ── Users ────────────────────────────────────────────────────────────────
  const adminPass = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@caseclosed.com' },
    update: {},
    create: { email: 'admin@caseclosed.com', username: 'Admin', password: adminPass, role: 'admin' }
  });

  const userPass = await bcrypt.hash('user123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'user@caseclosed.com' },
    update: {},
    create: { email: 'user@caseclosed.com', username: 'Demo', password: userPass, role: 'user' }
  });

  // ── Cases ────────────────────────────────────────────────────────────────
  const cases = [
    {
      title: 'The Zodiac Killer Mystery',
      category: 'murder',
      location: 'Northern California, USA',
      date: '1968–1974',
      featured: true,
      summary: 'An unidentified serial killer who terrorised Northern California in the late 1960s, taunting police with cryptic ciphers — some of which remain unsolved today.',
      fullContent: `BACKGROUND
The Zodiac Killer was a serial killer who operated in Northern California from at least 1968 to the early 1970s. The killer's identity has never been established. He targeted couples and lone individuals in isolated areas, striking at night.

KNOWN VICTIMS
At least five confirmed victims were killed between December 1968 and October 1969 in Benicia, Vallejo, Lake Berryessa, and San Francisco. The Zodiac himself claimed 37 victims in his letters, though only five are confirmed.

MODUS OPERANDI
The killer attacked with both firearms and a knife. He often contacted victims before or after attacks and sent taunting letters to newspapers and police, including four cryptograms designed to encode his identity.

THE CIPHERS
Of the four known ciphers, only one has been definitively solved — the 408-symbol cipher cracked by a schoolteacher couple in 1969. The 340-character cipher was solved in 2020 by a team of amateur cryptographers. Two shorter ciphers remain unsolved.

THE LETTERS
The Zodiac sent at least 20 confirmed letters between 1969 and 1974, including pieces of a victim's blood-soaked shirt as proof of his crimes. He threatened to attack school buses and boasted of building "slaves" in the afterlife.

INVESTIGATION
The case drew the largest investigation in California history at the time. Over the decades, hundreds of suspects were named. The most prominent include Arthur Leigh Allen, who was investigated multiple times but never charged due to insufficient evidence. DNA recovered from letter stamps did not match Allen.

CURRENT STATUS
The case remains officially open. The Zodiac has never been identified or charged. It is considered one of the most baffling unsolved serial murder cases in American history.`,
      perpetrator: 'Unknown — "The Zodiac"',
      victims: 'At least 5 confirmed (37 claimed by the killer)',
      suspects: 'Arthur Leigh Allen (investigated, never charged); numerous others investigated over 50+ years',
      verdict: 'Unsolved — no arrests, no charges',
      keyFacts: JSON.stringify([
        'At least 5 confirmed victims, 37 claimed',
        'Sent cryptic ciphers to newspapers',
        'Only 2 of 4 ciphers have been solved',
        'Operated in Northern California 1968–1974',
        'Identity never confirmed despite decades of investigation',
        'Threatened to attack school buses',
      ]),
      timeline: JSON.stringify([
        { year: 'Dec 1968', event: 'First confirmed attack — David Faraday and Betty Lou Jensen shot in Benicia' },
        { year: 'Jul 1969', event: 'Attack at Blue Rock Springs; first letter sent to newspapers claiming responsibility' },
        { year: 'Aug 1969', event: 'Zodiac sends three-part cipher to San Francisco Chronicle, Examiner, and Valley Times Herald' },
        { year: 'Sep 1969', event: 'Stabbings at Lake Berryessa; calls police himself to report the crime' },
        { year: 'Oct 1969', event: 'Shoots cab driver Paul Stine in San Francisco; witnessed by teenagers' },
        { year: '1969–1974', event: 'Continues sending letters, including the "My Name Is" cipher; activity eventually stops' },
        { year: '2020', event: '340-character cipher solved by international team of amateur cryptographers' },
      ]),
    },
    {
      title: 'The Jonestown Massacre',
      category: 'genocide',
      location: 'Jonestown, Guyana',
      date: 'November 18, 1978',
      featured: true,
      summary: 'The largest mass death of American civilians in a single event before 9/11 — 918 members of the Peoples Temple cult died in Jonestown, Guyana under the orders of leader Jim Jones.',
      fullContent: `BACKGROUND
Jonestown was a remote agricultural settlement in the jungle of Guyana, South America, established by Jim Jones and the Peoples Temple — a California-based cult that blended Christianity with socialist ideology. Jones moved his followers there in 1977 to escape US government scrutiny.

JIM JONES
James Warren Jones was a charismatic preacher from Indiana who founded the Peoples Temple in the 1950s. He preached racial equality and social justice, attracting a large following. As the cult grew, Jones became increasingly paranoid, controlling, and addicted to drugs. He staged fake healings and demanded absolute loyalty from members.

THE SETTLEMENT
At its peak, Jonestown housed over 900 people — mostly African Americans from California. Residents worked long hours, received minimal food, and were subjected to public humiliation and physical punishment. Jones conducted "White Night" rehearsals in which members were told to drink poison as a loyalty test, only to be told it was a drill.

CONGRESSMAN LEO RYAN
In November 1978, US Congressman Leo Ryan flew to Jonestown with journalists and concerned relatives to investigate reports of abuse. After a tense visit, some members asked to leave with Ryan's delegation.

THE MASSACRE
As Ryan's group prepared to depart at a nearby airstrip, Jonestown gunmen opened fire, killing Ryan, three journalists, and one defector — the first and only assassination of a sitting US congressman. Back in Jonestown, Jones ordered the "revolutionary suicide." Cyanide-laced punch was prepared; those who refused were injected by force. 918 people died, including 304 children.

AFTERMATH
Jim Jones died of a gunshot wound to the head — likely self-inflicted. The mass death shocked the world and led to sweeping reforms in how the US government monitors cults and protects citizens abroad.`,
      perpetrator: 'Jim Jones (Peoples Temple leader)',
      victims: '918 people, including 304 children',
      suspects: 'Jim Jones and senior Peoples Temple leadership',
      verdict: 'Jim Jones died at the scene. Several surviving Temple leaders were investigated but few faced charges.',
      keyFacts: JSON.stringify([
        '918 people died — largest mass death of Americans before 9/11',
        '304 of the dead were children',
        'Congressman Leo Ryan was assassinated at the airstrip',
        'Members rehearsed mass suicide during "White Night" drills',
        'Cyanide-laced Flavor Aid (not Kool-Aid) was used',
        'Jim Jones died of a gunshot wound — likely suicide',
      ]),
      timeline: JSON.stringify([
        { year: '1955', event: 'Jim Jones founds Peoples Temple in Indianapolis' },
        { year: '1977', event: 'Peoples Temple moves to Jonestown, Guyana to escape US scrutiny' },
        { year: 'Nov 14, 1978', event: 'Congressman Leo Ryan arrives in Jonestown with journalists and family members of cult members' },
        { year: 'Nov 18, 1978', event: 'Ryan\'s delegation ambushed at airstrip; Ryan and four others killed' },
        { year: 'Nov 18, 1978', event: 'Jones orders mass suicide; 918 die within hours' },
        { year: 'Nov 1978', event: 'US military and Guyanese officials recover bodies; international shock follows' },
      ]),
    },
    {
      title: 'The Disappearance of Madeleine McCann',
      category: 'missing',
      location: 'Praia da Luz, Portugal',
      date: 'May 3, 2007',
      featured: true,
      summary: 'Three-year-old Madeleine McCann vanished from her holiday apartment in Portugal while her parents dined nearby — becoming the most widely covered missing child case in history.',
      fullContent: `BACKGROUND
Madeleine Beth McCann, aged 3, disappeared from apartment 5A of the Ocean Club resort in Praia da Luz, Algarve, Portugal on the evening of May 3, 2007. She was on a family holiday with her parents Kate and Gerry McCann and twin siblings Sean and Amelie.

THE NIGHT OF THE DISAPPEARANCE
The McCanns were dining with friends at a tapas restaurant approximately 50 metres from the apartment. They took turns checking on the children throughout the evening. At approximately 10:00 PM, Kate McCann discovered Madeleine was gone. The shutters on the bedroom window were open.

THE INVESTIGATION
Portuguese police led the initial investigation, later joined by British authorities. The case attracted massive media attention globally. The McCanns themselves were briefly named as "arguidos" (formal suspects) in September 2007 but were cleared in 2008 when the case was archived due to insufficient evidence.

SUSPECTS
In 2022, German prosecutors named Christian Brückner — a convicted sex offender already serving time for the rape of a 72-year-old American woman in Praia da Luz in 2005 — as the prime suspect. In 2024, Brückner was charged with the crime in Germany, though he has denied involvement.

ONGOING INVESTIGATION
The case remains open across Portugal, the UK, and Germany. Madeleine has never been found. The McCann family continues to appeal for information.`,
      perpetrator: 'Unknown — Christian Brückner named as prime suspect (2022), charged in Germany (2024)',
      victims: 'Madeleine Beth McCann, aged 3',
      suspects: 'Christian Brückner — convicted sex offender; charged in Germany 2024',
      verdict: 'Unsolved — no conviction. Brückner charged but trial outcome pending.',
      keyFacts: JSON.stringify([
        'Disappeared May 3, 2007 aged 3 from Praia da Luz, Portugal',
        'Most widely reported missing child case in history',
        'Parents briefly named as suspects but cleared in 2008',
        'German suspect Christian Brückner identified in 2022',
        'Brückner charged in Germany in 2024',
        'Madeleine has never been found',
      ]),
      timeline: JSON.stringify([
        { year: 'May 3, 2007', event: 'Madeleine disappears from apartment 5A at the Ocean Club resort' },
        { year: 'Sep 2007', event: 'Kate and Gerry McCann named as formal suspects (arguidos) by Portuguese police' },
        { year: 'Jul 2008', event: 'Case archived; McCanns cleared of suspicion' },
        { year: '2013', event: 'UK Metropolitan Police launch Operation Grange — a full review of the case' },
        { year: '2022', event: 'German prosecutors name Christian Brückner as prime suspect' },
        { year: '2024', event: 'Brückner formally charged with Madeleine\'s abduction and murder in Germany' },
      ]),
    },
    {
      title: 'The Ted Bundy Murders',
      category: 'murder',
      location: 'Multiple US States',
      date: '1974–1978',
      featured: true,
      summary: 'Ted Bundy confessed to 30 murders across seven US states, using his charm and intelligence to lure victims — becoming one of the most notorious serial killers in American history.',
      fullContent: `BACKGROUND
Theodore Robert Bundy was an American serial killer, rapist, and necrophile who murdered young women and girls across seven US states between 1974 and 1978. He confessed to 30 homicides, though the true total is believed to be higher.

WHO WAS TED BUNDY
Bundy was educated, charming, and handsome — qualities he exploited to gain his victims' trust. He studied psychology, worked on a suicide prevention hotline, and even assisted a task force investigating his own crimes. He was described by those who knew him as personable and intelligent.

MODUS OPERANDI
Bundy typically approached victims in public, feigning injury or impersonation to gain trust. He would assault and murder them, often returning to crime scenes afterward. He targeted young women with long hair parted in the middle.

KNOWN VICTIMS
Bundy confessed to 30 murders in 1989, days before his execution. Victims ranged from 12 to 26 years old. The true number is unknown — some investigators believe it may exceed 100.

ARRESTS AND ESCAPES
Bundy was first arrested in 1975. He escaped custody twice — once from a courthouse library in 1977 and again from Garfield County Jail eight months later. During his second escape he traveled to Florida, where he attacked five women in the Chi Omega sorority house, killing two, and later kidnapped and murdered a 12-year-old girl.

TRIAL AND EXECUTION
Bundy represented himself at trial in Florida, turning the courtroom into a spectacle. He was convicted of the Chi Omega murders and the murder of Kimberly Leach. He was executed by electric chair on January 24, 1989. Thousands gathered outside the prison to celebrate.`,
      perpetrator: 'Theodore Robert Bundy',
      victims: '30 confirmed (true total unknown, possibly over 100)',
      suspects: 'Ted Bundy — convicted and executed',
      verdict: 'Convicted of three murders in Florida; executed January 24, 1989',
      keyFacts: JSON.stringify([
        'Confessed to 30 murders across 7 states',
        'Escaped from custody twice',
        'Represented himself at trial',
        'Executed by electric chair January 24, 1989',
        'Worked on a suicide prevention hotline while killing',
        'Attacked a sorority house in Florida, killing two women',
      ]),
      timeline: JSON.stringify([
        { year: 'Jan 1974', event: 'First confirmed disappearance — Joni Lenz, University of Washington' },
        { year: '1974–1975', event: 'Kills at least 11 women across Washington and Oregon' },
        { year: 'Aug 1975', event: 'Arrested in Utah after a routine traffic stop; handcuffs and burglary tools found in car' },
        { year: 'Jun 1977', event: 'Escapes from courthouse library in Aspen, Colorado; recaptured' },
        { year: 'Dec 1977', event: 'Escapes from Garfield County Jail; travels to Florida' },
        { year: 'Jan 1978', event: 'Chi Omega sorority house attack — two killed, three injured. Later kidnaps and kills 12-year-old Kimberly Leach' },
        { year: 'Feb 1978', event: 'Arrested in Pensacola, Florida during a routine traffic stop' },
        { year: 'Jan 24, 1989', event: 'Executed by electric chair at Florida State Prison' },
      ]),
    },
    {
      title: 'The Rwandan Genocide',
      category: 'genocide',
      location: 'Rwanda, Africa',
      date: 'April–July 1994',
      featured: true,
      summary: 'In 100 days, Hutu extremists massacred an estimated 500,000–800,000 Tutsi and moderate Hutu — one of the fastest and most concentrated genocides in modern history.',
      fullContent: `BACKGROUND
The Rwandan genocide occurred between April 7 and July 15, 1994. In approximately 100 days, members of the Hutu ethnic majority — orchestrated by extremist elements of the Hutu-led government — systematically killed an estimated 500,000 to 800,000 Tutsi civilians and moderate Hutu.

HISTORICAL CONTEXT
Ethnic tensions between Hutu and Tutsi had been exacerbated by Belgian colonial rule, which formalised ethnic identity cards. Following independence, waves of anti-Tutsi violence occurred in 1959, 1962, and 1973. The Rwandan Patriotic Front (RPF), a Tutsi-led rebel group based in Uganda, began a civil war in 1990.

THE TRIGGER
On April 6, 1994, President Juvénal Habyarimana's plane was shot down over Kigali. Within hours, Hutu extremist militias (Interahamwe) began killing Tutsi civilians and moderate Hutu political leaders. Roadblocks were erected across the country. Identity cards were used to identify Tutsi for execution.

THE ROLE OF RADIO
Radio Mille Collines — known as "Radio Machete" — broadcast propaganda urging Hutus to kill Tutsi, referring to them as "inyenzi" (cockroaches). It provided the names and locations of individuals to be killed.

INTERNATIONAL FAILURE
The United Nations had a peacekeeping force (UNAMIR) in Rwanda. Its commander, General Roméo Dallaire, sent the UN a "genocide fax" warning of the impending massacre. The UN ordered him not to act. The US and other nations evacuated their citizens while leaving Rwandans to die.

THE END
The genocide ended when the RPF, led by Paul Kagame, defeated the Hutu government and took control of Rwanda in July 1994. An estimated 2 million Hutu fled to neighbouring countries fearing reprisals.

JUSTICE
The International Criminal Tribunal for Rwanda (ICTR) was established and convicted numerous orchestrators. Gacaca community courts in Rwanda tried over 1.9 million cases.`,
      perpetrator: 'Hutu extremist government and Interahamwe militias',
      victims: '500,000–800,000 Tutsi and moderate Hutu',
      suspects: 'Senior Hutu government officials, military leaders, and militia commanders',
      verdict: 'International Criminal Tribunal for Rwanda convicted 93 individuals; Gacaca courts tried 1.9 million cases',
      keyFacts: JSON.stringify([
        '500,000–800,000 killed in approximately 100 days',
        'Machetes were the primary weapon — widely distributed in advance',
        'Radio broadcasts directed killers to specific victims by name',
        'UN peacekeepers present but ordered not to intervene',
        'The US and other nations evacuated their citizens without acting',
        'RPF under Paul Kagame ended the genocide by defeating the government',
      ]),
      timeline: JSON.stringify([
        { year: 'Oct 1990', event: 'RPF invades Rwanda from Uganda — civil war begins' },
        { year: 'Aug 1993', event: 'Arusha Accords signed — peace deal between government and RPF' },
        { year: 'Apr 6, 1994', event: 'President Habyarimana\'s plane shot down; genocide begins within hours' },
        { year: 'Apr 7, 1994', event: 'Prime Minister Agathe Uwilingiyimana and 10 Belgian UN peacekeepers murdered' },
        { year: 'Apr 1994', event: 'UN Security Council reduces UNAMIR force from 2,500 to 270 troops' },
        { year: 'Apr–Jul 1994', event: 'Systematic killing spreads across Rwanda; approximately 8,000 killed per day' },
        { year: 'Jul 4, 1994', event: 'RPF captures Kigali; genocide ends' },
        { year: '1994–2015', event: 'ICTR convicts 93 individuals for genocide and crimes against humanity' },
      ]),
    },
    {
      title: 'The O.J. Simpson Murder Trial',
      category: 'police',
      location: 'Los Angeles, California, USA',
      date: '1994–1995',
      featured: false,
      summary: 'Former NFL star O.J. Simpson was acquitted of murdering his ex-wife Nicole Brown Simpson and Ron Goldman in a trial that exposed racial divisions in America and transformed media coverage of criminal cases.',
      fullContent: `BACKGROUND
On June 12, 1994, Nicole Brown Simpson (35) and her friend Ron Goldman (25) were found stabbed to death outside Nicole's condominium in Brentwood, Los Angeles. Nicole's ex-husband, former NFL running back O.J. Simpson, was the prime suspect.

THE BRONCO CHASE
On June 17, 1994, after Simpson failed to surrender as ordered, he was discovered in the back of a white Ford Bronco driven by friend Al Cowlings. A low-speed chase broadcast live on national TV was watched by an estimated 95 million people. Simpson surrendered after several hours.

THE EVIDENCE
Physical evidence against Simpson included blood matching his DNA at the crime scene, a bloody glove found at his property, blood in his Ford Bronco, and a cut on his hand the morning after the murders. A sock with Nicole's blood was found in his bedroom.

THE DEFENCE
Simpson's defence team — dubbed the "Dream Team" — included Johnnie Cochran, Robert Shapiro, and F. Lee Bailey. They argued that the LAPD had planted evidence, that lead detective Mark Fuhrman was a racist (confirmed by taped recordings), and that the gloves were too small. Cochran's famous phrase: "If it doesn't fit, you must acquit."

THE VERDICT
On October 3, 1995, after less than four hours of deliberation, the jury returned a not guilty verdict. The reaction split sharply along racial lines — many Black Americans celebrated, while many white Americans were outraged.

CIVIL TRIAL
In February 1997, a civil jury found Simpson liable for the deaths and ordered him to pay $33.5 million in damages to the victims' families. He largely avoided paying.

LATER LIFE AND DEATH
Simpson was later convicted of armed robbery and kidnapping in 2007 in Las Vegas and sentenced to 33 years, serving nine before parole. He died of prostate cancer on April 10, 2024.`,
      perpetrator: 'O.J. Simpson (acquitted criminally; found liable civilly)',
      victims: 'Nicole Brown Simpson (35) and Ron Goldman (25)',
      suspects: 'O.J. Simpson',
      verdict: 'Not guilty (criminal, 1995) — Liable (civil, 1997, $33.5M judgment)',
      keyFacts: JSON.stringify([
        'Nicole Brown Simpson and Ron Goldman stabbed June 12, 1994',
        'Low-speed Bronco chase watched by 95 million people on live TV',
        'DNA, blood, and glove evidence presented against Simpson',
        'Defence argued LAPD planted evidence; detective Mark Fuhrman caught using racial slurs on tape',
        'Acquitted after less than 4 hours of deliberation',
        'Found liable in civil trial; ordered to pay $33.5 million',
        'Later convicted of armed robbery in 2007; died 2024',
      ]),
      timeline: JSON.stringify([
        { year: 'Jun 12, 1994', event: 'Nicole Brown Simpson and Ron Goldman found murdered' },
        { year: 'Jun 17, 1994', event: 'Low-speed Bronco chase broadcast live on TV; Simpson surrenders' },
        { year: 'Jan 24, 1995', event: 'Criminal trial begins in Los Angeles' },
        { year: 'Sep 1995', event: 'Detective Mark Fuhrman caught on tape using racial slurs; credibility destroyed' },
        { year: 'Oct 3, 1995', event: 'Jury returns not guilty verdict after less than 4 hours' },
        { year: 'Feb 1997', event: 'Civil jury finds Simpson liable; orders $33.5M in damages' },
        { year: 'Sep 2007', event: 'Simpson arrested in Las Vegas for armed robbery and kidnapping' },
        { year: 'Oct 2008', event: 'Convicted on all 12 counts; sentenced to 33 years' },
        { year: 'Apr 10, 2024', event: 'O.J. Simpson dies of prostate cancer aged 76' },
      ]),
    },
  ];

  for (const c of cases) {
    const existing = await prisma.case.findFirst({ where: { title: c.title }, select: { id: true } });
    if (existing) {
      await prisma.case.update({ where: { id: existing.id }, data: c });
    } else {
      const created = await prisma.case.create({ data: c });
      // Add cover image
      const { getCaseImageUrl } = require('./utils/caseImage');
      await prisma.caseMedia.create({
        data: {
          caseId: created.id,
          type: 'image',
          url: getCaseImageUrl(created.id, c.category, c.title),
          caption: `Cover image for ${c.title}`
        }
      }).catch(() => {});
    }
  }

  // ── Sample story ─────────────────────────────────────────────────────────
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
  console.log('User:  demo@caseclosed.com / user123');
}

main().catch(console.error).finally(() => prisma.$disconnect());
