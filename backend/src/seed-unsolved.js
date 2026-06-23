require('dotenv').config();
const prisma = require('./utils/prisma');
const { getCaseImageUrl } = require('./utils/caseImage');

const PROXY = 'http://localhost:5000/api/imgproxy?url=';
const wrap = url => PROXY + encodeURIComponent(url);

const CASES = [];

CASES.push({
  title: 'The Zodiac Killer — Identity Never Revealed',
  category: 'murder', section: 'unsolved',
  location: 'San Francisco Bay Area, California, USA', date: '1968–1969',
  featured: true,
  summary: 'At least 5 confirmed murders and 2 surviving victims. Sent 20+ taunting letters and 4 encrypted ciphers to police. Identity never established despite 50+ years of investigation.',
  fullContent: `The Zodiac Killer remains one of the most infamous unidentified serial killers in American history. Operating in Northern California between 1968 and 1969, the killer shot and stabbed victims at lovers' lanes and remote locations, then taunted police and newspapers with cryptic letters and ciphers.\n\nCONFIRMED VICTIMS\n5 confirmed dead, 2 survived. First attack: December 20, 1968 — Betty Lou Jensen (16) and David Faraday (17) shot in their car in Benicia. Final confirmed murder: October 11, 1969 — San Francisco cab driver Paul Stine shot in the back of the head.\n\nWHY UNSOLVED\nPolice never obtained physical evidence tying a specific person to the killings. Top suspect Arthur Leigh Allen died in 1992; DNA from Zodiac stamps did not match Allen. The Z13 and Z32 ciphers remain unsolved and may contain the killer's identity. Over 2,500 suspects have been investigated.\n\nLATEST DEVELOPMENT\nIn 2021, the Case Breakers group claimed Gary Francis Poste was the Zodiac. Law enforcement did not accept this conclusion. The FBI and SFPD maintain open files.`,
  verdict: 'Unsolved. No charges ever filed. FBI case remains open.',
  keyFacts: JSON.stringify(['5 confirmed killed; 2 survived', '4 ciphers sent — 2 remain unsolved', '2,500+ suspects investigated over 55 years', 'Top suspect Arthur Leigh Allen died before charging', 'Z340 cipher solved in 2020 — does not contain his name', 'Last confirmed letter sent in 1974']),
  links: JSON.stringify([{ label: 'SFPD Cold Case File', url: 'https://www.sanfranciscopolice.org/your-sfpd/sfpd-mission/current-investigations', type: 'official' }, { label: 'Wikipedia — Zodiac Killer', url: 'https://en.wikipedia.org/wiki/Zodiac_Killer', type: 'article' }]),
});

CASES.push({
  title: 'The Black Dahlia — Elizabeth Short',
  category: 'murder', section: 'unsolved',
  location: 'Leimert Park, Los Angeles, California, USA', date: 'January 15, 1947',
  featured: true,
  summary: 'Aspiring actress Elizabeth Short found bisected and drained of blood in a Los Angeles park. Over 500 false confessions. Surgical precision suggested medical knowledge. Never solved.',
  fullContent: `On January 15, 1947, the nude body of 22-year-old Elizabeth Short was found in a vacant lot in Leimert Park, Los Angeles. Her body had been precisely bisected at the waist, completely drained of blood, cleaned post-mortem, and both halves arranged with eerie deliberateness. A Glasgow smile had been cut from the corners of her mouth to her ears.\n\nINVESTIGATION\nDetectives received over 500 confessions — none credible. More than 20 serious suspects were investigated including a doctor (George Hodel, named by his own son), a movie set builder, and a Cleveland Torso Murderer connection. The LAPD case file fills 146 volumes.\n\nSURGICAL KNOWLEDGE\nThe precise bisection and removal of organs suggested the killer had medical or mortuary training. The body showed signs of having been kept in cold storage. Ligature marks showed she was restrained for an extended period before death.\n\nWHY STILL UNSOLVED\nDNA technology did not exist in 1947. Physical evidence was poorly preserved by the standards of the time. Many suspects died before modern techniques could be applied. George Hodel — named by his son in 2003 — died in 1999.\n\nSTATUS: Cold case. LAPD Unsolved Unit actively receives new tips.`,
  verdict: 'Unsolved. No charges ever filed. Cold case.',
  keyFacts: JSON.stringify(['Body surgically bisected and drained of blood', 'Glasgow smile cut from corners of mouth', '500+ false confessions received', '20+ serious suspects; none charged', 'Main suspect George Hodel named by his son in 2003', 'LAPD case file spans 146 volumes']),
  links: JSON.stringify([{ label: 'Wikipedia — Black Dahlia', url: 'https://en.wikipedia.org/wiki/Black_Dahlia', type: 'article' }, { label: 'LAPD Cold Case Unit', url: 'https://www.lapdonline.org/', type: 'official' }]),
});

CASES.push({
  title: 'Jack the Ripper — Whitechapel Murders',
  category: 'murder', section: 'unsolved',
  location: 'Whitechapel, London, England, UK', date: 'August–November 1888',
  featured: true,
  summary: 'Five women murdered in Whitechapel in 1888 with surgical precision. Over 130 years of investigation. More than 100 suspects named. The most famous unsolved serial killer case in history.',
  fullContent: `Jack the Ripper killed five women in the Whitechapel district of London's East End between August 31 and November 9, 1888. All victims were sex workers. All had their throats cut. Several had their abdomens opened with apparent anatomical knowledge. The killer was never identified.\n\nCANONICAL FIVE\nMary Ann Nichols (August 31), Annie Chapman (September 8), Elizabeth Stride and Catherine Eddowes (September 30 — "Double Event"), Mary Jane Kelly (November 9 — most extensively mutilated).\n\nTHE LETTERS\nHundreds of letters claiming to be from the killer were sent to police. Most are considered hoaxes. The "Dear Boss" letter coined the name Jack the Ripper. The Lusk Letter arrived with half a preserved human kidney.\n\nDNA EVIDENCE (2014)\nIn 2014, author Russell Edwards claimed a shawl found near Catherine Eddowes' body contained DNA matching Aaron Kosminski — a Polish-Jewish barber and asylum inmate. The findings were disputed by other researchers due to questions about the shawl's chain of custody.\n\nSTATUS: Permanently cold. Metropolitan Police closed the file in 1892.`,
  verdict: 'Unsolved. Investigation closed 1892. Identity disputed by researchers ever since.',
  keyFacts: JSON.stringify(['5 canonical victims in Whitechapel, 1888', 'Surgical mutilation suggested medical knowledge', '"Dear Boss" letter coined the name Jack the Ripper', 'Lusk Letter arrived with half a human kidney', '2014 DNA claimed to link Aaron Kosminski — disputed', 'Over 100 suspects proposed in 130+ years']),
  links: JSON.stringify([{ label: 'Wikipedia — Jack the Ripper', url: 'https://en.wikipedia.org/wiki/Jack_the_Ripper', type: 'article' }, { label: 'Casebook: Jack the Ripper', url: 'https://www.casebook.org/', type: 'article' }]),
});

CASES.push({
  title: 'JonBenét Ramsey Murder',
  category: 'murder', section: 'unsolved',
  location: 'Boulder, Colorado, USA', date: 'December 25–26, 1996',
  featured: true,
  summary: 'Six-year-old beauty pageant contestant found strangled in her family\'s home on Christmas night 1996. Parents exonerated by DNA in 2008. Unknown male DNA found. No charges ever filed.',
  fullContent: `JonBenét Patricia Ramsey (aged 6) was found murdered in the basement of her family's home in Boulder, Colorado on December 26, 1996. She had been struck on the head and strangled with a garrote. A ransom note demanding $118,000 — the exact amount of her father's Christmas bonus — was found on the staircase.\n\nPARENTS AS SUSPECTS\nFor years Kate and John Ramsey were the primary suspects. In 1999, a grand jury voted to indict them for child abuse resulting in death — but the DA refused to sign the indictment, saying the evidence was insufficient.\n\nDNA BREAKTHROUGH (2008)\nIn 2008, DNA from an unknown male was found on JonBenét's clothing. Boulder DA Mary Lacy formally exonerated the Ramsey family. The DNA profile does not match anyone in CODIS.\n\nCURRENT STATUS\nBoulder Police continue to investigate. In 2023, the DA's office stated the investigation remains open with new DNA technology being applied. The unknown male's identity has never been established.\n\nThe case remains one of America's most discussed cold cases, generating books, documentaries, podcasts, and annual media coverage nearly 30 years later.`,
  verdict: 'Unsolved. Ramseys exonerated 2008. Unknown male DNA found; no match in any database.',
  keyFacts: JSON.stringify(['6-year-old victim found in her own home basement', 'Ransom note for exactly $118,000 — father\'s bonus amount', 'Garrote made from paintbrush handle found at scene', 'Grand jury indicted parents 1999 — DA refused to prosecute', 'DNA of unknown male found on clothing in 2008', 'Ramseys formally exonerated 2008', 'Patsy Ramsey died 2006 without resolution']),
  links: JSON.stringify([{ label: 'Wikipedia — JonBenét Ramsey', url: 'https://en.wikipedia.org/wiki/JonBen%C3%A9t_Ramsey', type: 'article' }, { label: 'Boulder Police Department Cold Case', url: 'https://www.bouldercolorado.gov/police', type: 'official' }]),
});

CASES.push({
  title: 'The Long Island Serial Killer (LISK)',
  category: 'murder', section: 'unsolved',
  location: 'Long Island, New York, USA', date: '1996–2010s',
  featured: false,
  summary: 'At least 10 bodies found along Ocean Parkway on Long Island. Mostly female escorts. Suspected serial killer known as LISK. Rex Heuermann arrested 2023 — trial pending.',
  fullContent: `Between December 2010 and April 2011, the skeletal remains of at least 10 people were found along Ocean Parkway on Gilgo Beach, Long Island. Most victims were women who had advertised escort services on Craigslist. The investigation began when Shannan Gilbert, 24, disappeared in May 2010 after fleeing a client's home and calling 911.\n\nVICTIMS\nAt least 10 confirmed victims. Four were grouped together and nicknamed the "Gilgo Four": Melissa Barthelemy, Megan Waterman, Amber Lynn Costello, and Maureen Brainard-Barnes. Additional remains found later included a toddler and a man.\n\nREX HEUERMANN — ARRESTED 2023\nIn July 2023, Rex Heuermann — a 59-year-old New York architect — was arrested and charged with three of the murders. DNA from pizza boxes and hair recovered from crime scenes linked him. Investigators found thousands of images of bound women on his devices and evidence he had surveilled victims' families.\n\nSTATUS: Trial pending. Heuermann charged with 3 murders but investigators believe he is responsible for all Gilgo Beach deaths. Case remains technically unsolved pending verdict.`,
  verdict: 'Partially solved — Rex Heuermann arrested 2023 for 3 murders. Trial pending. Full scope unknown.',
  keyFacts: JSON.stringify(['10+ bodies found along Ocean Parkway 2010–2011', 'Most victims were female Craigslist escorts', 'Shannan Gilbert\'s disappearance triggered the discovery', 'Rex Heuermann (architect) arrested July 2023', 'DNA from pizza boxes linked him to victims', 'Thousands of images of bound women found on his devices', 'Trial pending as of 2024']),
  links: JSON.stringify([{ label: 'Wikipedia — LISK', url: 'https://en.wikipedia.org/wiki/Long_Island_serial_killer', type: 'article' }, { label: 'NYT — Rex Heuermann Coverage', url: 'https://www.nytimes.com/topic/organization/long-island-serial-killer', type: 'news' }]),
});

CASES.push({
  title: 'The Monster of Florence',
  category: 'murder', section: 'unsolved',
  location: 'Florence, Tuscany, Italy', date: '1968–1985',
  featured: false,
  summary: 'Italy\'s most infamous serial killer murdered 16 people in 8 double murders near Florence over 17 years. Same .22 Beretta used each time. True identity never legally established.',
  fullContent: `Between 1968 and 1985, an unidentified killer murdered 16 people in 8 double murders near Florence, Italy. The killer targeted couples in parked cars in secluded areas at night, shooting the male first and then mutilating the female victim's body with what appeared to be surgical or anatomical knowledge.\n\nTHE SAME WEAPON\nThe same .22 caliber Beretta pistol — identified by distinctive marks on casings — was used in all 8 attacks across 17 years. This definitively linked the crimes to a single perpetrator.\n\nFAILED PROSECUTIONS\nPietro Pacciani was convicted in 1994 but acquitted on appeal in 1996. He died before retrial. His alleged accomplices were tried but acquitted. Author Douglas Preston and Italian journalist Mario Spezi were themselves investigated by prosecutors — Preston was briefly detained.\n\nDOUGLAS PRESTON CONNECTION\nPreston's 2008 book The Monster of Florence details his research into the case and his own investigation that led to him becoming a suspect. The case inspired Thomas Harris when writing Hannibal.\n\nSTATUS: Officially unsolved. No definitive identification has ever been made.`,
  verdict: 'Unsolved. Multiple wrong convictions and acquittals. True identity never legally established.',
  keyFacts: JSON.stringify(['16 victims across 8 double murders 1968–1985', 'Same .22 Beretta used in every attack', 'Victims always couples in parked cars at night', 'Pietro Pacciani convicted then acquitted before death', 'Douglas Preston investigated as suspect by Italian prosecutors', 'Inspired Hannibal Lecter\'s Hannibal']),
  links: JSON.stringify([{ label: 'Wikipedia — Monster of Florence', url: 'https://en.wikipedia.org/wiki/Monster_of_Florence', type: 'article' }, { label: 'Book: The Monster of Florence — Douglas Preston', url: 'https://www.goodreads.com/book/show/5872195', type: 'book' }]),
});

CASES.push({
  title: 'The Smiley Face Killers',
  category: 'murder', section: 'unsolved',
  location: 'United States — Multiple Cities', date: '1997–present',
  featured: false,
  summary: 'Retired NYPD detectives claim 200+ young college men drowned under suspicious circumstances across the US since 1997, with smiley face graffiti found near entry points. FBI dismisses the theory.',
  fullContent: `The Smiley Face Murder Theory was proposed in 1997 by retired NYPD detectives Kevin Gannon and Anthony Duarte. They allege that hundreds of young college men — typically intelligent, athletic, white males who disappear after nights out and are found drowned weeks later — were murdered by an organized group.\n\nPATTERN\nIn most cases: victim attends a social event, becomes separated from friends, disappears, body is found in nearby water weeks later. Smiley face graffiti — and in some cases other specific symbols — are found near the water entry point. Victims show no signs of struggle. Toxicology is often inconclusive.\n\nFBI POSITION\nThe FBI reviewed the theory in 2008 and concluded the deaths were consistent with accidental drowning in intoxicated individuals, that the smiley face graffiti was coincidental, and that there was no evidence of a coordinated perpetrator.\n\nFAMILIES\nDozens of victim families have rejected the accidental drowning conclusion. Many commissioned independent autopsies that found evidence inconsistent with simple drowning. The debate continues.\n\nSTATUS: No suspects. No arrests. FBI considers cases accidental. Detectives maintain homicide theory.`,
  verdict: 'Disputed. FBI: accidental drowning. Gannon/Duarte: serial homicide. No arrests.',
  keyFacts: JSON.stringify(['200+ young men found drowned after nights out across US', 'Smiley face graffiti at water entry points in many cases', 'Victims: typically athletic, white male college students', 'FBI dismissed theory in 2008', 'Independent autopsies found inconsistencies', 'No suspects ever identified or arrested']),
  links: JSON.stringify([{ label: 'Wikipedia — Smiley Face Murders', url: 'https://en.wikipedia.org/wiki/Smiley_face_murders', type: 'article' }]),
});

CASES.push({
  title: 'The Zodiac — Z13 and Z32 Ciphers Remain Unsolved',
  category: 'murder', section: 'unsolved',
  location: 'San Francisco Bay Area, California, USA', date: '1969–1970',
  featured: false,
  summary: 'Two of the Zodiac Killer\'s four ciphers — Z13 (13 characters) and Z32 (32 characters) — remain completely unsolved 55+ years later. The killer claimed they contained his identity.',
  fullContent: `The Zodiac Killer sent four encrypted ciphers to newspapers. Two have been solved:\n\nZ408 — Solved in 8 days in 1969 by schoolteacher Donald Harden and wife Bettye. Contained: "I like killing people because it is so much fun it is more fun than killing wild game in the forrest because man is the most dangeroue anamal of all..."\n\nZ340 — Solved in December 2020 after 51 years by a team of amateur codebreakers using computer algorithms. Contained: "I hope you are having lots of fun in trying to catch me that wasnt me on the tv show which brought out a lott of people looking for me so i shall change the way collecting of slaves i shall no longer announce to anyone when i commite my murders they shall look like routine robberies killings of anger and so forth..."\n\nSTILL UNSOLVED: Z13 AND Z32\nZ13 (sent April 20, 1970): Only 13 characters. The Zodiac claimed: "My name is ___". Most cryptographers believe this is too short to solve without knowing the cipher key. Hundreds of solutions have been proposed; none accepted.\n\nZ32 (sent April 20, 1970): 32 characters. Claimed to be directions to a bomb. No agreed solution.\n\nSTATUS: Active research continues globally. Annual conferences dedicated to solving them. NSA cryptographers have reportedly attempted solutions.`,
  verdict: 'Unsolved — Z13 and Z32 remain active challenges for cryptographers worldwide.',
  keyFacts: JSON.stringify(['Z408 solved in 1969 — 8 days', 'Z340 solved in 2020 — 51 years', 'Z13 (13 chars): "My name is ___" — unsolved', 'Z32 (32 chars): claimed bomb directions — unsolved', 'NSA reportedly attempted Z13 solution', 'Hundreds of proposed solutions — none accepted']),
  links: JSON.stringify([{ label: 'Wikipedia — Zodiac Killer Ciphers', url: 'https://en.wikipedia.org/wiki/Zodiac_Killer_ciphers_and_letters', type: 'article' }]),
});

CASES.push({
  title: 'The Axeman of New Orleans',
  category: 'murder', section: 'unsolved',
  location: 'New Orleans, Louisiana, USA', date: '1918–1919',
  featured: false,
  summary: 'A serial killer attacked at least 12 New Orleans residents with an axe between 1918 and 1919, demanded jazz music be played, and then vanished. Never identified.',
  fullContent: `Between May 1918 and October 1919, an unknown killer attacked at least 12 people (killing 6) in New Orleans, typically entering through chiselled-out door panels in the early morning hours and attacking sleeping victims with the family's own axe, then leaving it at the scene.\n\nTHE JAZZ LETTER\nOn March 13, 1919, a letter published in New Orleans newspapers claimed to be from the Axeman. It stated: "I am not a human being, but a spirit and a fell demon from the hottest hell. I am what you Orleanians and your foolish police call the Axeman... I am very fond of jazz music, and I swear by all the devils in the nether regions that every person shall be spared in whose home a jazz band is in full swing at the time I make my rounds."\n\nThe following Tuesday, March 19 — St. Joseph's Night — every jazz club in New Orleans was packed and every home reportedly played jazz. There were no attacks.\n\nSUSPECTS\nJoseph Mumfre — an ex-convict killed by the widow of one victim in December 1920 — was a leading suspect. Mrs. Pepitone, whose husband was killed, shot Mumfre in Los Angeles and claimed he was the Axeman. She served a short prison sentence.\n\nSTATUS: Cold case. Identity never established.`,
  verdict: 'Unsolved cold case. Joseph Mumfre suspected but never charged — killed by victim\'s widow in 1920.',
  keyFacts: JSON.stringify(['12 attacked, 6 killed with axe 1918–1919', 'Entered through chiselled door panels at night', 'Famous Jazz Letter demanded jazz music on March 19', 'All of New Orleans played jazz — no attacks that night', 'Suspect Joseph Mumfre killed by victim\'s widow in 1920', 'Identity never established']),
  links: JSON.stringify([{ label: 'Wikipedia — Axeman of New Orleans', url: 'https://en.wikipedia.org/wiki/Axeman_of_New_Orleans', type: 'article' }]),
});

CASES.push({
  title: 'Elisa Lam — Death at the Cecil Hotel',
  category: 'missing', section: 'unsolved',
  location: 'Los Angeles, California, USA', date: 'January–February 2013',
  featured: true,
  summary: 'Canadian student Elisa Lam was found dead in a rooftop water tank at the Cecil Hotel. An elevator CCTV video of her behaving erratically before death went viral and remains deeply disturbing.',
  fullContent: `Elisa Lam (April 30, 1991 – January 31, 2013) was a Canadian student visiting Los Angeles when she disappeared from the Cecil Hotel. She was last seen on January 31, 2013. On February 19, guests complained about low water pressure. Maintenance staff found her body in a rooftop water tank. She had been dead for approximately three weeks.\n\nTHE ELEVATOR VIDEO\nSecurity footage released by LAPD in February 2013 showed Elisa in a hotel elevator behaving strangely — pressing multiple floor buttons, hiding in the corner, making unusual hand gestures, and apparently interacting with someone not visible in the frame. The video went viral and spawned thousands of theories.\n\nOFFICIAL CAUSE\nThe Los Angeles County coroner ruled the death an accidental drowning with bipolar disorder listed as a contributing factor. Lam had been diagnosed with bipolar disorder and was on several medications.\n\nCONTROVERSY\nThe water tank was on the roof, accessible only through a locked door with an alarm and past hotel staff. The heavy lid of the tank appeared to have been closed from outside. How she entered the tank and why the lid was closed are unexplained. The case sparked Netflix documentary Crime Scene: The Vanishing at the Cecil Hotel (2021).\n\nSTATUS: Officially closed as accidental. Many investigators and the public disagree.`,
  verdict: 'Officially: accidental drowning (bipolar disorder contributing factor). Circumstances disputed.',
  keyFacts: JSON.stringify(['Found in rooftop water tank after 3 weeks', 'Elevator CCTV video went viral worldwide', 'Tank lid appeared closed from outside — unexplained', 'Rooftop access required key past locked alarmed door', 'Coroner: accidental drowning + bipolar disorder', 'Netflix documentary released 2021', 'Widely considered one of the most mysterious deaths of the 2010s']),
  links: JSON.stringify([{ label: 'Wikipedia — Death of Elisa Lam', url: 'https://en.wikipedia.org/wiki/Death_of_Elisa_Lam', type: 'article' }, { label: 'Netflix: Crime Scene: The Vanishing at the Cecil Hotel', url: 'https://www.netflix.com/title/81183844', type: 'documentary' }]),
});

CASES.push({
  title: 'The Murders at Keddie Cabin 28',
  category: 'murder', section: 'unsolved',
  location: 'Keddie, Plumas County, California, USA', date: 'April 12, 1981',
  featured: false,
  summary: 'Three adults and a teenage boy were murdered in a mountain resort cabin in 1981. A 12-year-old girl was abducted and later found; her skull found years later with a suspect\'s hammer. Partially solved but largely mysterious.',
  fullContent: `On the morning of April 12, 1981, four people were found murdered inside Cabin 28 at a mountain resort in Keddie, California: Glenna "Sue" Sharp (36), her son John (15), his friend Dana Wingate (17), and a family friend. Three children were asleep in a back bedroom and survived unharmed. Sue's 12-year-old daughter Tina was missing.\n\nTHE CRIME SCENE\nVictims were bound with tape and medical tubing, beaten with a hammer and stabbed repeatedly with a butcher knife and a 3-pronged fork. The ferocity of the attack was extreme. The children who survived slept through it.\n\nTINA'S SKULL\nIn April 1984, Tina Sharp's skull and several bones were found in Butte County, 50 miles away. A woman named Marilyn Smartt later claimed her then-husband, Martin Smartt, confessed to her. A hammer belonging to Smartt was found near Tina's remains. Martin Smartt and John Boubede are considered primary suspects. Both are now deceased.\n\nSTATUS: Partially solved in the sense that suspects are named and deceased. No trial ever occurred. Officially unsolved.`,
  verdict: 'Officially unsolved. Prime suspects Martin Smartt and John Boubede — both deceased — never charged.',
  keyFacts: JSON.stringify(['4 murdered in cabin; 3 children survived sleeping in next room', 'Tina Sharp (12) abducted; skull found 50 miles away 3 years later', 'Suspect\'s hammer found near Tina\'s remains', 'Prime suspect Smartt\'s wife claimed he confessed', 'Both prime suspects now deceased', 'Case remained dormant for decades before renewed interest']),
  links: JSON.stringify([{ label: 'Wikipedia — Keddie murders', url: 'https://en.wikipedia.org/wiki/Keddie_murders', type: 'article' }]),
});

CASES.push({
  title: 'The Texarkana Moonlight Murders',
  category: 'murder', section: 'unsolved',
  location: 'Texarkana, Texas/Arkansas, USA', date: 'February–May 1946',
  featured: false,
  summary: 'Eight people attacked (five killed) in a 10-week period near Texarkana in 1946. The killer always attacked couples in parked cars. Nicknamed the Phantom Killer. Never caught.',
  fullContent: `Over a 10-week period in 1946, an unknown assailant known as the Phantom Killer attacked eight people (killing five) in Texarkana, a city straddling the Texas-Arkansas border. All attacks occurred at night in secluded lovers' lanes. Couples in parked cars were the consistent target.\n\nTHE ATTACKS\nFebruary 22: Jimmy Hollis and Mary Jeanne Larey attacked; both survived, though Hollis was shot. March 24: Richard Griffin and Polly Ann Moore killed. April 14: Paul Martin killed, Betty Jo Booker abducted and killed separately. May 3: Virgil Starks shot dead in his home; wife Katie survived by fleeing. May 14: Phantom ceases attacks.\n\nINVESTIGATION\nFBI, Texas Rangers, and local police participated in a massive manhunt. Primary suspect Youell Swinney was arrested for car theft in 1947; his wife claimed he was the Phantom. Prosecutors declined to charge him without more evidence. He was paroled in 1973 and died in 1994.\n\nSTATUS: Cold case. Primary suspect died in 1994. Officially unsolved.`,
  verdict: 'Unsolved cold case. Youell Swinney suspected — never charged. Died 1994.',
  keyFacts: JSON.stringify(['8 attacked, 5 killed in 10 weeks (1946)', 'All attacks on couples in parked cars at night', 'Assailant always wore a cloth mask', 'Suspect Youell Swinney\'s wife claimed he confessed', 'Never charged; died 1994', 'Inspired the 1976 film The Town That Dreaded Sundown']),
  links: JSON.stringify([{ label: 'Wikipedia — Texarkana Moonlight Murders', url: 'https://en.wikipedia.org/wiki/Texarkana_Moonlight_Murders', type: 'article' }]),
});

CASES.push({
  title: 'The Disappearance of Ray Gricar',
  category: 'missing', section: 'unsolved',
  location: 'Lewisburg, Pennsylvania, USA', date: 'April 15, 2005',
  featured: false,
  summary: 'Centre County District Attorney Ray Gricar vanished in 2005. His car was found; his laptop was found in the river with the hard drive removed. He was declared legally dead in 2011. Never found.',
  fullContent: `Ray Gricar was the District Attorney for Centre County, Pennsylvania — the prosecutor who famously declined to charge Jerry Sandusky with child sexual abuse in 1998 (a decision that was revisited after Sandusky's 2011 arrest).\n\nDISAPPEARANCE\nOn April 15, 2005, Gricar did not show up for work. His car was found in a parking lot in Lewisburg. His cellphone was inside. He was never seen again.\n\nTHE LAPTOP\nIn June 2005, a kayaker found Gricar's laptop computer in the Susquehanna River near where his car was found. The hard drive had been separately removed and thrown in the river. It was found later, but the data was unrecoverable due to water damage. The deliberate removal of the hard drive is considered the most significant and unexplained detail.\n\nSANDUSKY CONNECTION\nAfter Sandusky's arrest in 2011, investigators looked again at Gricar's 1998 decision not to prosecute. Some theorized the two cases were connected. No evidence emerged.\n\nSTATUS: Declared legally dead 2011. No body found. No suspects charged.`,
  verdict: 'Declared legally dead 2011. No body found. No suspects. Cause unknown.',
  keyFacts: JSON.stringify(['DA who declined to charge Jerry Sandusky in 1998', 'Car found with phone inside; no signs of struggle', 'Laptop found in river — hard drive separately removed', 'Hard drive data unrecoverable', 'Declared legally dead 2011', 'Body never found']),
  links: JSON.stringify([{ label: 'Wikipedia — Disappearance of Ray Gricar', url: 'https://en.wikipedia.org/wiki/Disappearance_of_Ray_Gricar', type: 'article' }]),
});

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log('\n🔍 Seeding unsolved cases...\n');

  let added = 0, dupes = 0;

  for (let i = 0; i < CASES.length; i++) {
    const c = CASES[i];
    const exists = await prisma.case.findFirst({ where: { title: c.title } });
    if (exists) {
      // Update existing case to set section = 'unsolved'
      await prisma.case.update({ where: { id: exists.id }, data: { section: 'unsolved' } });
      dupes++;
      console.log(`  ~ [exists, section updated] ${c.title}`);
      continue;
    }

    const created = await prisma.case.create({
      data: {
        title:       c.title,
        category:    c.category,
        section:     'unsolved',
        summary:     c.summary,
        fullContent: c.fullContent,
        location:    c.location  || null,
        date:        c.date      || null,
        featured:    c.featured  || false,
        status:      'published',
        verdict:     c.verdict   || null,
        keyFacts:    c.keyFacts  || null,
        links:       c.links     || null,
      }
    });

    // Assign image
    const imageUrl = wrap(
      `https://images.unsplash.com/${getCaseImageUrl(created.id, c.category, c.title).split('photo-').pop()?.split('?')[0] ? 'photo-' + getCaseImageUrl(created.id, c.category, c.title).split('photo-').pop()?.split('?')[0] : 'photo-1508739773434-c26b3d09e071'}?w=800&h=500&fit=crop&crop=center&auto=format&q=80`
    );
    // Use getCaseImageUrl directly
    const rawImg = getCaseImageUrl(created.id, c.category, c.title);
    const proxiedImg = wrap(rawImg);

    await prisma.caseMedia.create({
      data: { caseId: created.id, type: 'image', url: proxiedImg, caption: `Cover image — unsolved ${c.category} case` }
    });

    added++;
    console.log(`  ✓ [${c.category.padEnd(8)}] ${c.title}`);
  }

  console.log(`\n✅ Done! ${added} new unsolved cases added, ${dupes} existing cases updated.`);
  console.log('   Visit http://localhost:5173/unsolved\n');
}

main()
  .catch(err => { console.error('Error:', err.message); process.exit(1); })
  .finally(() => prisma.$disconnect());
