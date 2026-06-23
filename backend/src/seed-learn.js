require('dotenv').config();
const prisma = require('./utils/prisma');

const ARTICLES = [
  {
    title: 'How DNA Evidence Revolutionized Criminal Investigation',
    slug: 'how-dna-evidence-works',
    category: 'crime-techniques',
    summary: 'From the first DNA conviction in 1986 to genealogical DNA catching the Golden State Killer in 2018 — how genetic science transformed justice.',
    coverImage: 'http://localhost:5000/api/imgproxy?url=' + encodeURIComponent('https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&h=450&fit=crop&auto=format&q=80'),
    tags: 'DNA,forensics,evidence,crime-lab',
    featured: true,
    content: `DNA evidence is the single most powerful tool in modern forensic science. Since the first criminal conviction using DNA evidence in 1986 — when Colin Pitchfork was convicted in England of two murders — it has exonerated hundreds of wrongly convicted people and solved thousands of cold cases.

HOW DNA PROFILING WORKS
Every human cell contains DNA — a chemical code unique to each individual (except identical twins). Forensic scientists can extract DNA from blood, saliva, semen, skin cells, hair roots, and even sweat. They then amplify specific regions of the DNA using a technique called PCR (Polymerase Chain Reaction) and create a "DNA profile" — a series of numbers representing the sizes of specific DNA fragments.

This profile is then compared against a known reference sample or a database like CODIS (Combined DNA Index System) in the US, which holds over 20 million profiles.

SHORT TANDEM REPEATS (STR)
Modern DNA profiling uses 20 specific locations on the genome called Short Tandem Repeats. The probability of two unrelated people having the same STR profile at all 20 locations is approximately 1 in a quadrillion — making it virtually conclusive.

TOUCH DNA
A major advance in the 2000s was "touch DNA" — extracting genetic material from surfaces a person merely touched, such as a doorknob, steering wheel, or piece of clothing. This was used in the JonBenét Ramsey case, where unknown male touch DNA was found on her clothing in 2008, exonerating her parents.

GENEALOGICAL DNA — THE GAME CHANGER
The most revolutionary development came in 2018 when investigators caught the Golden State Killer using public genealogy databases. They uploaded the crime scene DNA to GEDmatch — a site where millions of people upload consumer DNA test results to find relatives. They found partial matches from the killer's relatives, built a family tree, and narrowed it down to Joseph James DeAngelo, then 72 years old. A discarded tissue confirmed the match.

This technique — forensic genetic genealogy — has since solved over 300 cold cases.

LIMITATIONS
DNA evidence is not infallible. Laboratory contamination can introduce false profiles. Transfer DNA (where DNA moves from one surface to another without direct contact) can mislead investigators. Poor chain of custody can render evidence inadmissible. And in cases where only a partial profile is recovered, statistical certainty drops significantly.

THE INNOCENCE PROJECT
Since 1992, the Innocence Project has used DNA to exonerate 375 wrongfully convicted people in the US, including 21 who were on death row. In many cases, the real perpetrator was identified through the same DNA evidence.`,
  },
  {
    title: 'Criminal Profiling: How Investigators Build a Suspect Picture',
    slug: 'criminal-profiling-explained',
    category: 'profiling',
    summary: 'How the FBI\'s Behavioral Analysis Unit and criminal psychologists use crime scene evidence to narrow down suspects — and where profiling falls short.',
    coverImage: 'http://localhost:5000/api/imgproxy?url=' + encodeURIComponent('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=450&fit=crop&auto=format&q=80'),
    tags: 'profiling,FBI,BAU,psychology,investigation',
    featured: true,
    content: `Criminal profiling — formally called Criminal Investigative Analysis — is the process of using evidence from a crime scene to infer characteristics of the offender. It was popularized by the FBI's Behavioral Science Unit (now the Behavioral Analysis Unit) in the 1970s, largely through the work of agents like John Douglas and Robert Ressler, who interviewed over 30 convicted serial killers including Ted Bundy, Charles Manson, and John Wayne Gacy.

THE ORGANIZED vs DISORGANIZED MODEL
The earliest and most influential profiling framework divided offenders into two categories:

ORGANIZED offenders plan their crimes in advance, bring their own tools (weapons, restraints), select victims deliberately, control the scene, and remove evidence. They tend to be of above-average intelligence, employed, and socially functional. Ted Bundy, the BTK Killer, and the Zodiac Killer were all highly organized.

DISORGANIZED offenders act impulsively, leave the crime scene chaotic, leave behind evidence, and typically live close to their crimes. They often have lower intelligence, poor social skills, and unstable employment. Ed Gein fit this profile.

VICTIMOLOGY
One of the most important profiling tools is victimology — the study of the victim. Who was targeted? What were their habits? Where did they go? What made them vulnerable? If a killer targets sex workers, the profile shifts toward someone who objectifies women and frequents areas where sex workers operate. If victims are chosen at random across a wide geography, the profile shifts to someone with a car, a job that requires travel, and comfort in new environments.

CRIME SCENE STAGING
Profilers look for evidence of staging — when a scene has been deliberately arranged to mislead investigators. A body posed in a degrading position suggests a power-oriented offender. A staged robbery may indicate the killer knew the victim personally and wanted to misdirect police.

GEOGRAPHIC PROFILING
Developed by criminologist Kim Rossmo, geographic profiling analyzes the spatial pattern of linked crimes to identify the most probable area of an offender's home or base. The mathematical model assumes offenders operate in a "comfort zone" around familiar territory but avoid crimes too close to home. This technique was used to narrow the search area for serial killers including the Yorkshire Ripper and several highway killers.

LIMITATIONS AND CRITICISM
Profiling is an investigative tool, not evidence. Studies have found that professional profilers are only marginally more accurate than trained detectives or psychologists in predicting offender characteristics. The "organized/disorganized" binary has been criticized as overly simplistic — most offenders show elements of both. And there are high-profile failures: the original profile for the BTK Killer suggested a younger, socially isolated man — not the church president Dennis Rader.

The value of profiling is not in solving cases but in prioritizing leads, suggesting investigative directions, and understanding offender motivation.`,
  },
  {
    title: 'How Detectives Investigate a Homicide: Step by Step',
    slug: 'how-homicide-investigation-works',
    category: 'investigation',
    summary: 'From securing the scene to building a court-ready case — the full process detectives follow when investigating a murder.',
    coverImage: 'http://localhost:5000/api/imgproxy?url=' + encodeURIComponent('https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=800&h=450&fit=crop&auto=format&q=80'),
    tags: 'homicide,investigation,detective,procedure,forensics',
    featured: false,
    content: `When a body is discovered, a precise and legally mandated sequence of events begins. Every step matters — not just for solving the crime, but for ensuring any prosecution holds up in court.

STEP 1: SECURE THE SCENE
The first officers on scene establish a perimeter. This prevents contamination — the introduction of foreign evidence or destruction of existing evidence. The larger the initial perimeter, the better; it can always be reduced. A crime scene log is started, recording everyone who enters and exits.

STEP 2: THE WALKTHROUGH
The lead homicide detective does an initial walkthrough without touching anything. The goal is to form a preliminary theory: Where did the victim die? Where was the body found? Are these the same location? What is the apparent cause of death? Are there signs of a struggle? Signs of staging?

STEP 3: DOCUMENTATION
Before anything is moved, the scene is thoroughly documented through photography, videography, and sketches. Measurements are taken. Evidence is numbered and photographed in place. This documentation is what the jury will see — the crime scene as it was found.

STEP 4: EVIDENCE COLLECTION
Forensic technicians collect physical evidence: fingerprints (latent prints lifted with powder or chemicals), biological samples (blood, DNA), trace evidence (fibers, hair, glass fragments), digital evidence (phones, computers), and anything else relevant. Each item is bagged, labeled, and logged into a chain of custody that will follow it to the courtroom.

STEP 5: THE POSTMORTEM
The medical examiner conducts an autopsy to determine: cause of death (what killed them), manner of death (homicide, suicide, accident, natural, or undetermined), time of death (estimated using body temperature, rigor mortis, lividity), and any other relevant findings (defensive wounds, toxicology, sexual assault).

STEP 6: CANVASSING
Detectives interview everyone in the area. Neighbors, passersby, local business owners. They pull CCTV footage from surrounding areas. They look for the victim's last known movements and try to construct a timeline.

STEP 7: THE VICTIM'S LIFE
Victimology: who was this person? Who did they know? Were there enemies, financial disputes, a troubled relationship? Detectives obtain phone records, bank records, social media, and interview family, friends, coworkers, and ex-partners.

STEP 8: DEVELOPING SUSPECTS
Using everything gathered, detectives build a list of persons of interest and begin eliminating them through alibis, physical evidence, and interrogation. The case file grows. Dead ends are documented. Every lead is followed.

STEP 9: THE INTERROGATION
When a suspect is identified, detectives use established interrogation techniques. The Reid Technique (widely used but increasingly criticized) involves nine steps aimed at gaining a confession. The PEACE model (used in the UK) focuses on information gathering rather than confession. Every interrogation is recorded.

STEP 10: BUILDING THE CASE FILE
Before charges are filed, the detective and prosecutor review everything. Can they prove beyond reasonable doubt? What physical evidence ties the suspect to the scene? What is the motive? What is the opportunity? Can witnesses be corroborated? The strength of the case determines whether charges are filed.`,
  },
  {
    title: 'Understanding Forensic Evidence: From Crime Lab to Courtroom',
    slug: 'forensic-evidence-explained',
    category: 'evidence',
    summary: 'Fingerprints, ballistics, toxicology, digital forensics — a complete guide to the types of forensic evidence and how they are used in court.',
    coverImage: 'http://localhost:5000/api/imgproxy?url=' + encodeURIComponent('https://images.unsplash.com/photo-1584824486509-112e4181ff6b?w=800&h=450&fit=crop&auto=format&q=80'),
    tags: 'forensics,fingerprints,ballistics,toxicology,evidence',
    featured: false,
    content: `Forensic science encompasses dozens of disciplines, each providing a different type of evidence. Here is a complete breakdown of the major types and how they function in criminal investigations.

FINGERPRINT EVIDENCE
Every person has unique fingerprint patterns formed before birth. Three types of prints exist at crime scenes: latent prints (invisible, require development), patent prints (visible, left in substances like blood or grease), and plastic prints (three-dimensional impressions in soft materials). Fingerprints are compared against databases like AFIS (Automated Fingerprint Identification System). A fingerprint examiner identifies "minutiae" — specific ridge features — and requires a minimum number of matching points for identification.

BALLISTICS
Firearms examination involves analyzing bullets and cartridge cases to determine what weapon fired them. Every gun barrel has unique microscopic striations that transfer to a bullet as it travels through. Cartridge cases show marks from the firing pin, extractor, and ejector. These marks can link a bullet to a specific weapon. Gunshot residue (GSR) — microscopic particles containing lead, barium, and antimony — can be found on hands, clothing, and surfaces near a fired weapon.

TOXICOLOGY
Forensic toxicology identifies and quantifies drugs, poisons, and other substances in biological samples (blood, urine, hair, tissue). It can determine: what substances were in someone's system at time of death, whether drugs contributed to death, whether someone was incapacitated, and in hair samples, a timeline of drug use going back months.

DIGITAL FORENSICS
Modern investigations are as much digital as physical. Digital forensics recovers deleted files, internet browsing history, GPS location data, call records, and metadata from devices. Phone data — particularly location history — has become crucial in placing suspects at crime scenes. Encrypted data presents ongoing challenges; the FBI vs. Apple dispute over the San Bernardino shooter's iPhone highlighted the tension between privacy and investigation.

BLOOD SPATTER ANALYSIS
Bloodstain Pattern Analysis (BPA) examines the size, shape, and distribution of bloodstains to reconstruct what happened. Spatter patterns indicate direction of travel (elongated stains show angle), impact velocity (small fine drops suggest high-velocity impact), and the sequence of events. However, BPA has faced criticism: a 2009 National Academy of Sciences report found it lacked sufficient scientific validation, and several convictions based solely on BPA have been overturned.

FIBER AND TRACE EVIDENCE
Microscopic fibers, hair, glass fragments, soil particles, and pollen can link a suspect to a scene. Wayne Williams, the Atlanta Child Murders killer, was partly convicted on carpet fiber evidence. Cross-transfer — where fibers from a victim transfer to a killer and vice versa — is a powerful linking mechanism but requires expert testimony on the rarity of the fiber type.

CHAIN OF CUSTODY
All forensic evidence must be accompanied by an unbroken chain of custody — a documented record of who collected it, how it was stored, who examined it, and how it reached the laboratory. Any gap in this chain can render evidence inadmissible or at minimum create doubt for a jury.`,
  },
  {
    title: 'How Criminal Trials Work: From Arrest to Verdict',
    slug: 'how-criminal-trials-work',
    category: 'legal',
    summary: 'A complete guide to the criminal justice process — from the moment of arrest through arraignment, discovery, trial, and sentencing.',
    coverImage: 'http://localhost:5000/api/imgproxy?url=' + encodeURIComponent('https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?w=800&h=450&fit=crop&auto=format&q=80'),
    tags: 'law,trial,court,legal,justice,procedure',
    featured: true,
    content: `The criminal justice system is a complex sequence of procedures designed to balance the state's interest in punishing crime against the individual's constitutional rights. Here is how it works from beginning to end.

THE ARREST
Police may arrest someone if they have probable cause — reasonable belief that the person committed a crime. An arrest can happen with or without a warrant. Upon arrest, the suspect must be read their Miranda rights: the right to remain silent, the right to an attorney, and the warning that anything said can be used against them.

BOOKING AND BAIL
The suspect is booked — photographed, fingerprinted, and formally charged. A bail hearing determines whether the suspect can be released pending trial and at what cost. Bail can be denied if the suspect is considered a flight risk or danger to the community.

THE GRAND JURY (FELONIES)
In serious felony cases, the prosecution presents evidence to a grand jury of 16–23 citizens who decide whether there is probable cause to proceed to trial. Grand jury proceedings are secret. The defense does not participate. If the grand jury agrees, they return an "indictment."

ARRAIGNMENT
The defendant appears in court, hears the formal charges, and enters a plea: guilty, not guilty, or no contest (nolo contendere). Most defendants initially plead not guilty.

DISCOVERY
Both sides exchange evidence. The prosecution must share all evidence with the defense — including exculpatory evidence that might prove innocence (Brady material). Failure to disclose such evidence is a serious violation that can lead to a case being dismissed.

PLEA BARGAINING
Over 90% of criminal cases in the US are resolved through plea bargains — the defendant pleads guilty to a lesser charge or receives a reduced sentence in exchange for avoiding trial. Plea bargains save the system enormous time and resources but are criticized for pressuring innocent people to plead guilty.

THE TRIAL
Trials begin with jury selection (voir dire). Both sides give opening statements. The prosecution presents its case first, calling witnesses and introducing evidence. The defense cross-examines each witness. Then the defense presents its case. Closing arguments follow. The judge instructs the jury on the relevant law.

STANDARD OF PROOF
In a criminal trial, the prosecution must prove guilt "beyond a reasonable doubt" — the highest standard in law. This does not mean absolute certainty but means the evidence leaves no reasonable doubt in the mind of a rational person.

THE VERDICT AND SENTENCING
The jury deliberates in private. In most US jurisdictions, a guilty verdict must be unanimous. If the jury cannot reach a verdict, a mistrial is declared and the case can be retried. If guilty, the judge sentences the defendant within statutory guidelines. The defense may argue for leniency; the prosecution for severity. Victims and their families may deliver impact statements.

APPEALS
A convicted defendant may appeal the verdict or sentence on legal grounds — not because the jury got it wrong, but because of procedural errors, constitutional violations, or newly discovered evidence. The appeals process can take years or even decades.`,
  },
  {
    title: 'The Psychology of Serial Killers: Why They Kill',
    slug: 'psychology-of-serial-killers',
    category: 'profiling',
    summary: 'What drives a person to kill repeatedly? Examining the psychological, neurological, and developmental factors behind serial murder.',
    coverImage: 'http://localhost:5000/api/imgproxy?url=' + encodeURIComponent('https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800&h=450&fit=crop&auto=format&q=80'),
    tags: 'psychology,serial-killers,criminology,motivation,antisocial',
    featured: true,
    content: `The question everyone asks about serial killers is the same: why? What converts a human being into someone who kills repeatedly, often with pleasure? The answer is complex, multifactorial, and still not fully understood — but decades of research, interviews, and neurological study have produced a clearer picture.

THE FBI DEFINITION
The FBI defines a serial killer as someone who commits two or more murders in separate events with a "cooling off" period between killings. This distinguishes serial murder from mass murder (multiple victims in one event) and spree killing (multiple events without cooling off).

THE MACDONALD TRIAD — AND WHY IT'S LARGELY WRONG
The classic "serial killer warning signs" — bedwetting, fire-setting, and animal cruelty — was proposed by John Macdonald in 1963. It became enormously influential. It is also mostly unsupported by evidence. While many serial killers reported childhood animal cruelty, the triad as a predictive tool has poor sensitivity and specificity. Most people who exhibit these behaviors do not become killers.

CHILDHOOD TRAUMA
What the research consistently shows is that most serial killers experienced severe childhood trauma: physical abuse, sexual abuse, neglect, witnessing domestic violence, or emotional abandonment. Ed Gein, John Wayne Gacy, Dennis Rader, and Jeffrey Dahmer all had profoundly troubled childhoods. This trauma does not cause serial murder — many people with terrible childhoods never harm anyone — but it creates vulnerability, particularly when combined with other factors.

ANTISOCIAL PERSONALITY DISORDER AND PSYCHOPATHY
Many serial killers meet clinical criteria for antisocial personality disorder (ASPD) — a pervasive pattern of disregard for others' rights. A subset of this group are psychopaths: individuals with an inability to feel empathy, guilt, or remorse. Research using fMRI brain imaging has found structural and functional differences in the prefrontal cortex and amygdala of psychopaths — regions involved in emotion processing and impulse control.

THE ROLE OF FANTASY
A consistent finding across serial killer interviews is the primacy of violent fantasy. Long before the first killing, the future killer develops detailed, elaborate fantasies about controlling, hurting, or killing others. These fantasies are rehearsed obsessively, becoming more specific and more satisfying over time. The first murder is often described as an attempt to actualize the fantasy — frequently followed by disappointment that reality didn't match the imagined experience, driving them to try again.

TYPOLOGIES
Researchers have identified several motivation-based types:
HEDONISTIC killers murder for personal gain (financial, sexual pleasure, or comfort — avoiding emotional distress).
POWER/CONTROL killers are motivated by domination and control over their victims.
VISIONARY killers believe they are commanded by voices or visions.
MISSION-ORIENTED killers target a specific group they believe should be eliminated.

Most serial killers are power/control or hedonistic-lust motivated.

THE COOLING OFF PERIOD
Unlike mass shooters or spree killers, serial killers can function normally between murders. Ted Bundy attended law school. Dennis Rader was a church president. John Wayne Gacy ran a successful business. This compartmentalization — the ability to maintain a normal life while harboring murderous compulsions — makes serial killers both harder to identify and more frightening.`,
  },
];

const QUIZZES = [
  {
    title: 'Famous Murders: Do You Know Your Cases?',
    description: 'Test your knowledge of 10 of the most famous murder cases in history.',
    difficulty: 'medium',
    coverImage: 'http://localhost:5000/api/imgproxy?url=' + encodeURIComponent('https://images.unsplash.com/photo-1587474260584-136574b1e43a?w=800&h=450&fit=crop&auto=format&q=80'),
    questions: [
      { question: 'Jeffrey Dahmer was known as the Milwaukee Monster. How many victims did he confess to?', options: ['11','17','22','30'], answer: 1, explanation: 'Dahmer confessed to 17 murders committed between 1978 and 1991.' },
      { question: 'Which weapon did the Zodiac Killer use in his confirmed first two murders in December 1968?', options: ['Knife','Shotgun','.22 pistol','Crossbow'], answer: 2, explanation: 'A .22 caliber pistol was used to kill Betty Lou Jensen and David Faraday on December 20, 1968.' },
      { question: 'What was the name of Ted Bundy\'s car that became famous during his crimes?', options: ['Red Ford Mustang','Tan Volkswagen Beetle','Black Pontiac','Blue Chevrolet'], answer: 1, explanation: 'Bundy drove a tan Volkswagen Beetle which he used to lure victims.' },
      { question: 'The Golden State Killer was caught using which revolutionary technique?', options: ['Traditional fingerprints','CCTV footage','Genealogical DNA','Jailhouse informant'], answer: 2, explanation: 'Investigators uploaded crime scene DNA to GEDmatch genealogy website and traced the killer through his relatives\' DNA profiles.' },
      { question: 'How many of the BTK Killer\'s victims were murdered in his first attack in 1974?', options: ['1','2','3','4'], answer: 3, explanation: 'Dennis Rader killed four members of the Otero family in his first attack on January 15, 1974.' },
      { question: 'Which serial killer was caught after asking police whether floppy disks could be traced?', options: ['Ted Bundy','John Wayne Gacy','Dennis Rader (BTK)','Gary Ridgway'], answer: 2, explanation: 'BTK killer Dennis Rader asked police if a floppy disk could be traced. Police said no. The metadata on the disk led directly to him.' },
      { question: 'How many confirmed murders did Gary Ridgway (Green River Killer) plead guilty to?', options: ['22','33','49','71'], answer: 2, explanation: 'Ridgway pleaded guilty to 49 murders — the most in US history by confirmed count.' },
      { question: 'Charles Manson personally committed which of the Tate-LaBianca murders?', options: ['All of them','Sharon Tate\'s murder','The LaBianca murders','None — he directed others'], answer: 3, explanation: 'Manson did not personally kill anyone. He directed followers to commit the murders and was convicted under conspiracy law.' },
      { question: 'Which famous serial killer inspired the characters of Norman Bates, Leatherface, AND Buffalo Bill?', options: ['Ted Bundy','Ed Gein','Albert Fish','H.H. Holmes'], answer: 1, explanation: 'Ed Gein\'s crimes inspired three separate horror icons across Psycho, Texas Chainsaw Massacre, and Silence of the Lambs.' },
      { question: 'The Black Dahlia victim, Elizabeth Short, was found with her body in what condition?', options: ['Drowned','Shot twice','Bisected at the waist','Burned'], answer: 2, explanation: 'Elizabeth Short\'s body was found surgically bisected at the waist, completely drained of blood, and carefully arranged.' },
    ]
  },
  {
    title: 'World\'s Darkest Events: Genocide & Atrocity Quiz',
    description: 'A difficult quiz on historical genocides and mass atrocities.',
    difficulty: 'hard',
    coverImage: 'http://localhost:5000/api/imgproxy?url=' + encodeURIComponent('https://images.unsplash.com/photo-1482235225082-9e0c51b47571?w=800&h=450&fit=crop&auto=format&q=80'),
    questions: [
      { question: 'How many people were killed in the Rwandan Genocide of 1994?', options: ['50,000–100,000','200,000–300,000','500,000–800,000','1–2 million'], answer: 2, explanation: 'Approximately 500,000 to 800,000 people were killed in roughly 100 days — about 70% of Rwanda\'s Tutsi population.' },
      { question: 'What was the name of the conference where the Nazis formally planned the Holocaust?', options: ['Munich Conference','Potsdam Conference','Wannsee Conference','Berlin Conference'], answer: 2, explanation: 'The Wannsee Conference on January 20, 1942 formalized the "Final Solution to the Jewish Question."' },
      { question: 'The Khmer Rouge under Pol Pot killed roughly what percentage of Cambodia\'s entire population?', options: ['5%','10%','25%','40%'], answer: 2, explanation: 'An estimated 25% of Cambodia\'s entire population — roughly 1.5 to 2 million people — died under the Khmer Rouge.' },
      { question: 'What radio station broadcast the names and locations of Tutsi targets during the Rwandan Genocide?', options: ['Radio Kigali','RTLM (Radio Mille Collines)','RFI Rwanda','Radio Rwanda'], answer: 1, explanation: 'RTLM (Radio Télévision Libre des Mille Collines) called Tutsi people "inyenzi" (cockroaches) and broadcast kill lists.' },
      { question: 'How many Bosniak men and boys were killed at Srebrenica in July 1995?', options: ['800','2,000','5,000','8,000+'], answer: 3, explanation: 'Over 8,000 Bosniak Muslim men and boys were executed in 11 days at Srebrenica — Europe\'s worst atrocity since WWII.' },
      { question: 'What was "Year Zero" as declared by the Khmer Rouge?', options: ['The year all foreigners were expelled','The year currency was abolished and history was erased','The year of Pol Pot\'s death','The start of the civil war'], answer: 1, explanation: 'Pol Pot declared 1975 as Year Zero — all history, currency, education, and religion were to be abolished.' },
      { question: 'General Roméo Dallaire warned the UN about the planned Rwandan Genocide via what method?', options: ['Public press conference','Radio broadcast','A classified fax in January 1994','Personal meeting with the Secretary-General'], answer: 2, explanation: 'Dallaire sent the now-famous "Genocide Fax" to the UN in January 1994. It was ignored.' },
      { question: 'How many people were killed at Jonestown on November 18, 1978?', options: ['318','618','918','1,218'], answer: 2, explanation: '918 people died at Jonestown — the largest loss of American civilian life until 9/11.' },
    ]
  },
  {
    title: 'Cold Cases & Mysteries: The Unsolved Quiz',
    description: 'How much do you know about history\'s most famous unsolved cases?',
    difficulty: 'easy',
    coverImage: 'http://localhost:5000/api/imgproxy?url=' + encodeURIComponent('https://images.unsplash.com/photo-1477346611705-65d1883cee1e?w=800&h=450&fit=crop&auto=format&q=80'),
    questions: [
      { question: 'In what year did Madeleine McCann disappear from Praia da Luz, Portugal?', options: ['2003','2005','2007','2009'], answer: 2, explanation: 'Madeleine McCann disappeared on May 3, 2007, from apartment 5A of the Ocean Club resort.' },
      { question: 'D.B. Cooper hijacked a plane and parachuted with how much ransom money?', options: ['$100,000','$200,000','$500,000','$1 million'], answer: 1, explanation: 'Cooper demanded and received $200,000 in unmarked $20 bills before parachuting over the Pacific Northwest.' },
      { question: 'What was found in February 1980 that confirmed D.B. Cooper\'s ransom money?', options: ['His parachute','A partial bundle of $20 bills in the Columbia River','His fingerprints on the plane','A note in Oregon'], answer: 1, explanation: 'A young boy found a rotting partial bundle of the ransom $20 bills in a Columbia River sandbar in 1980.' },
      { question: 'How old was JonBenét Ramsey when she was murdered?', options: ['4','6','8','10'], answer: 1, explanation: 'JonBenét was 6 years old when she was found murdered in the basement of her family\'s Boulder, Colorado home.' },
      { question: 'The Zodiac Killer sent how many encrypted ciphers to newspapers?', options: ['2','4','6','8'], answer: 1, explanation: 'The Zodiac sent 4 ciphers. The Z408 was cracked in 1969; the Z340 was solved in 2020; Z13 and Z32 remain unsolved.' },
      { question: 'In what year was the Z340 Zodiac cipher finally solved?', options: ['1999','2010','2020','2023'], answer: 2, explanation: 'The Z340 cipher was cracked in December 2020 by a team of amateur codebreakers using computer software after 51 years.' },
      { question: 'What led to the identification of the Golden State Killer after 40 years?', options: ['An anonymous tip','A jailhouse confession','A genealogy website DNA match','A fingerprint match'], answer: 2, explanation: 'Investigators uploaded crime scene DNA to the public genealogy site GEDmatch, found partial matches from relatives, and traced the killer.' },
      { question: 'Amelia Earhart disappeared in what year during her round-the-world flight attempt?', options: ['1932','1935','1937','1941'], answer: 2, explanation: 'Earhart disappeared on July 2, 1937, near Howland Island in the Pacific Ocean.' },
    ]
  },
  {
    title: 'Famous Trials: Court Room Knowledge Test',
    description: 'Verdicts, defendants, and landmark moments from the most famous criminal trials.',
    difficulty: 'medium',
    coverImage: 'http://localhost:5000/api/imgproxy?url=' + encodeURIComponent('https://images.unsplash.com/photo-1589994160839-163cd867cfe8?w=800&h=450&fit=crop&auto=format&q=80'),
    questions: [
      { question: 'After how many hours of deliberation did the O.J. Simpson jury return a not guilty verdict?', options: ['2 hours','4 hours','12 hours','3 days'], answer: 1, explanation: 'The jury deliberated for just 4 hours before acquitting O.J. Simpson of both murders on October 3, 1995.' },
      { question: 'What was the famous phrase Johnnie Cochran used about the glove in O.J. Simpson\'s trial?', options: ['"If it doesn\'t fit, you must acquit"','"A glove is just a glove"','"Reasonable doubt begins here"','"The evidence speaks for itself"'], answer: 0, explanation: 'Cochran\'s iconic line — "If it doesn\'t fit, you must acquit" — referred to Simpson struggling to put on the dried, shrunken bloody glove in court.' },
      { question: 'How many years did Amanda Knox serve in Italian prison before her final acquittal?', options: ['2 years','4 years','8 years','10 years'], answer: 1, explanation: 'Knox was acquitted in 2015 after spending roughly 4 years in an Italian prison (2007–2011) before her first acquittal.' },
      { question: 'The Menendez Brothers were charged with murdering which family members?', options: ['Their sister and uncle','Their parents','Their grandparents','Their stepmother and father'], answer: 1, explanation: 'Lyle and Erik Menendez were convicted of murdering their parents — Jose and Kitty Menendez — in their Beverly Hills mansion.' },
      { question: 'What was Scott Peterson convicted of murdering?', options: ['His neighbor and her daughter','His business partner','His pregnant wife and unborn son','His ex-wife and her friend'], answer: 2, explanation: 'Scott Peterson was convicted of first-degree murder of his wife Laci (8 months pregnant) and second-degree murder of their unborn son Connor.' },
      { question: 'Who was the actual killer of Meredith Kercher in the Amanda Knox case?', options: ['Amanda Knox','Raffaele Sollecito','Rudy Guede','Patrick Lumumba'], answer: 2, explanation: 'Rudy Guede was convicted of Meredith Kercher\'s murder in a separate fast-track trial. Knox and Sollecito were definitively acquitted in 2015.' },
    ]
  },
];

async function main() {
  console.log('\n📚 Seeding Learn articles and quizzes...\n');

  // Articles
  let aAdded = 0;
  for (const a of ARTICLES) {
    const exists = await prisma.article.findFirst({ where: { slug: a.slug } });
    if (exists) continue;
    await prisma.article.create({ data: a });
    aAdded++;
    console.log(`  ✓ Article: ${a.title.substring(0, 55)}`);
  }

  // Quizzes
  let qAdded = 0;
  for (const q of QUIZZES) {
    const exists = await prisma.quiz.findFirst({ where: { title: q.title } });
    if (exists) continue;
    await prisma.quiz.create({
      data: { ...q, questions: JSON.stringify(q.questions) }
    });
    qAdded++;
    console.log(`  ✓ Quiz:    ${q.title.substring(0, 55)}`);
  }

  console.log(`\n✅ Done! ${aAdded} articles + ${qAdded} quizzes added.\n`);
}

main()
  .catch(err => { console.error('Error:', err.message); process.exit(1); })
  .finally(() => prisma.$disconnect());
