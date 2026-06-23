require('dotenv').config();
const prisma = require('./utils/prisma');
const PROXY = 'http://localhost:5000/api/imgproxy?url=';
const wrap = url => PROXY + encodeURIComponent(url);

const ARTICLES = [
  {
    title: 'Interrogation Techniques: How Police Extract Confessions',
    slug: 'interrogation-techniques',
    category: 'investigation',
    summary: 'From the controversial Reid Technique to the science-based PEACE model — how interrogators get people to talk, and why false confessions happen more than you think.',
    featured: false,
    tags: 'interrogation,confession,Reid,PEACE,psychology,false-confession',
    coverImage: wrap('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=450&fit=crop&auto=format&q=80'),
    content: `Interrogation is the art of getting people to tell the truth — or what they believe to be the truth — under circumstances where they have strong incentives not to. It sits at the intersection of psychology, law, and theatre.

THE REID TECHNIQUE
The Reid Technique, developed by John E. Reid in the 1950s and 1960s, became the dominant interrogation method in American policing and is still widely used today. It is a two-phase process: the Behavioural Analysis Interview (BAI), where the interrogator claims to detect deception through physical cues, followed by the Nine Steps of Interrogation, where the interrogator assumes guilt and works to overcome the suspect's resistance.

The nine steps include: positive confrontation (declaring guilt as a certainty), theme development (offering moral justifications for the crime), handling denials (cutting off protestations of innocence), overcoming objections, gaining the suspect's attention, showing understanding, offering alternative questions (giving a choice between two incriminating answers), and getting a verbal confession.

THE PROBLEM WITH REID
The fundamental problem with the Reid Technique is that its behavioural indicators of deception — avoiding eye contact, fidgeting, inconsistent stories — are largely unreliable. Scientific research has consistently shown that humans are only marginally better than chance at detecting deception from body language. Police officers, despite their training and experience, perform no better.

The technique is also highly confrontational and emotionally manipulative by design. This creates false confessions. The Innocence Project has found that approximately 27% of DNA exonerations involved false confessions — suspects who admitted to crimes they did not commit after hours of high-pressure interrogation.

FALSE CONFESSIONS
Why would an innocent person confess? Three reasons: voluntary false confessions (people confess to protect someone else or seek notoriety), compliant false confessions (the suspect believes the immediate reward of ending the interrogation outweighs the long-term cost), and internalised false confessions (the suspect actually comes to believe they committed the crime due to extreme psychological pressure). The third type is the most disturbing and the most legally dangerous.

THE PEACE MODEL
In the 1990s, the UK developed the PEACE model (Preparation and Planning, Engage and Explain, Account, Closure, Evaluation) as an alternative. PEACE is information-gathering rather than confession-seeking. It does not assume guilt. It does not use psychological manipulation. Interrogators are trained to listen and probe rather than confront and accuse.

Studies comparing PEACE and Reid-style interrogations have found that PEACE produces more accurate and complete information. It also dramatically reduces false confessions. Several US jurisdictions have begun adopting PEACE-based approaches, though Reid remains dominant.

COGNITIVE LOAD TECHNIQUES
Recent research has focused on increasing the "cognitive load" of suspects — asking them to recall events in reverse chronological order, for example. Truthful accounts are easier to tell backward than deceptive ones, because honest memories have a natural structure while fabrications are more fragile and direction-dependent. These techniques are not yet widely standardised but represent the direction of evidence-based interrogation research.`,
  },
  {
    title: 'The Science of Eyewitness Memory: Why Witnesses Get It Wrong',
    slug: 'eyewitness-memory-science',
    category: 'evidence',
    summary: 'Eyewitness testimony is the most compelling and least reliable form of evidence in criminal trials. Here\'s the neuroscience of why memory misleads — and what courts are doing about it.',
    featured: false,
    tags: 'eyewitness,memory,psychology,false-conviction,neuroscience',
    coverImage: wrap('https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?w=800&h=450&fit=crop&auto=format&q=80'),
    content: `"I looked right at him. I will never forget that face."

These are the words juries find most convincing. They are also, according to decades of cognitive science research, among the least reliable statements a witness can make.

THE MEMORY PARADOX
Human memory does not work like a video camera. It does not record, store, and playback events faithfully. Memory is reconstructive — every time you remember something, you rebuild it from fragments, filling in gaps with schema (what you expect to see based on prior experience) and post-event information. The very act of remembering changes what you remember.

This is not a bug. It is a feature. A reconstructive memory system is more efficient and adaptive than a literal recording system. But it makes eyewitness testimony fundamentally problematic as legal evidence.

THE WEAPON FOCUS EFFECT
When a weapon is present during a crime, witnesses spend significantly more time looking at the weapon than at the perpetrator's face. This is the weapon focus effect, documented in dozens of studies. The result: in crimes involving weapons — the very crimes most likely to go to trial — witnesses have less accurate face memory than in comparable crimes without weapons.

CROSS-RACE IDENTIFICATION
People are significantly better at recognising faces of their own race than faces of other races. This cross-race effect (also called the own-race bias) is robust and has been replicated across cultures. In a country where most policing disproportionately involves cross-race interactions, this effect has significant implications for the accuracy of identifications.

THE CONTAMINATION OF LINEUPS
The way a lineup is conducted has enormous effects on witness accuracy. Simultaneous lineups (showing all suspects at once) produce more false positives than sequential lineups (showing one at a time) because witnesses make relative rather than absolute judgements: not "is this the person?" but "is this the most similar person to my memory?"

Feedback from officers ("Good, you got him") after an identification dramatically increases a witness's subsequent confidence — even though the confidence was formed after, not before, the feedback. This makes confident witnesses in court seem more reliable than the underlying identification actually was.

THE MISINFORMATION EFFECT
Psychologist Elizabeth Loftus demonstrated in landmark experiments that post-event information — a leading question, a news report, a conversation with another witness — can alter memories of an event. Witnesses who were asked "How fast were the cars going when they smashed into each other?" remembered higher speeds than witnesses asked "How fast were the cars going when they hit each other?" — and were more likely to falsely remember seeing broken glass.

WHAT COURTS ARE DOING
The US Supreme Court case New Jersey v. Henderson (2011) established new jury instructions for eyewitness testimony in New Jersey, requiring courts to consider factors like lighting, stress, weapon presence, and lineup administration. Several states have enacted mandatory reforms to lineup procedures. But change is slow: eyewitness testimony remains powerful with juries, and the gap between the science and the courtroom remains wide.`,
  },
  {
    title: 'Organised Crime: How the Mafia, Cartels and Gangs Really Work',
    slug: 'organised-crime-how-it-works',
    category: 'crime-techniques',
    summary: 'The structure, economics, and operations of organised crime — from the Italian-American Cosa Nostra to Mexican drug cartels to modern transnational crime networks.',
    featured: true,
    tags: 'mafia,cartel,organised-crime,money-laundering,structure',
    coverImage: wrap('https://images.unsplash.com/photo-1524234107056-1c1f48f64ab8?w=800&h=450&fit=crop&auto=format&q=80'),
    content: `Organised crime is not random. It is, by definition, organised — hierarchical, economically rational, and structurally similar across cultures and centuries. Understanding how it works is the first step to understanding why it persists.

THE BASIC ECONOMICS
Criminal organisations exist to provide goods and services that are illegal — drugs, prostitution, gambling, protection, contract violence. The illegality creates the value: because legitimate competitors are excluded by law, criminal organisations can charge monopoly prices. The same economics that explain why legal businesses organise into firms also explain why criminals organise into gangs.

THE COSA NOSTRA STRUCTURE
The traditional Italian-American Mafia (Cosa Nostra — "Our Thing") operates in a military hierarchy:

BOSS (the don) — ultimate authority
UNDERBOSS — second in command, manages operations
CONSIGLIERE — advisor, handles disputes
CAPOS (captains) — manage crews of 10–20 soldiers
SOLDIERS — made members, full Cosa Nostra
ASSOCIATES — non-members who work with the family

This structure provides operational security (each level knows only what it needs to know), dispute resolution (the consigliere mediates), and succession planning (clear hierarchy means the organisation survives leadership changes).

MEXICAN CARTELS — A DIFFERENT MODEL
Mexican drug cartels like the Sinaloa Cartel and CJNG operate differently from the Mafia. They are larger, more violent, more vertically integrated (controlling production, transportation, and distribution), and more geographically dispersed. The Sinaloa Cartel, founded by Joaquín "El Chapo" Guzmán, pioneered a franchise model — partnering with local organisations rather than absorbing them, providing product, logistics, and brand protection in exchange for a percentage of revenue.

THE ROLE OF CORRUPTION
No criminal organisation can function without corrupting some part of the state. This is not incidental — it is structural. Police who don't investigate, prosecutors who don't charge, politicians who don't legislate, judges who don't convict: each represents a necessary purchase. The economics of corruption are straightforward: the criminal organisation profits enough to make corruption cheaper than prosecution.

MONEY LAUNDERING
Criminal revenue must be converted into legitimate-appearing income. Classic methods: cash-intensive businesses (restaurants, car washes, dry cleaners) where criminal cash is mixed with legitimate revenue and declared as profit; real estate transactions using nominees or shell companies; trade-based money laundering using over- and under-invoiced imports and exports; and increasingly, cryptocurrency.

THE FBI'S RICO STRATEGY
The Racketeer Influenced and Corrupt Organizations Act (RICO, 1970) transformed the prosecution of organised crime by targeting the enterprise rather than individual crimes. Before RICO, prosecuting a boss for a murder required proving he ordered it — difficult because bosses insulated themselves through intermediaries. RICO allows prosecution of anyone who participated in a "pattern of racketeering activity" as part of an enterprise. It was the legal tool that dismantled the five New York families in the 1980s and continues to be used against gangs and cartels.`,
  },
  {
    title: 'How Serial Killers Are Caught: A History of Investigative Breakthroughs',
    slug: 'how-serial-killers-are-caught',
    category: 'investigation',
    summary: 'From the first fingerprint conviction to genealogical DNA — how the tools for catching serial killers evolved across a century and what catches them now.',
    featured: true,
    tags: 'serial-killers,DNA,forensics,investigation,history,CODIS',
    coverImage: wrap('https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=800&h=450&fit=crop&auto=format&q=80'),
    content: `Serial killers are caught in one of five ways: a witness, a mistake, informant information, investigative persistence, or forensic science. Over the past hundred years, the balance has shifted dramatically toward forensics — and within forensics, DNA has become the dominant tool.

1900s–1950s: FINGERPRINTS AND WITNESSES
The first fingerprint conviction in the US came in 1911 (Thomas Jennings, Chicago). For the first half of the twentieth century, the dominant investigative tools were fingerprints and eyewitnesses. Serial killers who could avoid leaving fingerprints and who worked in areas where witnesses were scarce could operate for years — Albert Fish killed for decades, and the Cleveland Torso Murderer was never identified despite a massive investigation in the 1930s.

1960s–1970s: GEOGRAPHIC PROFILING AND DATABASES
The FBI's Behavioral Science Unit, established in the 1970s, pioneered criminal profiling — using crime scene analysis to infer characteristics of the offender. The National Crime Information Center (NCIC), established in 1967, began linking crimes across jurisdictions. For the first time, a murder in Ohio and a murder in California could be connected if investigators looked for the link.

THE PROBLEM: LINKAGE BLINDNESS
Many serial killers of the 1970s and 1980s operated across jurisdictions precisely because police departments did not share information. Ted Bundy killed in Washington, Oregon, Utah, Colorado, and Florida. Gary Ridgway killed in King County, Washington for years without triggering a federal investigation. The systems for linking crimes across state lines were inadequate.

1988: THE FIRST DNA CONVICTION
Colin Pitchfork became the first person convicted using DNA evidence in 1988 in the UK. The case set the template: biological evidence from crime scenes compared against a reference database. CODIS (Combined DNA Index System) was established in the US in 1998 and now contains over 20 million profiles.

DNA CHANGED EVERYTHING
Since CODIS, the clearance rate for cases with biological evidence has improved dramatically. Crimes that went unsolved for decades — sometimes for the perpetrator's entire lifetime — can now be resolved when a profile uploads to a database and finds a match. Gary Ridgway was caught in 2001 when improved DNA technology matched samples taken from him in 1987. The Golden State Killer was caught in 2018.

2018: GENETIC GENEALOGY
The most recent breakthrough: uploading crime scene DNA to public genealogy databases (GEDmatch, FamilyTreeDNA) and building family trees to identify relatives of the unknown suspect. This technique has solved over 300 cold cases since 2018. It is also controversial — the databases were built by people uploading their DNA to find relatives, not expecting that law enforcement would use their data to identify third parties.

THE HUMAN FACTOR
Despite all technology, many killers are still caught the old-fashioned way: someone talks. A cellmate. An ex-partner. A family member who noticed something wrong. Dennis Rader (BTK) was caught because he was overconfident after a dormant period and sent a floppy disk — but his ex-wife's statement was also part of what closed the net. Technology extends the reach of investigation; the human impulse to confide in someone remains the oldest and most reliable leak in any secret.`,
  },
  {
    title: 'What Happens to Serial Killers in Prison?',
    slug: 'serial-killers-in-prison',
    category: 'legal',
    summary: 'Life on death row, protective custody, prison fame, psychological treatment — what actually happens to serial killers after conviction.',
    featured: false,
    tags: 'prison,death-row,incarceration,serial-killers,psychology',
    coverImage: wrap('https://images.unsplash.com/photo-1590076082859-4b8b8b55e893?w=800&h=450&fit=crop&auto=format&q=80'),
    content: `The story does not end at the verdict. What happens to serial killers after conviction tells us something significant about the justice system, the psychology of violence, and the strange cultural relationship between notoriety and infamy.

PROTECTIVE CUSTODY
Serial killers — particularly those who have committed crimes against children or who have received enormous media coverage — are typically placed in protective custody rather than the general prison population. This is not for their benefit but for practical prison management: high-profile inmates in general population create disorder, become targets for violence (which creates investigations and litigation), and attract attention from inmates seeking status through proximity to notoriety.

John Wayne Gacy was in protective custody for most of his time on death row at Menard Correctional Center. Ted Bundy was housed separately at Florida State Prison. Jeffrey Dahmer was famously placed in the general population at Columbia Correctional Institution, where he was killed by a fellow inmate in 1994.

DEATH ROW
In states that retain the death penalty, serial killers convicted of capital offences typically spend years or decades on death row. The average time between sentencing and execution in the US is over 15 years. During this time, inmates have limited programming, spend 22–23 hours per day in their cells, and undergo the particular psychological toll of indefinite waiting.

Richard Ramirez (Night Stalker) spent 23 years on death row at San Quentin before dying of cancer in 2013. John Wayne Gacy was executed after 14 years. Ted Bundy's case moved more quickly — he was executed approximately 10 years after conviction, partly because he waived appeals.

PRISON FAME
Many serial killers receive significant mail from the public while incarcerated — including fan letters, marriage proposals, and requests for artwork. This phenomenon (called "hybristophilia" in psychology, colloquially "Bundy fever") reflects a complex social psychology around infamy, danger, and transgression. John Wayne Gacy sold clown paintings from death row for thousands of dollars. Richard Ramirez married a journalist who had written to him.

EXECUTION METHODS AND PROTOCOLS
The US currently uses lethal injection as its primary execution method. The standard three-drug protocol uses a sedative (midazolam or pentobarbital), a paralytic (pancuronium bromide), and potassium chloride to stop the heart. Ongoing legal challenges to execution methods — particularly around the adequacy of sedation and the potential for pain — have led several states to use single-drug protocols.

PSYCHOLOGICAL TREATMENT
Serial killers in prison present a difficult clinical challenge. Antisocial personality disorder and psychopathy are widely considered resistant to treatment — not because the behaviours cannot be managed but because the underlying motivation (lack of empathy, exploitative orientation) does not change. Therapy for psychopathic inmates has, in some studies, been found to increase their ability to manipulate others by teaching them the language of therapeutic insight without the underlying emotional experience.

The most consistently useful prison programming for violent offenders involves practical skills, structured routine, and clear behavioural contingencies — not insight-based psychotherapy.`,
  },
  {
    title: 'The Dark Web and Cybercrime: How Digital Crime Actually Works',
    slug: 'dark-web-cybercrime-explained',
    category: 'crime-techniques',
    summary: 'From dark web markets to ransomware to financial fraud — how cybercrime is organised, how investigators trace digital criminals, and why it\'s so difficult to prosecute.',
    featured: false,
    tags: 'cybercrime,dark-web,ransomware,fraud,hacking,digital-forensics',
    coverImage: wrap('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=450&fit=crop&auto=format&q=80'),
    content: `The dark web is not a place. It is a protocol — specifically, a collection of websites hosted on the Tor network (The Onion Router), which anonymises internet traffic by routing it through multiple encrypted relays. It exists alongside the ordinary internet and requires specific software to access.

THE SURFACE, DEEP, AND DARK WEB
The surface web is what you access through Google — indexed, public, searchable. The deep web is everything that isn't indexed: your email, banking portals, subscription databases, medical records. The dark web is a small subset of the deep web specifically designed for anonymity, accessed via Tor.

DARK WEB MARKETS
The Silk Road, founded in 2011 by Ross Ulbricht ("Dread Pirate Roberts"), was the first major dark web marketplace for illegal goods — primarily drugs. It operated like Amazon, with seller ratings and customer reviews, and processed hundreds of millions of dollars in transactions before the FBI shut it down in 2013 and arrested Ulbricht (now serving life in prison). Its successors — Hansa, AlphaBay, Dream Market — followed the same model and met similar ends.

HOW LAW ENFORCEMENT TRACES CRYPTOCURRENCY
Dark web markets use cryptocurrency (primarily Bitcoin, later Monero) to obscure financial flows. The popular belief that Bitcoin is untraceable is wrong — Bitcoin's blockchain is a permanent public record of every transaction. Chain analysis companies like Chainalysis map transaction flows and identify the addresses of exchanges. When a criminal "cashes out" — converting cryptocurrency to fiat currency at an exchange — they typically trigger know-your-customer requirements that require identification.

RANSOMWARE
Ransomware attacks — in which hackers encrypt a victim's files and demand payment for the decryption key — have become one of the most financially significant forms of cybercrime. Notable attacks include WannaCry (2017, North Korean attribution, 200,000+ systems), NotPetya (2017, Russian attribution, $10 billion in damages), and the Colonial Pipeline attack (2021, DarkSide group, disrupted US East Coast fuel supply). Ransomware is typically delivered through phishing emails or unpatched vulnerabilities.

THE ATTRIBUTION PROBLEM
The fundamental challenge in cybercrime prosecution is attribution — proving that a specific person committed a specific crime. Digital evidence can be spoofed, proxied, or falsely planted. Nation-state hackers often operate through cut-outs that provide plausible deniability. International jurisdictions complicate prosecution: a hacker in Russia targeting victims in the US is effectively untouchable unless they travel to a country with an extradition treaty.

THE FBI'S APPROACH
The FBI's Cyber Division uses a combination of technical penetration of criminal infrastructure (the Hansa market takedown involved Dutch police covertly running the market for weeks to identify users), financial intelligence (tracing cryptocurrency flows), human intelligence (turning arrested members), and international cooperation through Europol and bilateral agreements.`,
  },
];

async function main() {
  console.log('\n📚 Seeding additional Learn articles...\n');

  let added = 0, skipped = 0;
  for (const a of ARTICLES) {
    const exists = await prisma.article.findFirst({ where: { slug: a.slug } });
    if (exists) { skipped++; continue; }
    await prisma.article.create({ data: a });
    added++;
    console.log(`  ✓ ${a.title.substring(0, 60)}`);
  }

  console.log(`\n✅ Done! ${added} articles added, ${skipped} skipped.\n`);
}

main().catch(err => { console.error(err.message); process.exit(1); }).finally(() => prisma.$disconnect());
