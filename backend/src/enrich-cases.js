/**
 * Enriches all seeded cases with detailed content, timelines, key facts,
 * suspects, verdicts, and reference links (Wikipedia, documentaries, news).
 *
 * Run: node src/enrich-cases.js
 */
require('dotenv').config();
const prisma = require('./utils/prisma');

// ─── Rich case data keyed by title fragment ───────────────────────────────────
const CASE_DATA = {};

// ═══════════════════════════════════════════════════════════════════════════
//  MURDER CASES
// ═══════════════════════════════════════════════════════════════════════════

CASE_DATA['Jeffrey Dahmer'] = {
  fullContent: `Jeffrey Lionel Dahmer, known as the Milwaukee Cannibal or the Milwaukee Monster, was an American serial killer and sex offender who committed the murder, dismemberment, and cannibalism of seventeen men and boys between 1978 and 1991.

EARLY LIFE
Dahmer was born on May 21, 1960, in Milwaukee, Wisconsin. His childhood was marked by social isolation, animal dissection, and a growing obsession with the dead. By his teens he had developed severe alcoholism and disturbing fantasies about controlling and possessing others.

FIRST MURDER (1978)
At age 18, Dahmer committed his first murder by picking up hitchhiker Steven Hicks. After bringing him home to his parents' house, Dahmer killed Hicks with a barbell when Hicks tried to leave. He buried the body, later dug it up, pulverized the bones, and scattered them in the woods.

THE KILLING SPREE (1987–1991)
After a nine-year gap, Dahmer resumed killing. He targeted predominantly Black and Asian homosexual men, luring them to his apartment at 213 Oxford Apartments in Milwaukee with promises of money to pose for photos or simply companionship. He would drug them with sleep-inducing pills dissolved in their drinks, strangle them, and engage in necrophilic acts. He preserved skulls and genitalia as trophies and experimented with creating "zombies" by drilling holes in victims' skulls and injecting muriatic acid.

THE ESCAPE THAT WASN'T (1991)
On May 27, 1991, 14-year-old Konerak Sinthasomphone escaped Dahmer's apartment in a dazed state while Dahmer was at a store. Neighbors called 911. When police arrived, Dahmer told them the boy was his 19-year-old lover who was drunk. The officers escorted the boy back to Dahmer's apartment, dismissing a neighbor's protests. Konerak was murdered that same night. The officers faced internal disciplinary action but were initially cleared.

CAPTURE (1991)
On July 22, 1991, Tracy Edwards escaped from Dahmer's apartment and flagged down a police car. Officers found a Polaroid photograph of a dismembered body in Dahmer's apartment. Inside, they discovered: 11 skulls, two hearts, an entire torso, severed hands, a bag of intestines, a torso with no head or hands in the freezer, and photos documenting murders and dismemberment.

TRIAL AND CONVICTION
Dahmer confessed to all 17 murders. At trial, he pleaded guilty but insane. The prosecution successfully argued he was legally sane. On February 17, 1992, he was sentenced to fifteen consecutive life terms.

DEATH IN PRISON
On November 28, 1994, Dahmer was beaten to death by fellow inmate Christopher Scarver at the Columbia Correctional Institution in Portage, Wisconsin. Scarver claimed Dahmer had shown no remorse and had fashioned his prison food into severed limbs to taunt other inmates.

CULTURAL IMPACT
The case led to significant scrutiny of the Milwaukee police department's handling of the Konerak incident and raised debates about racial bias in policing. Dahmer's case has inspired numerous books, films, and the 2022 Netflix limited series "Dahmer - Monster: The Jeffrey Dahmer Story."`,
  timeline: JSON.stringify([
    { year: '1960', event: 'Jeffrey Dahmer born in Milwaukee, Wisconsin' },
    { year: '1978', event: 'First murder — Steven Hicks killed at age 18' },
    { year: '1987', event: 'Killing spree resumes with murder of Steven Tuomi in a hotel room' },
    { year: '1988', event: 'Arrested for drugging and fondling a 13-year-old boy; given probation' },
    { year: '1991 May', event: 'Konerak Sinthasomphone escapes but police return him to Dahmer; killed same night' },
    { year: '1991 Jul 22', event: 'Tracy Edwards escapes; police discover apartment of horrors' },
    { year: '1992 Jan', event: 'Trial begins in Milwaukee County Circuit Court' },
    { year: '1992 Feb 17', event: 'Sentenced to 15 consecutive life terms (937 years total)' },
    { year: '1994 Nov 28', event: 'Beaten to death by Christopher Scarver in prison' },
  ]),
  keyFacts: JSON.stringify([
    '17 confirmed victims between 1978 and 1991',
    'All victims were male, most were Black or Asian men',
    'Practiced cannibalism and necrophilia',
    'Preserved skulls, genitalia, and took photographs',
    'Police returned an escaped victim to him in 1991',
    'Sentenced to 937 years but killed in prison in 1994',
    'Apartment 213 Oxford Apartments became infamous',
    'Confessed to all murders and provided chilling details',
  ]),
  perpetrator: 'Jeffrey Lionel Dahmer (May 21, 1960 – November 28, 1994). White male from Milwaukee, Wisconsin. High school graduate, Army veteran. Alcoholic since his mid-teens. IQ estimated at 145.',
  victims: '17 men and boys. First victim: Steven Hicks (1978). Youngest victim: Errol Lindsey (19). Most were gay or bisexual Black and Asian men lured from gay bars, bus stops, and malls.',
  verdict: 'Found sane and guilty on all 15 counts of murder (two victims covered under prior charge). Sentenced to 937 years. Killed in prison November 28, 1994.',
  links: JSON.stringify([
    { label: 'Wikipedia — Jeffrey Dahmer', url: 'https://en.wikipedia.org/wiki/Jeffrey_Dahmer', type: 'article' },
    { label: 'FBI Case Files', url: 'https://vault.fbi.gov/jeffrey-dahmer', type: 'official' },
    { label: 'Netflix: Dahmer Monster Series (2022)', url: 'https://www.netflix.com/title/81271450', type: 'documentary' },
    { label: 'Milwaukee Journal Sentinel — Original Coverage', url: 'https://www.jsonline.com/story/news/crime/2021/07/22/jeffrey-dahmers-arrest-30-years-ago-changed-milwaukee-forever/8046264002/', type: 'news' },
    { label: 'Crime Museum — Dahmer Profile', url: 'https://www.crimemuseum.org/crime-library/serial-killers/jeffrey-dahmer/', type: 'article' },
    { label: 'Court Documents (Milwaukee County)', url: 'https://www.wicourts.gov/', type: 'official' },
  ]),
};

CASE_DATA['Ted Bundy'] = {
  fullContent: `Theodore Robert Bundy was one of the most notorious serial killers in American history. Handsome, articulate, and charming, he used his appearance and intelligence as weapons to lure and murder at least 30 women across seven US states between 1974 and 1978.

BACKGROUND
Born November 24, 1946, in Burlington, Vermont, Bundy grew up believing his mother was his sister and his grandparents were his parents. He discovered the truth as a teenager, which deeply affected him. He attended the University of Washington, studying psychology and Chinese, and worked on political campaigns — all while secretly beginning a murderous career.

MODUS OPERANDI
Bundy was exceptionally cunning. He typically wore a fake cast or sling to appear helpless, asking women to help him carry books or a briefcase to his car — a tan Volkswagen Beetle. He also impersonated police officers and authority figures. Once victims were in his car or isolated, he would bludgeon them with a crowbar kept under the seat.

KILLING ACROSS STATES
His confirmed killings spanned Washington, Oregon, Utah, Colorado, Idaho, Florida, and California. He targeted women with dark hair parted in the middle. He violated, murdered, and revisited crime scenes to engage in necrophilic acts, often keeping severed heads as trophies.

FIRST ARREST AND ESCAPE
Bundy was first arrested in August 1975 in Utah for possession of burglary tools. Recovered items linked him to the kidnapping of Carol DaRonch. He was convicted in 1976 and sentenced to one to fifteen years. Transferred to Colorado for a murder trial, he escaped through a courthouse library window in June 1977 and was recaptured eight days later. He escaped again on December 30, 1977, squeezing through a ceiling crawl space. He drove to Chicago and then to Tallahassee, Florida.

THE CHI OMEGA MURDERS (1978)
On January 15, 1978, in the early hours, Bundy entered the Chi Omega sorority house at Florida State University. In 15 minutes he attacked four women, killing two — Lisa Levy and Margaret Bowman — and severely injuring two others. He also attacked a woman in a separate house nearby. Three weeks later he abducted and murdered 12-year-old Kimberly Leach from her school.

CAPTURE AND TRIAL
Bundy was pulled over on February 15, 1978, after a police officer recognized his stolen VW Beetle's erratic driving. He attempted to escape but was subdued. Dental records from bite marks on Lisa Levy's body — a unique forensic technique — were key evidence. He was tried and represented himself in a nationally televised trial.

CONFESSIONS AND EXECUTION
Before his execution, Bundy confessed to 30 murders, but investigators believe the total may be 35 or higher. On January 24, 1989, he was executed in Florida's electric chair. An estimated 200 people gathered outside the prison cheering.`,
  timeline: JSON.stringify([
    { year: '1946', event: 'Born in Burlington, Vermont' },
    { year: '1974', event: 'Killing spree begins in Washington State; first victim Lynda Healy' },
    { year: '1975', event: 'Arrested in Utah; linked to kidnapping of Carol DaRonch' },
    { year: '1976', event: 'Convicted in Utah; sentenced to 1–15 years' },
    { year: '1977 Jun', event: 'First escape from courthouse in Aspen, Colorado; recaptured after 8 days' },
    { year: '1977 Dec', event: 'Second escape through ceiling crawl space; flees to Florida' },
    { year: '1978 Jan 15', event: 'Chi Omega sorority murders — kills 2, injures 2 in 15 minutes' },
    { year: '1978 Feb 9', event: 'Kidnaps and murders 12-year-old Kimberly Leach' },
    { year: '1978 Feb 15', event: 'Final arrest in Pensacola, Florida' },
    { year: '1979', event: 'Chi Omega trial; nationally televised; found guilty, death sentence' },
    { year: '1989 Jan 24', event: 'Executed by electric chair at Florida State Prison' },
  ]),
  keyFacts: JSON.stringify([
    'Confessed to 30 murders across 7 states; actual count may be 35+',
    'Used charm, fake injuries, and impersonation to lure victims',
    'Escaped custody TWICE — unprecedented at the time',
    'Bite mark evidence was groundbreaking forensic science',
    'Represented himself at his own murder trial',
    'Was a law student; worked on a political campaign',
    'Wrote a book and gave interviews from death row',
    'Execution drew crowds cheering outside the prison',
  ]),
  perpetrator: 'Theodore Robert Bundy (November 24, 1946 – January 24, 1989). Attended University of Washington (psychology). Law student. Worked on Republican political campaigns. Called himself "the most cold-hearted son of a bitch you\'ll ever meet."',
  victims: 'At least 30 confirmed victims across 7 US states. All female. Ages ranging from 12 to mid-20s. Often had long brown hair parted in the middle. Final victim: Kimberly Leach, age 12.',
  verdict: 'Convicted of murder of Lisa Levy and Margaret Bowman (Chi Omega). Also convicted of kidnapping and murder of Kimberly Leach. Sentenced to death. Executed January 24, 1989.',
  links: JSON.stringify([
    { label: 'Wikipedia — Ted Bundy', url: 'https://en.wikipedia.org/wiki/Ted_Bundy', type: 'article' },
    { label: 'FBI — Bundy Case Files', url: 'https://vault.fbi.gov/ted-bundy', type: 'official' },
    { label: 'Netflix: Conversations with a Killer: The Ted Bundy Tapes', url: 'https://www.netflix.com/title/80226612', type: 'documentary' },
    { label: 'Crime Museum — Ted Bundy', url: 'https://www.crimemuseum.org/crime-library/serial-killers/ted-bundy/', type: 'article' },
    { label: 'Bundy Trial Transcripts (Florida)', url: 'https://law.justia.com/cases/florida/supreme-court/1985/60234-0.html', type: 'official' },
    { label: 'Ann Rule — The Stranger Beside Me', url: 'https://www.goodreads.com/book/show/34891.The_Stranger_Beside_Me', type: 'book' },
  ]),
};

CASE_DATA['John Wayne Gacy'] = {
  fullContent: `John Wayne Gacy Jr. was an American serial killer who sexually assaulted and murdered at least 33 young men and boys in Chicago, Illinois, between 1972 and 1978. He became known as the "Killer Clown" because he performed as "Pogo the Clown" at children's charity events while committing murders.

DOUBLE LIFE
Gacy ran a successful construction company, was a Democratic Party precinct captain, and was known as a generous and sociable neighbor. He hosted elaborate neighborhood parties and volunteered as a precinct captain. He was photographed with First Lady Rosalynn Carter in 1978. Neighbors knew nothing of his crimes.

THE MURDERS
Gacy lured his mostly teenage victims by offering them construction work, alcohol, and drugs. He would then handcuff them, telling them it was a magic trick. He would strangle them with a rope or a board (his "rope trick"). He buried 26 of his 33 victims under the crawl space of his house, stuffing bodies in whenever space ran out with a Bunsen burner flame to accelerate decomposition.

INVESTIGATION
The disappearance of 15-year-old Robert Piest in December 1978 led police to Gacy. Piest had mentioned to his mother he was going to talk to a contractor about a job. A search warrant was obtained. Officers noted a distinct smell in the house. Investigators found a class ring, clothing, and eventually discovered the crawl space. Gacy initially helped police dig but was arrested when evidence was found.

CONFESSION
Gacy confessed to 33 murders. He told police some victims deserved to die because they were male prostitutes. He said he could not remember all of his victims' faces. Five of the 33 bodies were recovered from the Des Plaines River — Gacy had thrown them there when his crawl space was full.

TRIAL
Gacy's defense pleaded not guilty by reason of insanity. The jury deliberated just two hours before returning a guilty verdict on all 33 counts. He was sentenced to death.

ART AND EXECUTION
While on death row, Gacy became a prolific painter, producing portraits of clowns and Disney characters that sold for thousands of dollars. He was executed by lethal injection on May 10, 1994. His last words were "Kiss my ass."`,
  timeline: JSON.stringify([
    { year: '1942', event: 'Born in Chicago, Illinois' },
    { year: '1968', event: 'Convicted of sodomy in Iowa; served 18 months of a 10-year sentence' },
    { year: '1972', event: 'First murder — Timothy McCoy, 15, stabbed at Gacy\'s home' },
    { year: '1975', event: 'Construction company growing; begins systematic killings' },
    { year: '1978', event: 'Photographed with Rosalynn Carter at Democratic event' },
    { year: '1978 Dec', event: '15-year-old Robert Piest disappears after visiting Gacy about a job' },
    { year: '1978 Dec 21', event: 'Police search home; discover crawl space with 26 bodies' },
    { year: '1979 Feb', event: 'Formally charged with 33 murders' },
    { year: '1980 Mar', event: 'Convicted of 33 murders; sentenced to death' },
    { year: '1994 May 10', event: 'Executed by lethal injection at Stateville Correctional Center' },
  ]),
  keyFacts: JSON.stringify([
    '33 confirmed victims — all male, aged 14–21',
    '26 bodies buried under the crawl space of his home',
    '5 bodies dumped in the Des Plaines River when space ran out',
    'Known as "Pogo the Clown" at charity events',
    'Photographed with First Lady Rosalynn Carter in 1978',
    'Jury deliberated just 2 hours before guilty verdict',
    'Sold clown paintings from death row',
    'Last words: "Kiss my ass"',
  ]),
  perpetrator: 'John Wayne Gacy Jr. (March 17, 1942 – May 10, 1994). Construction contractor, Democratic Party volunteer, community figure. Convicted of sodomy in Iowa in 1968 before moving to Illinois. Known as the Killer Clown.',
  victims: '33 young men and boys, aged 14–21. Most lured with job offers or alcohol. Robert Piest (15) was the final victim whose disappearance led to Gacy\'s arrest. Many remained unidentified for decades.',
  verdict: 'Guilty on all 33 counts of murder. Sentenced to death on 12 counts. Executed May 10, 1994.',
  links: JSON.stringify([
    { label: 'Wikipedia — John Wayne Gacy', url: 'https://en.wikipedia.org/wiki/John_Wayne_Gacy', type: 'article' },
    { label: 'FBI Case Files', url: 'https://vault.fbi.gov/john-wayne-gacy', type: 'official' },
    { label: 'Crime Museum — Gacy Profile', url: 'https://www.crimemuseum.org/crime-library/serial-killers/john-wayne-gacy/', type: 'article' },
    { label: 'Oxygen — Buried in the Backyard', url: 'https://www.oxygen.com/buried-in-the-backyard', type: 'documentary' },
    { label: 'Chicago Tribune — Original Coverage Archive', url: 'https://www.chicagotribune.com/', type: 'news' },
  ]),
};

CASE_DATA['Zodiac Killer'] = {
  fullContent: `The Zodiac Killer is one of America's most infamous unidentified serial killers, active in Northern California in the late 1960s. He sent taunting letters and encrypted ciphers to police and newspapers, claiming to have killed 37 people — though only 5 murders are confirmed.

CONFIRMED MURDERS
The Zodiac's confirmed victims are: Betty Lou Jensen (16) and David Faraday (17), shot in their car on December 20, 1968; Darlene Ferrin (22) and Michael Mageau (19, survived) at Blue Rock Springs Park, July 4, 1969; Bryan Hartnell (20, survived) and Cecelia Shepard (22), attacked at Lake Berryessa, September 27, 1969; and San Francisco cab driver Paul Stine, shot on October 11, 1969.

THE CIPHERS
The Zodiac sent four encrypted ciphers to newspapers. He claimed the ciphers contained his identity. The first (Z408) was a 408-character cipher cracked by a schoolteacher and his wife in August 1969 — it said "I like killing people because it is so much fun." The Z340 cipher, sent in November 1969, was unsolved until December 2020, when a team of amateur codebreakers cracked it using specialized software. It read: "I hope you are having lots of fun in trying to catch me. I am not afraid of the gas chamber because it will send me to paradice..." Two smaller ciphers (Z13 and Z32) remain unsolved.

THE LETTERS
Between 1969 and 1974, the Zodiac sent at least 20 confirmed letters to newspapers and police. He signed them with a crosshair symbol. In the letters he claimed credit for additional murders beyond the confirmed five and created a points system for his killings. His last confirmed letter was sent to San Francisco Chronicle columnist Paul Avery on January 29, 1974.

INVESTIGATION
Suspects investigated include: Arthur Leigh Allen, a convicted child molester who had Zodiac paraphernalia; Lawrence Kane; Ross Sullivan; and others. Allen died in 1992 before being formally charged. DNA recovered from Zodiac stamps and envelopes was tested against Allen in 2002 and did not match, though investigators noted the DNA could be contaminated. In 2021 a group of cold case investigators called the Case Breakers claimed Gary Francis Poste, a deceased house painter, was the Zodiac — but this claim was not accepted by law enforcement.

CULTURAL LEGACY
The Zodiac case has inspired two major films — Alfred Hitchcock's influence can be seen in the 2007 David Fincher film "Zodiac" starring Jake Gyllenhaal and Robert Downey Jr., which remains one of the most accurate accounts.`,
  timeline: JSON.stringify([
    { year: '1968 Dec 20', event: 'First confirmed murders — Betty Lou Jensen and David Faraday shot in Vallejo' },
    { year: '1969 Jul 4', event: 'Attack at Blue Rock Springs; Darlene Ferrin killed, Michael Mageau survives' },
    { year: '1969 Aug', event: 'First Zodiac letter sent to 3 newspapers with cipher pieces' },
    { year: '1969 Aug 8', event: 'Z408 cipher cracked by Donald and Bettye Harden' },
    { year: '1969 Sep 27', event: 'Lake Berryessa attack; Cecelia Shepard killed, Bryan Hartnell survives' },
    { year: '1969 Oct 11', event: 'Kills cab driver Paul Stine; cuts piece of his shirt as evidence' },
    { year: '1969 Nov', event: 'Sends Z340 cipher; threatens to shoot school children' },
    { year: '1970', event: 'Claims 10 victims killed; letters continue taunting police' },
    { year: '1974', event: 'Last confirmed letter to the San Francisco Chronicle' },
    { year: '2020 Dec', event: 'Z340 cipher solved by codebreakers using computer software' },
    { year: 'Present', event: 'Case remains unsolved; identity unknown' },
  ]),
  keyFacts: JSON.stringify([
    '5 confirmed victims; claimed 37 in letters',
    'Sent 4 encrypted ciphers to newspapers; 2 remain unsolved',
    'Z340 cipher remained unsolved for 51 years until 2020',
    'Sent 20+ letters to police and press between 1969–1974',
    'No suspect has ever been charged',
    'Mailed pieces of victims\' clothing as proof',
    'Threatened to bomb a school bus — terror tactic',
    'Inspired David Fincher\'s acclaimed 2007 film "Zodiac"',
  ]),
  perpetrator: 'Unknown. Identity never established despite decades of investigation. Top suspect Arthur Leigh Allen (1933–1992) was ruled out by DNA. Multiple cold case investigators have proposed other suspects, none confirmed.',
  victims: '5 confirmed dead: Betty Lou Jensen, David Faraday, Darlene Ferrin, Cecelia Shepard, Paul Stine. 2 survived attacks: Michael Mageau and Bryan Hartnell. Zodiac claimed 37 total victims.',
  verdict: 'Unsolved. No suspect has ever been charged. FBI and SFPD retain open case files.',
  links: JSON.stringify([
    { label: 'Wikipedia — Zodiac Killer', url: 'https://en.wikipedia.org/wiki/Zodiac_Killer', type: 'article' },
    { label: 'Zodiac Killer Letters — SFPD Official Archive', url: 'https://www.zodiackiller.com/Letters.html', type: 'official' },
    { label: 'Z340 Cipher Solution Paper (2020)', url: 'https://www.youtube.com/watch?v=2QHkzm_I7xM', type: 'video' },
    { label: 'Film: Zodiac (2007) — David Fincher', url: 'https://www.imdb.com/title/tt0443706/', type: 'documentary' },
    { label: 'Case Breakers Investigation Summary', url: 'https://www.foxnews.com/us/zodiac-killer-identified', type: 'news' },
    { label: 'Zodiackiller.com — Original Letters Scans', url: 'https://www.zodiackiller.com/', type: 'article' },
  ]),
};

CASE_DATA['The Rwandan Genocide'] = {
  fullContent: `The Rwandan Genocide was a mass slaughter of ethnic Tutsi and moderate Hutu in Rwanda between April 7 and July 15, 1994. In approximately 100 days, an estimated 500,000 to 800,000 people were killed — roughly 70% of Rwanda's Tutsi population.

HISTORICAL ROOTS
Rwanda's population is divided between the Hutu (majority ~85%) and Tutsi (~14%). Colonial powers Belgium and Germany reinforced ethnic divisions by issuing identity cards classifying people by ethnicity. After independence in 1962, periodic violence against Tutsi escalated, causing many to flee to Uganda, Burundi, and Congo where they formed the Rwandan Patriotic Front (RPF).

THE TRIGGER
On April 6, 1994, President Juvénal Habyarimana's plane was shot down near Kigali airport. Within hours, Hutu extremists — who had planned the genocide in advance — activated roadblocks across the country and began systematically killing Tutsi and moderate Hutu politicians. Prime Minister Agathe Uwilingiyimana and the 10 Belgian UN peacekeepers protecting her were killed the following morning.

RADIO MILLES COLLINES
The extremist radio station RTLM (Radio Télévision Libre des Mille Collines) broadcast hate propaganda calling Tutsi "inyenzi" (cockroaches) and broadcasting the names and addresses of Tutsi to be killed. Presenters encouraged neighbors to kill neighbors. Churches and schools where thousands had sought refuge became massacre sites.

THE KILLING
Interahamwe militias, armed with machetes distributed in advance by the government, carried out killings at unprecedented speed — faster than the Nazi Holocaust per day. The Nyamata Church massacre killed 10,000 people. The Ntarama Church massacre killed 5,000. Bodies were dumped in rivers, mass graves, and pits. Women were systematically raped as a weapon of war.

INTERNATIONAL FAILURE
The UN mission commander General Roméo Dallaire sent the now-famous "Genocide Fax" to the UN in January 1994 warning of weapons caches and genocide planning. The UN ignored it. When the genocide began, instead of reinforcing troops, the Security Council voted to reduce UNAMIR from 2,500 to 270 soldiers. France, which had supported the Hutu government, evacuated its citizens but left Rwandans behind. The US government, under President Clinton, deliberately avoided using the word "genocide" to avoid obligations under international law.

AFTERMATH
The RPF, led by Paul Kagame, defeated the genocidal government in July 1994, ending the killings. An estimated 2 million Hutu fled to neighboring countries fearing reprisals, causing a refugee crisis. President Clinton later called the failure to act in Rwanda the greatest regret of his presidency. The International Criminal Tribunal for Rwanda (ICTR) prosecuted 93 individuals including former Prime Minister Jean Kambanda, who became the first head of government convicted of genocide.`,
  timeline: JSON.stringify([
    { year: '1959–1962', event: 'Hutu revolution; mass flight of Tutsi; Rwanda gains independence' },
    { year: '1990', event: 'RPF invasion from Uganda; civil war begins' },
    { year: '1993 Aug', event: 'Arusha Accords signed — peace agreement' },
    { year: '1994 Jan', event: 'Dallaire Genocide Fax sent to UN; ignored' },
    { year: '1994 Apr 6', event: 'President Habyarimana\'s plane shot down; genocide begins within hours' },
    { year: '1994 Apr 7', event: 'Prime Minister and Belgian peacekeepers killed; Interahamwe roadblocks set up' },
    { year: '1994 Apr–Jul', event: '100 days of mass killing; 500,000–800,000 dead' },
    { year: '1994 Jul 4', event: 'RPF captures Kigali; genocide ends' },
    { year: '1994 Jul', event: '2 million Hutu flee to Zaire (DRC) fearing reprisals' },
    { year: '1995', event: 'ICTR established in Arusha, Tanzania' },
    { year: '1998', event: 'Clinton visits Rwanda and apologizes' },
    { year: '1998', event: 'Jean Kambanda convicted — first head of government for genocide' },
    { year: '2003', event: 'Gacaca community courts begin in Rwanda' },
  ]),
  keyFacts: JSON.stringify([
    '500,000–800,000 killed in just 100 days',
    '70% of Rwanda\'s entire Tutsi population exterminated',
    'Killing rate exceeded Nazi Holocaust per day',
    'Radio RTLM broadcast names and addresses of Tutsi targets',
    'UN received advance warning via Dallaire Fax — and ignored it',
    'UN reduced peacekeeping forces during the genocide',
    'US deliberately avoided the word "genocide" to dodge legal obligations',
    'Churches used as massacre sites; 10,000 killed at Nyamata alone',
    'Systematic rape used as weapon of war',
    'First sitting prime minister convicted of genocide: Jean Kambanda',
  ]),
  perpetrator: 'Organized by Hutu Power extremists within the Rwandan government and military. Key architects include Colonel Théoneste Bagosora ("the Devil"), Jean Kambanda (PM), and Ferdinand Nahimana (RTLM founder). Carried out by Interahamwe militias and ordinary citizens.',
  victims: 'Estimated 500,000–800,000 Tutsi and moderate Hutu. About 70% of Rwanda\'s Tutsi population. Victims of all ages including children. Hundreds of thousands of women raped.',
  verdict: 'ICTR convicted 93 people including former PM Jean Kambanda (life), Théoneste Bagosora (life), and RTLM founder Ferdinand Nahimana (27 years). Gacaca courts processed 1.9 million cases in Rwanda.',
  links: JSON.stringify([
    { label: 'Wikipedia — Rwandan Genocide', url: 'https://en.wikipedia.org/wiki/Rwandan_genocide', type: 'article' },
    { label: 'Frontline PBS: Ghosts of Rwanda (Documentary)', url: 'https://www.pbs.org/wgbh/pages/frontline/shows/rwanda/', type: 'documentary' },
    { label: 'Dallaire Genocide Fax — Full Text', url: 'https://www.pbs.org/wgbh/pages/frontline/shows/evil/warning/fax.html', type: 'official' },
    { label: 'ICTR Judgments Archive', url: 'https://unictr.irmct.org/', type: 'official' },
    { label: 'Hotel Rwanda (2004) — Film Based on True Events', url: 'https://www.imdb.com/title/tt0395169/', type: 'documentary' },
    { label: 'Kigali Genocide Memorial', url: 'https://www.kgm.rw/', type: 'article' },
    { label: 'Human Rights Watch — Leave None to Tell the Story', url: 'https://www.hrw.org/reports/1999/rwanda/', type: 'article' },
  ]),
};

CASE_DATA['The Holocaust'] = {
  fullContent: `The Holocaust was the state-sponsored, systematic persecution and murder of six million Jews by the Nazi regime under Adolf Hitler between 1941 and 1945. It also claimed the lives of millions more: Roma, disabled people, Soviet POWs, political prisoners, gay men, Jehovah's Witnesses, and others.

RISE OF NAZISM
Adolf Hitler came to power in Germany in January 1933. Almost immediately, the Nazi regime began stripping Jews of rights through laws like the 1935 Nuremberg Laws, which stripped Jews of citizenship. Kristallnacht on November 9–10, 1938 — the Night of Broken Glass — saw the state-orchestrated destruction of 7,000 Jewish businesses, 1,400 synagogues, and the deaths of at least 91 Jews.

THE FINAL SOLUTION
The "Final Solution to the Jewish Question" was formally decided at the Wannsee Conference on January 20, 1942, near Berlin. Senior Nazi officials coordinated the logistics of Europe-wide genocide. Six dedicated extermination camps were built in occupied Poland: Auschwitz-Birkenau, Treblinka, Sobibor, Belzec, Chelmno, and Majdanek.

THE DEATH CAMPS
Auschwitz-Birkenau was the largest, processing an estimated 1.1 million Jews plus others. Victims arrived by cattle car, underwent "selection" — those deemed fit for forced labor were tattooed with numbers; the rest (mostly women, children, elderly) were told to shower and gassed with Zyklon B within hours of arrival. Bodies were burned in crematoria that ran 24 hours a day. Nazi doctors including Josef Mengele conducted grotesque medical experiments on twins and others.

THE EINSATZGRUPPEN
Mobile killing units called Einsatzgruppen followed the German army into the Soviet Union and shot Jews en masse. The Babi Yar massacre near Kyiv killed 33,771 Jews in two days (September 29–30, 1941) — one of the largest single mass shootings of the Holocaust.

LIBERATION
Allied forces liberated the camps between 1944–1945. Soldiers were unprepared for what they found — skeletal survivors, piles of bodies, mountains of confiscated belongings, and the industrial machinery of death. General Eisenhower ordered documentation saying "Get it all on record now — let the evidence speak."

THE NUREMBERG TRIALS
Between 1945 and 1949, the Nuremberg Trials held 13 proceedings against Nazi war criminals. 24 major war criminals were tried at the main trial; 12 were sentenced to death, including Hermann Göring who cheated the hangman by swallowing a cyanide pill. The trials established foundational principles of international humanitarian law and the concept of crimes against humanity.`,
  timeline: JSON.stringify([
    { year: '1933 Jan', event: 'Hitler appointed Chancellor of Germany' },
    { year: '1935', event: 'Nuremberg Laws strip Jews of citizenship' },
    { year: '1938 Nov', event: 'Kristallnacht — pogrom across Germany and Austria' },
    { year: '1939 Sep', event: 'Germany invades Poland; WWII begins; ghettos established' },
    { year: '1941 Jun', event: 'Einsatzgruppen begin mass shootings in Soviet Union' },
    { year: '1941 Sep', event: 'Babi Yar massacre — 33,771 Jews killed in 2 days' },
    { year: '1942 Jan', event: 'Wannsee Conference formalizes the Final Solution' },
    { year: '1942–1944', event: 'Death camps operating at full capacity; 1M+ killed at Auschwitz' },
    { year: '1944–1945', event: 'Allied forces liberate camps; death marches as Nazis retreat' },
    { year: '1945 May', event: 'Germany surrenders; WWII in Europe ends' },
    { year: '1945 Nov', event: 'Nuremberg Trials begin' },
    { year: '1948', event: 'UN adopts Genocide Convention' },
    { year: '1961', event: 'Adolf Eichmann trial in Israel; executed 1962' },
  ]),
  keyFacts: JSON.stringify([
    '6 million Jews murdered — two-thirds of European Jewry',
    '11 million total victims including Roma, disabled, POWs, gay men',
    'Wannsee Conference (1942) formally coordinated genocide',
    'Auschwitz-Birkenau killed an estimated 1.1 million people',
    'Babi Yar — 33,771 killed in just 2 days',
    'Einsatzgruppen mobile units shot 1.5 million Jews in the USSR',
    'Zyklon B used as murder weapon at Auschwitz',
    '12 Nazi leaders sentenced to death at Nuremberg',
    'Foundation of modern international humanitarian law',
  ]),
  perpetrator: 'Nazi Germany under Adolf Hitler. Key architects: Heinrich Himmler (SS chief), Reinhard Heydrich (Final Solution planner), Adolf Eichmann (logistics), Josef Mengele (Auschwitz experiments). Supported by ordinary soldiers, police, and collaborators across occupied Europe.',
  victims: '6 million Jews. Also: ~500,000 Roma, ~250,000 disabled people, 3+ million Soviet POWs, ~1.8 million non-Jewish Polish civilians, tens of thousands of gay men, Jehovah\'s Witnesses, political prisoners.',
  verdict: 'Nuremberg Trials: 12 death sentences (10 hanged), 3 life sentences, 4 lengthy prison terms. Adolf Eichmann hanged in Israel 1962. Many perpetrators escaped justice; some hunted by Mossad. Germany pays ongoing reparations.',
  links: JSON.stringify([
    { label: 'Wikipedia — The Holocaust', url: 'https://en.wikipedia.org/wiki/The_Holocaust', type: 'article' },
    { label: 'US Holocaust Memorial Museum', url: 'https://www.ushmm.org/', type: 'official' },
    { label: 'Yad Vashem — World Holocaust Remembrance Center', url: 'https://www.yadvashem.org/', type: 'official' },
    { label: 'Nuremberg Trial Transcripts', url: 'https://avalon.law.yale.edu/subject_menus/imt.asp', type: 'official' },
    { label: 'Claude Lanzmann: Shoah (1985) — 9-hour documentary', url: 'https://www.imdb.com/title/tt0090015/', type: 'documentary' },
    { label: 'Night by Elie Wiesel — Survivor Memoir', url: 'https://www.goodreads.com/book/show/1617.Night', type: 'book' },
    { label: 'Anne Frank House', url: 'https://www.annefrank.org/', type: 'article' },
    { label: 'Wannsee Conference Protocol (full text)', url: 'https://www.ghwk.de/en/wannsee-conference/', type: 'official' },
  ]),
};

CASE_DATA['The Disappearance of Madeleine McCann'] = {
  fullContent: `Madeleine Beth McCann disappeared on the evening of May 3, 2007 from apartment 5A of the Ocean Club resort in Praia da Luz, a small holiday village in the Algarve, Portugal. She was 3 years old and 7 months. Her disappearance became the most widely reported missing-person case in history.

THE NIGHT OF DISAPPEARANCE
Madeleine's parents, Kate and Gerry McCann, both British doctors, were dining at a tapas restaurant approximately 50 meters from their apartment with a group of seven friends. They were checking on their three children — Madeleine and 2-year-old twins Sean and Amelie — at intervals. At approximately 10:00 PM, Kate McCann went to check and found Madeleine's bed empty. The window and shutter of the children's bedroom were open.

INITIAL INVESTIGATION
Portuguese police (Polícia Judiciária) launched an investigation. Within days, the case became an international media frenzy. Over 30,000 reported sightings poured in from across the world. However, Portuguese investigators focused suspicion on the parents, and in September 2007 designated Gerry and Kate McCann as "arguidos" (formal suspects). A family friend, Robert Murat, who had acted as a translator for police, was also named a suspect.

THE PARENTS AS SUSPECTS
Portuguese detective Gonçalo Amaral led the investigation and became convinced the parents were responsible — theorizing Madeleine died accidentally and her body was hidden. He wrote a book "The Truth of the Lie" outlining this theory. The McCanns sued him; the case went to the European Court of Human Rights, which in 2021 ruled that banning Amaral's book violated his freedom of expression.

OPERATION GRANGE
In 2011, Scotland Yard launched Operation Grange, reviewing the entire case. In 2013 they identified 38 persons of interest including a new prime suspect — a white male photographed carrying a child toward the beach that night. In May 2022, German prosecutors named Christian Brückner as the prime suspect. Brückner, born 1976, was a convicted pedophile and drug dealer living in the Algarve at the time. His phone was active near Praia da Luz that evening.

CHRISTIAN BRÜCKNER
Brückner is currently serving a 7-year sentence in Germany for raping a 72-year-old American woman in Praia da Luz in 2005 — near the same area. Portuguese prosecutors formally named him a suspect in 2022. In 2024 he was tried in Germany for five serious sexual offences in Portugal between 2000–2017, but was acquitted in September 2024 due to insufficient evidence. The McCann case remains open.

MADELEINE TODAY
Madeleine would be 21 years old in 2025. She has not been found. The investigation remains active across Portugal, UK, and Germany. The Find Madeleine fund has raised millions of pounds. Her parents continue to appeal for information.`,
  timeline: JSON.stringify([
    { year: '2003 May 12', event: 'Madeleine McCann born in Leicester, England' },
    { year: '2007 May 3', event: 'Disappears from apartment 5A, Ocean Club, Praia da Luz, Portugal' },
    { year: '2007 May 4', event: 'International media coverage begins; Interpol notice issued' },
    { year: '2007 Sep', event: 'Kate and Gerry McCann named formal suspects (arguidos) by Portuguese police' },
    { year: '2008 Jul', event: 'Portuguese investigation archived; McCanns cleared' },
    { year: '2009', event: 'Gonçalo Amaral publishes "The Truth of the Lie" blaming parents' },
    { year: '2011', event: 'Scotland Yard launches Operation Grange' },
    { year: '2013', event: 'New prime suspect identified — man carrying child toward beach' },
    { year: '2022 May', event: 'German authorities name Christian Brückner as prime suspect' },
    { year: '2022 Jun', event: 'Portuguese formally name Brückner as suspect' },
    { year: '2024 Sep', event: 'Brückner acquitted in Germany of related sex offences; McCann case still open' },
    { year: 'Present', event: 'Madeleine remains missing; would be 21 years old in 2025' },
  ]),
  keyFacts: JSON.stringify([
    'Disappeared aged 3 from Portuguese holiday resort in 2007',
    'Most reported missing-person case in history',
    'Parents Kate and Gerry McCann were suspected then cleared',
    'Operation Grange (Scotland Yard) launched in 2011',
    'Prime suspect Christian Brückner identified in 2022',
    'Brückner convicted of 2005 rape near same location',
    'Brückner acquitted of related Portugal offences in 2024',
    'McCann Fund raised millions for search',
    'Would be 21 years old in 2025; never found',
  ]),
  perpetrator: 'Unknown. Prime suspect: Christian Brückner (born 1976, Germany), convicted pedophile and drug dealer who was in Praia da Luz at the time. Acquitted of separate sex offences in 2024. Not formally charged in Madeleine\'s case.',
  victims: 'Madeleine Beth McCann, born May 12, 2003. Disappeared aged 3 years and 357 days. British national. No confirmed sightings since May 3, 2007.',
  verdict: 'Unsolved. Investigation active. Declared legally dead by some jurisdictions but not officially. Portugal, UK, and Germany all maintaining active investigations.',
  links: JSON.stringify([
    { label: 'Wikipedia — Disappearance of Madeleine McCann', url: 'https://en.wikipedia.org/wiki/Disappearance_of_Madeleine_McCann', type: 'article' },
    { label: 'Official Find Madeleine Website', url: 'https://www.findmadeleine.com/', type: 'official' },
    { label: 'Netflix: The Disappearance of Madeleine McCann (2019)', url: 'https://www.netflix.com/title/80242611', type: 'documentary' },
    { label: 'BBC News — Madeleine McCann Investigation Updates', url: 'https://www.bbc.co.uk/news/topics/c008wjx4v39t', type: 'news' },
    { label: 'Operation Grange — Scotland Yard Statement', url: 'https://www.met.police.uk/advice/advice-and-information/missing-persons/madeleine-mccann/', type: 'official' },
    { label: 'Kate McCann: Madeleine (Book)', url: 'https://www.goodreads.com/book/show/11261282-madeleine', type: 'book' },
    { label: 'Christian Brückner — Trial Coverage (Guardian)', url: 'https://www.theguardian.com/world/madeleine-mccann', type: 'news' },
  ]),
};

CASE_DATA['OJ Simpson'] = {
  fullContent: `The O.J. Simpson murder case is one of the most publicized criminal trials in American history. Former NFL star Orenthal James Simpson was charged with the murders of his ex-wife Nicole Brown Simpson and her friend Ron Goldman on June 12, 1994.

THE MURDERS
Nicole Brown Simpson (35) and Ronald Goldman (25) were found stabbed to death outside Nicole's condominium at 875 South Bundy Drive, Brentwood, Los Angeles, just after midnight on June 13, 1994. Nicole had multiple defensive wounds; her throat was nearly severed. Goldman had over 30 stab wounds. A single bloody glove was found at the scene.

THE INVESTIGATION
Police drove to O.J. Simpson's estate at Rockingham Avenue to notify him of his ex-wife's death. A detective jumping a fence to check on Simpson found a trail of blood drops, Simpson's car with blood on it, and — crucially — the matching bloody glove behind the guesthouse where Kato Kaelin was staying. Simpson had cuts on his left hand that he gave conflicting explanations for.

THE BRONCO CHASE
On June 17, 1994, after Simpson failed to surrender to police and was declared a fugitive, his friend Al Cowlings drove him slowly in a white Ford Bronco on Los Angeles freeways while 95 million Americans watched live on TV. Simpson held a gun to his own head. He eventually surrendered peacefully.

THE TRIAL
The "Trial of the Century" lasted 9 months (January–October 1995). The prosecution's case included DNA blood evidence, Simpson's history of domestic violence against Nicole, a Bruno Magli shoe print (size 12, Simpson's size) at the scene, and fibers linking the scene to Simpson's car and home. The defense — the "Dream Team" including Johnnie Cochran, Robert Shapiro, F. Lee Bailey, and Barry Scheck — attacked the chain of custody of DNA evidence and argued that Detective Mark Fuhrman (who found the glove) was a racist who planted evidence. Cochran's closing argument included the famous line: "If it doesn't fit, you must acquit" — referring to Simpson struggling to put on the dried, shrunken glove in court.

THE VERDICT
On October 3, 1995, after just 4 hours of deliberation, the jury acquitted Simpson on both counts. The verdict split the nation along racial lines — many Black Americans celebrated while many white Americans were outraged.

CIVIL TRIAL AND LATER
In 1997 a civil jury found Simpson liable for both deaths and awarded $33.5 million in damages to the Goldman and Brown families. Simpson moved to Florida where wages cannot be garnished, largely avoiding payment. In 2007 Simpson was arrested in Las Vegas for armed robbery and kidnapping of sports memorabilia dealers. He was convicted and sentenced to 33 years, serving 9 before parole in 2017. He died of prostate cancer on April 10, 2024.`,
  timeline: JSON.stringify([
    { year: '1994 Jun 12', event: 'Nicole Brown Simpson and Ron Goldman murdered at Bundy Drive' },
    { year: '1994 Jun 13', event: 'Police find matching glove at Simpson\'s estate; Simpson has cuts on hand' },
    { year: '1994 Jun 17', event: 'Bronco chase — 95 million viewers watch live; Simpson surrenders' },
    { year: '1995 Jan', event: 'Criminal trial begins in Los Angeles' },
    { year: '1995 Jun', event: 'Simpson unable to fit gloves in court — "If it doesn\'t fit, you must acquit"' },
    { year: '1995 Oct 3', event: 'Not guilty verdict after 4 hours deliberation; nation divided' },
    { year: '1997 Feb', event: 'Civil trial: found liable; $33.5 million awarded to families' },
    { year: '2007 Sep', event: 'Arrested in Las Vegas for armed robbery' },
    { year: '2008', event: 'Convicted; sentenced to 33 years' },
    { year: '2017', event: 'Released on parole after 9 years' },
    { year: '2024 Apr 10', event: 'O.J. Simpson dies of prostate cancer aged 76' },
  ]),
  keyFacts: JSON.stringify([
    'Nicole Brown and Ron Goldman stabbed June 12, 1994',
    'Matching bloody gloves found at both crime scenes',
    'O.J. had cuts on left hand; gave conflicting explanations',
    'Bronco chase watched live by 95 million Americans',
    '9-month criminal trial — longest in California history at time',
    'Not guilty after just 4 hours jury deliberation',
    'Civil trial found him liable: $33.5 million judgment',
    'Convicted of armed robbery in 2007; paroled 2017',
    'Verdict exposed deep racial divisions in America',
    'Died April 10, 2024 from prostate cancer',
  ]),
  perpetrator: 'O.J. Simpson was acquitted criminally but found liable in civil court. Most investigators and evidence point to Simpson as the killer. He died in 2024 without confessing.',
  victims: 'Nicole Brown Simpson (35), ex-wife of O.J. Simpson. Ronald Goldman (25), friend of Nicole who was returning her mother\'s glasses. Both stabbed at 875 South Bundy Drive, Brentwood, Los Angeles.',
  verdict: 'Criminal: Not guilty (October 3, 1995). Civil: Found liable for wrongful deaths (February 1997). $33.5 million awarded. Simpson never paid most of the judgment.',
  links: JSON.stringify([
    { label: 'Wikipedia — O.J. Simpson murder case', url: 'https://en.wikipedia.org/wiki/O._J._Simpson_murder_case', type: 'article' },
    { label: 'Netflix: American Crime Story: The People v. O.J. Simpson', url: 'https://www.netflix.com/title/80052549', type: 'documentary' },
    { label: 'ESPN: O.J.: Made in America (2016 Documentary)', url: 'https://www.imdb.com/title/tt5275892/', type: 'documentary' },
    { label: 'Court TV — Trial Archive', url: 'https://www.courttv.com/', type: 'official' },
    { label: 'Los Angeles Times — Original Trial Coverage', url: 'https://www.latimes.com/archives/', type: 'news' },
    { label: 'If I Did It — O.J. Simpson book', url: 'https://www.goodreads.com/book/show/130499.If_I_Did_It', type: 'book' },
  ]),
};

CASE_DATA['Jack the Ripper'] = {
  fullContent: `Jack the Ripper was an unidentified serial killer active in the impoverished Whitechapel district of London's East End in 1888. The name "Jack the Ripper" originates from a letter written by someone claiming to be the murderer that was widely distributed in the media. Five canonical victims are attributed to the Ripper, though some investigators claim as many as eleven.

THE CANONICAL FIVE
Mary Ann Nichols (August 31, 1888) — found in Buck's Row with her throat deeply slashed and abdomen mutilated. Annie Chapman (September 8, 1888) — found in a backyard on Hanbury Street, organs removed with apparent surgical precision. Elizabeth Stride and Catherine Eddowes (September 30, 1888) — "Double Event" night; Stride's throat cut in Dutfield's Yard; Eddowes mutilated in Mitre Square within an hour. Mary Jane Kelly (November 9, 1888) — the most extensively mutilated victim, found in her locked room at Miller's Court.

THE RIPPER LETTERS
Hundreds of letters claiming to be from the Ripper were sent to police and press. The most famous: the "Dear Boss" letter (September 25, 1888) which introduced the name Jack the Ripper and threatened to cut off ears; the "Saucy Jacky" postcard (October 1, 1888) referencing the Double Event; and the Lusk Letter (October 16, 1888) sent to Whitechapel Vigilance Committee chair George Lusk with half a preserved human kidney, claimed to be from victim Catherine Eddowes.

INVESTIGATION
The Metropolitan Police under Commissioner Sir Charles Warren investigated the case. Inspector Frederick Abberline led the Whitechapel murders investigation. Police interviewed thousands of suspects. Witness descriptions were inconsistent. The murders caused mass panic in London and exposed the desperate conditions of the East End.

THE SUSPECTS — 130+ YEARS OF THEORIES
Over 100 named suspects include: Aaron Kosminski — a Polish-Jewish barber and asylum inmate; forensic analysis in 2014 of a DNA-stained shawl allegedly from Eddowes' murder scene reportedly matched Kosminski's DNA. Montague John Druitt — a barrister who committed suicide in December 1888, coinciding with the murders stopping. Francis Tumblety — an American quack doctor arrested in 1888 for gross indecency; fled to the US. Prince Albert Victor — Duke of Clarence, Queen Victoria's grandson; considered by conspiracy theorists but largely discredited. H.H. Holmes — the American serial killer; some theorize he visited London.`,
  timeline: JSON.stringify([
    { year: '1888 Aug 31', event: 'Mary Ann Nichols murdered — first canonical victim' },
    { year: '1888 Sep 8', event: 'Annie Chapman murdered; organs removed' },
    { year: '1888 Sep 25', event: '"Dear Boss" letter received; name "Jack the Ripper" coined' },
    { year: '1888 Sep 30', event: 'Double Event — Elizabeth Stride and Catherine Eddowes murdered same night' },
    { year: '1888 Oct 1', event: '"Saucy Jacky" postcard references the double murder' },
    { year: '1888 Oct 16', event: 'Lusk Letter sent with half a human kidney' },
    { year: '1888 Nov 9', event: 'Mary Jane Kelly murdered — most brutal killing; investigation intensifies' },
    { year: '1888 Dec', event: 'Murders stop; suspect Druitt found drowned in Thames' },
    { year: '1894', event: 'Chief Constable Anderson names Kosminski as suspect in memoirs' },
    { year: '2014', event: 'DNA analysis of shawl reportedly links Aaron Kosminski' },
    { year: 'Present', event: 'Case unsolved; identity subject of ongoing debate' },
  ]),
  keyFacts: JSON.stringify([
    '5 canonical victims; all female sex workers in Whitechapel 1888',
    'Surgical precision of mutilations suggests medical knowledge',
    '"Dear Boss" letter created the Jack the Ripper name',
    'Lusk Letter sent with half a preserved human kidney',
    'Over 100 suspects named over 130+ years',
    '2014 DNA analysis reportedly linked Aaron Kosminski',
    'Murders stopped abruptly in November 1888',
    'Case was the first major UK media-driven murder investigation',
    'Exposed horrific poverty in Victorian London\'s East End',
  ]),
  perpetrator: 'Unknown. Top suspects: Aaron Kosminski (DNA link disputed); Montague John Druitt; Francis Tumblety. Over 100 suspects named. The case has never been officially solved.',
  victims: '5 canonical victims: Mary Ann Nichols, Annie Chapman, Elizabeth Stride, Catherine Eddowes, Mary Jane Kelly. All female, all sex workers in Whitechapel. Ages 25–45. Some investigators add up to 6 more victims.',
  verdict: 'Unsolved. No charges ever brought. Investigation officially closed 1892. Considered permanently cold case.',
  links: JSON.stringify([
    { label: 'Wikipedia — Jack the Ripper', url: 'https://en.wikipedia.org/wiki/Jack_the_Ripper', type: 'article' },
    { label: 'Casebook: Jack the Ripper — Definitive Resource', url: 'https://www.casebook.org/', type: 'article' },
    { label: 'Metropolitan Police Archive — Ripper Files', url: 'https://www.metpolicehistory.co.uk/', type: 'official' },
    { label: 'BBC: Jack the Ripper — The Case Reopened (2019)', url: 'https://www.bbc.co.uk/programmes/m000bgdp', type: 'documentary' },
    { label: 'Museum of London Docklands — The Ripper Exhibition', url: 'https://www.museumoflondon.org.uk/', type: 'article' },
    { label: 'Ripperology — Academic Journal', url: 'https://www.casebook.org/press_reports/', type: 'article' },
  ]),
};

CASE_DATA['Jonestown'] = {
  fullContent: `On November 18, 1978, 918 people died in Jonestown, Guyana — the largest single loss of American civilian life in a deliberate act until September 11, 2001. The Peoples Temple Agricultural Project, known as Jonestown, was a commune built in the Guyanese jungle by the Peoples Temple, an American cult led by Reverend Jim Jones.

JIM JONES AND PEOPLES TEMPLE
James Warren Jones founded the Peoples Temple in Indianapolis in 1955, preaching racial integration at a time of segregation. The church grew rapidly, attracting thousands of members including many poor Black Americans. Jones cultivated a progressive image, preaching socialism mixed with Christian theology. He moved the church to California in the 1960s, establishing megachurches in San Francisco and Los Angeles.

JONESTOWN
As scrutiny of his practices grew — including allegations of physical abuse, financial exploitation, and holding members against their will — Jones moved around 1,000 followers to remote jungle in Guyana in 1977, building an agricultural commune. Life in Jonestown involved brutal discipline: members were beaten, denied sleep, subjected to "White Night" rehearsals for mass suicide, and forbidden from leaving.

THE CONGRESSIONAL VISIT
In November 1978, Congressman Leo Ryan flew to Jonestown to investigate concerns from families of members. After a tense visit in which some Jonestown residents slipped notes to Ryan asking for rescue, Ryan agreed to take defectors back to the US. At the Port Kaituma airstrip, Peoples Temple gunmen attacked the delegation, killing Congressman Ryan, three journalists, and a defector.

THE MASS DEATH
Hours later, back at Jonestown, Jim Jones ordered the "revolutionary suicide." A large metal vat of grape punch mixed with cyanide, Valium, Phenergan, and chloral hydrate was prepared. Children were first — nurses injected them with cyanide syringes. Parents then drank, followed by adults. 918 people died. Jones himself died of a gunshot wound to the head. Audio recordings captured Jones urging followers to "die with dignity" while crying children are heard in the background.

THE TAPE
FBI evidence tape Q042 — known as the "Death Tape" — records 44 minutes of the final event. Jones can be heard saying: "Die with a degree of dignity. Lay down your life with dignity; don't lay down with tears and agony... I tell you, I don't care how many screams you hear, I don't care how many anguished cries... death is a million times preferable to ten more days of this life."`,
  timeline: JSON.stringify([
    { year: '1955', event: 'Jim Jones founds Peoples Temple in Indianapolis' },
    { year: '1960s', event: 'Church moves to California; San Francisco megachurch established' },
    { year: '1977', event: 'Jonestown commune built in Guyana; ~1,000 members relocate' },
    { year: '1978 Nov 14', event: 'Congressman Leo Ryan flies to Jonestown to investigate' },
    { year: '1978 Nov 17', event: 'Ryan witnesses defectors seeking escape; agrees to take them' },
    { year: '1978 Nov 18 PM', event: 'Gunmen attack Port Kaituma airstrip; Ryan, 3 journalists, 1 defector killed' },
    { year: '1978 Nov 18 Evening', event: 'Jones orders mass suicide; 918 die including 304 children' },
    { year: '1979', event: 'FBI recovers 900+ hours of Peoples Temple recordings' },
    { year: '1980s', event: '"Drinking the Kool-Aid" enters American lexicon' },
  ]),
  keyFacts: JSON.stringify([
    '918 people died — largest US civilian mass death pre-9/11',
    '304 children killed; many injected with cyanide by nurses',
    'A US Congressman (Leo Ryan) murdered — only time in US history',
    '"Death Tape" Q042 records Jim Jones ordering mass death',
    'Cult rehearsed mass suicide with fake "White Nights"',
    'Actually used Flavor Aid punch, not Kool-Aid',
    'Jones died of gunshot — possibly self-inflicted',
    '"Drinking the Kool-Aid" phrase originates here',
    'FBI recovered 900+ hours of Peoples Temple audio recordings',
  ]),
  perpetrator: 'Jim Jones (May 13, 1931 – November 18, 1978), founder and leader of the Peoples Temple. Cult leader who exploited vulnerable people for decades before ordering mass murder-suicide.',
  victims: '918 dead including 304 children. Congressman Leo Ryan, journalists Don Harris, Bob Brown, Greg Robinson, and defector Patricia Parks killed at airstrip. Youngest victim was an infant.',
  verdict: 'Jim Jones died at the scene. No criminal trial. Several surviving Peoples Temple members in the US faced scrutiny but no major prosecutions. The murders of Congressman Ryan and journalists remain among the most shocking political crimes in US history.',
  links: JSON.stringify([
    { label: 'Wikipedia — Jonestown', url: 'https://en.wikipedia.org/wiki/Jonestown', type: 'article' },
    { label: 'FBI — Jonestown Evidence Files (900+ recordings)', url: 'https://vault.fbi.gov/jonestown', type: 'official' },
    { label: 'Death Tape Q042 — FBI Audio', url: 'https://www.youtube.com/watch?v=2JGMTb_4PaE', type: 'video' },
    { label: 'CNN: Witness to Jonestown (Documentary)', url: 'https://www.imdb.com/title/tt1320082/', type: 'documentary' },
    { label: 'Alternative Considerations of Jonestown — San Diego State', url: 'https://jonestown.sdsu.edu/', type: 'article' },
    { label: 'Jonestown: The Life and Death of Peoples Temple (2006)', url: 'https://www.imdb.com/title/tt0492222/', type: 'documentary' },
  ]),
};

// ═══════════════════════════════════════════════════════════════════════════
//  APPLY ENRICHMENT TO DATABASE
// ═══════════════════════════════════════════════════════════════════════════
async function main() {
  console.log('\n📚 Enriching cases with detailed content...\n');

  const allCases = await prisma.case.findMany();
  let updated = 0;
  let skipped = 0;

  for (const c of allCases) {
    // Find matching enrichment by title fragment
    const matchKey = Object.keys(CASE_DATA).find(key =>
      c.title.toLowerCase().includes(key.toLowerCase()) ||
      key.toLowerCase().includes(c.title.toLowerCase().split(' ').slice(0, 3).join(' '))
    );

    if (!matchKey) {
      skipped++;
      continue;
    }

    const data = CASE_DATA[matchKey];
    await prisma.case.update({
      where: { id: c.id },
      data: {
        fullContent: data.fullContent || c.fullContent,
        timeline:    data.timeline    || null,
        keyFacts:    data.keyFacts    || null,
        perpetrator: data.perpetrator || null,
        victims:     data.victims     || null,
        verdict:     data.verdict     || null,
        links:       data.links       || null,
      }
    });

    updated++;
    console.log(`  ✓ Enriched: ${c.title}`);
  }

  console.log(`\n✅ Done!`);
  console.log(`   Enriched : ${updated} cases`);
  console.log(`   Skipped  : ${skipped} cases (no match — use admin panel to add details)`);
  console.log(`\n   Refresh http://localhost:5173/cases to see the updated detail pages.\n`);
}

main()
  .catch(err => { console.error('Error:', err.message); process.exit(1); })
  .finally(() => prisma.$disconnect());
