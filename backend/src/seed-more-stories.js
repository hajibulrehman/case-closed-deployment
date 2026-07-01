require('dotenv').config();
const prisma = require('./utils/prisma');
const { getStoryImageUrl } = require('./utils/storyImage');

// Store the raw Unsplash URL — the frontend proxies it at render time
const STORIES = [];

STORIES.push({
  caseTitle: 'JonBenét Ramsey',
  title: 'The Name on the Note',
  genre: 'mystery',
  tags: 'jonbenét,cold-case,detective,alternate-ending,boulder',
  content: `The handwriting analyst had been staring at the same eleven letters for four hours.

Her name was Dr. Vera Castillo, and she had spent twenty-two years identifying forgeries, authenticating manuscripts, and testifying in federal court. She had a reputation for two things: extreme precision and an almost pathological refusal to speculate beyond what the evidence supported.

The ransom note from the Ramsey home sat in a protective sleeve on her light table. 370 words. Written with a Sharpie felt-tip marker on a pad of paper found inside the house. Demanded $118,000 — the precise amount of John Ramsey's Christmas bonus, a detail only someone with intimate knowledge of the family's finances would know.

She had compared it against 73 handwriting samples collected from people connected to the family. The analysis had ruled out 71 of them with confidence. The remaining two were inconclusive.

But tonight she was looking at something different.

She had obtained — through a contact at the Boulder DA's office who trusted her discretion — a second sample. A handwritten note from 1989. A thank-you card.

She placed them side by side.

The letter formations were different. Obviously different — anyone could see that. But handwriting analysts didn't look at letter formations. They looked at pressure patterns, pen angle, the specific way the writer handled transitions between letters, the micro-variations that survived conscious attempts at disguise.

Vera looked at the pressure patterns.

She set down her magnifying glass and sat very still for a long time.

Then she picked up the phone and called Detective Sergeant Marcus Webb, who had been assigned to the Ramsey cold case for the past three years and who picked up on the second ring because he never fully slept when a case was active.

"I need you to come in," she said.

"What did you find?"

She looked at the two documents on her light table.

"I found that someone in that house wrote both of these," she said. "Someone who tried very hard to disguise their handwriting and almost succeeded. The tell is in the descenders — the way the lowercase letters g and y drop below the baseline. Under conscious control, you can change almost everything. But the pressure pattern of a descender is motor memory. It lives in your hand below the level of conscious thought."

The silence on the line lasted seven seconds.

"Who?" Marcus said.

Vera thought about the twenty-two years. The federal trials. The carefully worded expert testimonies. The discipline of saying only what the evidence could definitively support.

She thought about a six-year-old girl and a basement and thirty years of no answers.

"Come in," she said. "I'll show you the documents. But Marcus — bring a warrant."

She hung up.

Outside her window the Boulder night was clear and very cold, and somewhere across the city in a house she had never visited, a family that had spent three decades living under suspicion was sleeping, or not sleeping, the way people sleep when the past has never fully become the past.

Vera turned off the light table.

She waited.`
});

STORIES.push({
  caseTitle: 'The Golden State Killer',
  title: 'The Woman He Called Back',
  genre: 'thriller',
  tags: 'golden-state,cold-case,survivor,1970s,California',
  content: `The phone call came at 11:47 PM, which was the same time they always came.

Carol Daly had been a Sacramento County Sheriff's detective for nineteen years. She had worked the East Area Rapist case since 1977. She had personally interviewed forty-three victims. She had sat in her car outside crime scenes and wept exactly once, on a Tuesday in March 1978, and then had not wept again because weeping was not useful and she did not have time for things that were not useful.

The call was from a victim she had interviewed seven years ago. A woman named Susan. Susan had been twenty-four when it happened. She was thirty-one now and living in Sacramento and had called the tip line three times in the past two years with information that was not quite enough.

"He called me again," Susan said.

Carol sat up straight.

"Tonight?"

"Twenty minutes ago. Same voice. He said—" A pause. The specific pause Carol recognised as the one that happened when someone was deciding whether saying the thing out loud would make it more real or less. "He said he hadn't forgotten me. That he thinks about me."

"Did you record it?"

"I got the last forty seconds. I had the machine ready. I've had it ready for a year."

Carol was already standing, already reaching for her jacket with the hand that wasn't holding the phone.

"I'm coming over," she said. "Don't touch the machine. Don't call anyone else."

She drove to Susan's house in fourteen minutes. She sat at Susan's kitchen table and listened to the tape. The voice was the same one she had heard described forty-three times. A voice that was deliberately controlled, that had practised its own flatness, that could pass for ordinary in a grocery store or a parking lot or a neighbourhood watch meeting.

She listened to the forty seconds four times.

Then she said: "Susan, I need to ask you something, and I need you to think carefully."

"Okay."

"In the background of that call. There's a sound at the twenty-third second. It repeats twice. Can you hear it?"

Susan listened.

"It sounds like—" She paused. "Like an intercom? Like someone being called?"

Carol took a breath.

"It sounds like a factory PA system," she said. "And the specific cadence of what's being said — I've been in the industrial side of Sacramento for twenty years. That sound." She looked at Susan. "That's a truck assembly line. There are two within calling distance of a payphone. I know which one because I drove past both of them three months ago when I was trying to map possible routes."

She stood up.

"I'm going to need to make some calls," Carol said. "You did everything right. The machine. Being ready. All of it." She paused. "He made a mistake tonight. People who think they're untouchable always make a mistake eventually. They can't help themselves. They need to feel it."

Susan looked at her.

"Will you catch him?"

Carol Daly had been a detective for nineteen years and had learned not to promise outcomes. But she thought about forty-three women and seven years and forty seconds on a tape recorder.

"Yes," she said. "I think we're going to catch him."

She was right.

It took eight more months. But she was right.`
});

STORIES.push({
  caseTitle: 'Charles Manson',
  title: 'Family',
  genre: 'horror',
  tags: 'manson,cult,1960s,psychological,escape,alternate',
  content: `She had been with the Family for eleven months when she understood what Charlie was.

Her name was Rose, though Charlie called her Petal, and she had come to the ranch in April 1968 with a guitar and a heartbreak and the particular kind of hunger that made young women in 1968 easy to find and easier to keep. Charlie had seemed — for the first weeks — like the answer to a question she hadn't known she was asking. He spoke about love and freedom and the rot at the center of American society, and he was right about the rot, he was genuinely right about that, and the rightness of the small things made the larger things easier to accept.

The larger things.

Rose had grown up in a house where she learned to read the temperature of a room before she entered it. Her mother had been the kind of woman whose moods changed with a quality like weather, and Rose had developed, by the age of nine, an almost physical sensitivity to the emotional atmosphere of enclosed spaces.

In the early days at Spahn Ranch, she had read the atmosphere as warmth. Communal. Something true.

By February 1969 she was reading something else.

She couldn't name it precisely, not at first. It was in the way Charlie watched people — not seeing them but calculating them. The way his lessons had slowly moved, over months, from love and liberation toward something that had a direction to it, a trajectory. The way certain members of the Family — Tex, Katie, Sadie — had a look in their eyes now that Rose recognised because she had seen it in her mother, in the late evenings when the mood had shifted past a certain point.

The look of people who had been convinced that the normal rules did not apply to them.

In April 1969, Rose left.

She did not tell anyone. She waited until a Tuesday afternoon when Charlie was occupied and most of the others were in the lower field, and she walked to the highway with her guitar and twelve dollars and a feeling in her chest like a door closing on something she was grateful to have left behind.

She hitchhiked to Sacramento. She called her sister from a payphone. She slept on her sister's couch and woke up every morning for the next four months and tried to think clearly about what she had seen and who she had been in the eleven months at the ranch.

On August 9th, 1969, she read the newspaper at the kitchen table while her sister made coffee.

She read it twice.

Then she put it down and sat very still for a long time, thinking about the eleven months and the trajectory she had felt building and the particular weight of having seen something coming and having gotten out.

She called the LAPD that afternoon.

She told them everything she knew — the ranch, the members, the guns, the escalating rhetoric, the names.

She was one of eleven former Family members who called in the weeks after the murders.

Her information was part of what led investigators to Spahn Ranch.

She testified at the trial.

She spent the rest of her life doing something she had not expected: forgiving herself for the eleven months she had stayed, and for the four months between leaving and calling, and for all the small moments of looking the other way that had accumulated before she finally understood what she was looking at.

Forgiveness was not an event. It was a practice.

She practiced it every day for the rest of her life.`
});

STORIES.push({
  caseTitle: 'The Assassination of John F. Kennedy',
  title: 'The Third Shot',
  genre: 'thriller',
  tags: 'JFK,conspiracy,alternate-history,1963,Dallas,thriller',
  content: `The second shot missed.

That was the part nobody ever talked about, because by the time the official record was constructed, a missed shot was an inconvenient complication in the theory of a lone, determined gunman with a clear purpose and a clear line of fire.

But Agent Sandra Reyes had been standing on the far side of the motorcade, and she had heard three shots, not two, and the third one had not come from the direction of the book depository.

She was twenty-seven years old and had been with the Secret Service for three years and had grown up in a family where you did not say things without evidence. So she had said nothing immediately. She had done her job: she had moved toward the limousine, she had swept the crowds, she had followed every protocol she had been trained to follow.

But in the car afterward, riding back to Parkland, she had taken out her notepad and written down what she had heard in the order she had heard it.

Shot one: book depository direction. 12:30:07.
Sound of impact.
Shot two: book depository direction. 12:30:08.5. One second gap. No impact sound observed by me.
Shot three: grassy knoll direction. 12:30:10. Two second gap.

She had stared at the notepad for a long time.

Then she had sealed it in an evidence envelope and signed her name across the seal.

Three days later she requested a meeting with Special Agent in Charge Rowley. He had listened to her for twenty minutes with the particular expression of someone who was hearing something they wished they were not hearing.

"You understand what you're saying," he said. It was not a question.

"I understand what I heard," Sandra said.

"This will create—" He paused. "The investigation is already complex."

"I know."

"If this becomes part of the record—"

"It's already part of the record," Sandra said. "I sealed it and logged it the day it happened. I'm telling you now as a courtesy and because you're my superior officer. But the envelope exists. Whatever you decide about the investigation, the envelope exists."

Rowley looked at her for a long moment.

"You're very young," he said.

"Yes sir."

"That kind of thing—" He stopped. Started again. "The country is in a very fragile state."

"I know, sir."

"Sometimes the truth—"

"I heard three shots," Sandra said. "One of them came from the grassy knoll. I logged it three days ago and it's in the chain of evidence. What happens next is above my pay grade. But it happened."

She stood up.

"I'm going back to Dallas tomorrow to finish the canvass," she said. "I thought you should know about the envelope before you read about it somewhere else."

She left his office.

The envelope remained in the chain of evidence.

It was transferred to the Warren Commission in January 1964.

Whether anyone read it carefully enough to understand what it said was a question Sandra Reyes spent the next forty years not being able to answer.

But it was there.

That much she knew.

The record was honest, whatever the conclusions were.

That was the only thing she had ever been able to control.`
});

STORIES.push({
  caseTitle: 'Jeffrey Dahmer',
  title: 'Apartment 212',
  genre: 'horror',
  tags: 'dahmer,Milwaukee,horror,psychological,neighbor-perspective',
  content: `Glenda lived in apartment 212.

He lived in 213.

She had noticed the smell first in October, then again in December, and both times she had told herself it was probably the dumpsters behind the building, or the drain in the hallway, or any of the dozen ordinary urban explanations for smells that sometimes rose through the walls of old buildings in Milwaukee.

She was sixty-three years old and had lived in the building for eleven years and had learned to accept the building's particular anatomy — its sounds and its silences and its smells — the way you accept the anatomy of a body you have lived in long enough to know well.

But the smell in January was different.

Not the dumpster smell. Not the drain smell.

She couldn't describe it precisely, not in words she was comfortable using, and so she didn't describe it, not even to herself.

She knocked on his door once, in February, to ask if he had a drain problem she should mention to the landlord. He had answered promptly, in a clean shirt, with polite eyes and a calm voice and an explanation about a dead mouse in the wall that seemed plausible enough to accept.

She had accepted it.

In March she called her daughter in Minneapolis and mentioned the smell again, and her daughter said maybe she should say something to the building manager, and Glenda said she probably would.

In April she wrote the building manager a note. She folded it. She put it in her purse.

She found it there, still folded, in July, when everything had already happened, and the police had already been there for three days, and the television trucks were parked outside the building in a row, and the other tenants were standing in the hallway looking at each other with the specific expression of people trying to understand how they had been living adjacent to something without knowing it.

Glenda sat in her apartment with the folded note in her hand.

She thought about October. December. January. February. The explanation about the mouse. The polite eyes.

She had a good life. A long, mostly ordinary life. She had been kind to her neighbours, all of them, over eleven years, and she had minded her own business the way you mind your own business when you live in a city and you understand that everyone is carrying something you can't see.

She unfolded the note.

The handwriting was neat. The complaint was specific. The date on the note was April 3rd.

She sat with it for a long time.

Then she called her daughter.

"I wrote the note," she said, when her daughter answered.

"Mum?"

"I wrote it in April. I had it in my purse the whole time."

The silence on the line was long and very gentle, the silence of a daughter who understood that her mother did not need reassurance right now, needed only to be heard.

"You couldn't have known," her daughter said finally.

"No," Glenda said.

She folded the note again.

She held it.

"No. I couldn't have known."

But she held it for the rest of the evening, sitting in apartment 212 with the TV off and the street sounds coming through the window, trying to make the arithmetic of small decisions and missed chances add up to something she could live with.

It never quite did.

That was the thing about proximity. It didn't require knowledge to leave a mark.`
});

STORIES.push({
  caseTitle: null,
  title: 'The Evidence Room',
  genre: 'mystery',
  tags: 'cold-case,evidence,detective,mystery,wrongful-conviction',
  content: `The evidence room was in the basement of the old courthouse, and it smelled like time.

Detective Lieutenant Nadia Osei had spent the last fourteen years in homicide and the last six months working cold cases, which was a different kind of work — quieter, more archival, requiring a tolerance for the specific frustration of finding things that should have mattered years ago but had been missed, misfiled, or simply never looked at carefully enough.

Box 2947-C had been checked out twice in the last thirty-two years. Once by the original investigating detective in 1991, and once by a paralegal in 2003 who had pulled it for a habeas petition that had ultimately been denied.

Nadia was looking at it for the third time.

The case was straightforward in the way that cold cases were never actually straightforward: a man named Daniel Reyes had been convicted in 1991 of murdering his neighbour, based primarily on the testimony of two witnesses and a partial fingerprint on a window latch. He was currently serving year thirty-three of a life sentence at a correctional facility in upstate New York, and he had maintained his innocence every year of those thirty-three.

Nadia opened box 2947-C.

Inside: a plastic bag containing one partial fingerprint card. One transcript of witness interviews. One evidence log from the crime scene. One photograph envelope.

She opened the photograph envelope first, because photographs were the thing that most often told you something the written record had suppressed or overlooked.

Forty-seven photographs.

She went through them slowly, the way you went through old photographs — not looking for anything specific, just looking.

At photograph thirty-one she stopped.

It showed the window latch.

The partial fingerprint had been found on the interior face of the latch — consistent, the original detective had concluded, with someone reaching through a broken pane to open the window from outside.

But in photograph thirty-one, taken from a slightly different angle than the others, something was visible that was not visible in any of the other photographs.

A second mark.

Not a fingerprint. A smear, really. A long, curved smear at the base of the latch, below where the partial print had been recovered.

Nadia looked at it for a long time.

Then she looked at the evidence log.

The smear was not on the evidence log.

She pulled up the original case file on her laptop and searched for any reference to the smear, any mention of a second mark on the latch, any note from the crime scene technician.

Nothing.

It had been photographed. It had not been logged.

Which meant either someone had not noticed it, or someone had noticed it and decided it was not important, or someone had noticed it and decided it was important for reasons that were not in the file.

Nadia put the photograph down.

She picked up the phone.

She called the DNA lab.

"I have a thirty-two-year-old piece of evidence," she said. "A smear on a metal surface. I don't know if there's anything recoverable. But I need you to try."

The technician on the other end of the line made the particular sound of someone doing a mental calculation about backlog and feasibility.

"We can try," she said finally. "No promises."

"No promises," Nadia agreed.

She sat in the evidence room for another hour, in the smell of time, looking at photograph thirty-one.

Thirty-three years.

If there was something in the smear — if the smear was the thing nobody had looked at because nobody had been looking at it from the right angle — then thirty-three years was going to demand a reckoning from someone.

Nadia was prepared for that.

That was what the job was.

Looking at things from the right angle until the truth of them became impossible to ignore.`,
});

STORIES.push({
  caseTitle: null,
  title: 'Last Known Address',
  genre: 'thriller',
  tags: 'missing-person,journalist,investigation,thriller,cold-case',
  content: `Her last known address was a studio apartment in Queens.

The journalist who had been assigned to write about her — a thirty-six-year-old staff writer at a weekly named Marco Chen who had taken the assignment because his editor thought a human interest piece about missing persons statistics would generate clicks — had expected to spend an afternoon at the address and then write something economical and sympathetic and move on.

That was not what happened.

The woman who answered the door of the apartment across the hall was eighty-one years old and had lived in the building for forty years and had a memory that operated like a filing cabinet.

"Amy," she said, when Marco showed her the photograph. "Amy Delacroix. She moved in in October. Very quiet. Computer type. She had a cat."

"When did you last see her?"

"March 14th." The woman didn't hesitate. "I know because it was my granddaughter's birthday and I was in the hall getting a delivery when Amy came out of her apartment with a box. A computer bag and a box. I said happy to see you, are you moving? She said she needed to go somewhere. She had the look—" The woman paused. "The look people have when they're in a hurry but also frightened. You learn to recognise it when you've lived long enough."

Marco wrote it down.

In the next three hours, he talked to: the building super (Amy had paid her rent six months in advance in cash in November), a woman at the coffee shop on the corner (Amy came in every morning, always paid cash, always sat with her back to the wall), and a man at the library three blocks away who ran the digital literacy program and remembered Amy because she had asked him about encrypted messaging apps in January.

Encrypted messaging apps.

Cash rent, paid six months in advance.

Back to the wall.

Marco sat on a bench outside the library and looked at his notebook.

He was a features journalist. He wrote about food trends and neighbourhood politics and the occasional human interest story about missing persons statistics.

He was not an investigative reporter.

He called his editor.

"I think this story is bigger than we thought," he said.

"How much bigger?"

Marco looked at his notebook. At the progression of details that individually were explainable and collectively were not.

"Amy Delacroix knew someone was looking for her," he said. "She was hiding from something specific. Six months in advance rent. Cash. She was preparing an exit months before she used it."

"You're saying she's not missing," his editor said slowly. "You're saying she left."

"I'm saying she ran." Marco stood up. "And I want to find out what she was running from."

The story took four months to report.

It ran as a 6,000-word feature.

It won a prize.

It was not about Amy Delacroix.

It was about what Amy had found — and what had found her first.

That was the thing about missing persons stories, Marco had learned. Sometimes the disappearance was the least interesting part.`
});

STORIES.push({
  caseTitle: 'The Zodiac Killer',
  title: 'Z14',
  genre: 'thriller',
  tags: 'zodiac,cipher,1969,alternate-ending,San-Francisco,mystery',
  content: `The fifth cipher arrived on a Thursday.

Nobody had been expecting it. The Zodiac had sent four; cryptographers had been working on them for months; the case had reached a kind of terrible stasis, a holding pattern of fear and investigation that the city of San Francisco had been living inside since the summer.

But the fifth cipher arrived, and it was different from the others.

It was fourteen characters.

The other ciphers had been 408, 340, 13, and 32. This one was 14 — not long enough for any standard statistical analysis, not short enough to be obviously simple. The cryptographers at SFPD looked at it and immediately called the FBI. The FBI called a professor at Berkeley. The Berkeley professor called a colleague in Washington who had done wartime cryptanalysis and who was, at eighty-three, the sharpest mind working on historical cipher problems in the country.

Her name was Dr. Eleanor Marsh, and she had cracked six Nazi ciphers during the war and had spent the subsequent decades teaching and consulting and maintaining the specific useful bitterness of someone who had seen what people did with secrets.

She received the cipher by fax at 7 AM. She had her response by noon.

It was not a cipher.

It was a key.

Specifically: it was the key to the Z340, which had been sitting in the FBI's cryptanalysis unit for two years, examined by dozens of experts, and not broken.

With the key, the Z340 took Dr. Marsh fourteen minutes.

She read the decoded message once.

Then she read it again.

Then she sat in her kitchen in Berkeley with a cup of tea going cold in her hands and thought about the implications of what she had just read.

The message gave an address. A real address in Vallejo. A date — October 27, 1969, which was three days from now. And a name. Not the Zodiac's name. A different name. A name she recognised from the investigation.

Someone had sent the key because someone wanted the message to be read.

The question was: who sent the key, and why now?

Dr. Marsh called SFPD.

"I need to speak to whoever is leading the Zodiac investigation," she said. "And I need to speak to them in person, not on the phone."

"May I ask what this is regarding?"

"I've decoded the Z340," she said. "And whatever you think the Zodiac case is, I need you to understand that it may be considerably more complicated than that."

Three days later, at the address in Vallejo, they found a man.

Not a body.

A man, alive, who had been waiting.

The rest of what happened that October is not in any public record.

But Dr. Eleanor Marsh, who had cracked six Nazi ciphers and spent forty years maintaining her useful bitterness, told her granddaughter before she died that the hardest secrets were not the ones that took years to crack.

They were the ones that turned out, once cracked, to mean something you hadn't been prepared to know.`
});

STORIES.push({
  caseTitle: null,
  title: 'Reasonable Doubt',
  genre: 'drama',
  tags: 'wrongful-conviction,justice,courtroom,drama,exoneration',
  content: `The jury had taken forty minutes.

Forty minutes to decide that Marcus Webb, twenty-three years old, had murdered a man he had never met in a parking lot three blocks from his apartment at 11:15 PM on a Thursday in November.

The evidence: one eyewitness, who had been forty feet away in poor light. One piece of security footage, blurry, showing a man in a dark jacket who was approximately Marcus's height and build. No physical evidence. No DNA. No weapon.

The eyewitness was certain.

In the jurisprudence of certainty, there is a kind of witness that juries find irresistible: the witness who does not waver, who does not qualify, who does not say "I think" or "I believe" but simply says "I saw." Sandra Park had said, four times, in clear and steady language: I saw that man shoot Leon Greer. I am certain.

Marcus Webb had said, four times, in clear and steady language: I was home. I was watching television. I did not leave my apartment that night.

He had no alibi witness.

He had been sentenced to twenty-five years.

He had served eleven of them when Camille Reyes, a third-year law student working on an innocence clinic case for course credit, pulled his file almost at random because she had forty-five minutes before her next class and it was the top of the pile.

She was not expecting to find anything.

She found three things.

First: a notation in the original case file indicating that a second piece of security footage had been reviewed and found "inconclusive." The footage itself was not in the file. The name of the person who had reviewed it was not logged.

Second: Sandra Park's original police statement, taken two hours after the shooting, which described the shooter as wearing a grey jacket. At trial she had testified to a dark jacket. Marcus Webb had owned grey jackets and dark jackets and the distinction had not been raised.

Third: a single line in the medical examiner's supplemental notes, written six months after the trial during a review of a different case, which noted that the angle of the entry wound in Leon Greer was "consistent with a shooter of approximately 6'2" to 6'4"." Marcus Webb was five feet ten.

Camille sat with the file for the remaining forty minutes.

Then she called her supervising attorney.

"I think I found something," she said.

"How significant?"

Camille looked at the three things.

"Significant enough that a man has been in prison for eleven years," she said, "and I think we can get him out."

It took two more years.

It took depositions and motions and a hearing before a judge who had the particular courage it required to look at a verdict her colleagues had delivered and say: the verdict was wrong.

Marcus Webb walked out of Rikers Island on a Tuesday morning in April.

He was thirty-six years old.

He stood on the sidewalk outside the prison in a shirt his mother had brought him and looked at the street with an expression that Camille, who was standing ten feet away, would describe for the rest of her life as the most complicated thing she had ever seen on a human face.

Not joy. Not relief. Not anger.

Something beneath all of those. Something that needed more than one word.

She shook his hand.

"Thank you," Marcus said.

"I'm sorry it took so long," Camille said.

He nodded. The nod that meant: I know. I know it isn't your fault. I know the system is what it is. I know that what happened cannot be given back.

And also: I know that someone looked. And that matters.

Camille Reyes did not go into corporate law.

She went into innocence work.

She spent the next thirty years looking at files.

Every single one of them.`
});

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log('\n📖 Seeding additional fiction stories...\n');

  const author = await prisma.user.findFirst({ where: { role: 'admin' }, orderBy: { createdAt: 'asc' } });
  if (!author) { console.error('No admin user found.'); process.exit(1); }

  const allCases = await prisma.case.findMany({ select: { id: true, title: true } });

  let added = 0, skipped = 0;
  for (const s of STORIES) {
    const exists = await prisma.story.findFirst({ where: { title: s.title } });
    if (exists) { skipped++; continue; }

    let caseId = null;
    if (s.caseTitle) {
      const match = allCases.find(c =>
        c.title.toLowerCase().includes(s.caseTitle.toLowerCase()) ||
        s.caseTitle.toLowerCase().includes(c.title.toLowerCase().split(' ').slice(0,3).join(' '))
      );
      if (match) caseId = match.id;
    }

    const storyRow = await prisma.story.create({
      data: {
        title:    s.title,
        content:  s.content,
        authorId: author.id,
        caseId,
        type:     'fantasy',
        status:   'published',
        genre:    s.genre,
        tags:     s.tags,
        views:    Math.floor(Math.random() * 1200) + 100,
      }
    });

    // Assign image — store raw URL, frontend proxies it
    const raw = getStoryImageUrl(storyRow.id, s.genre);
    await prisma.story.update({
      where: { id: storyRow.id },
      data:  { coverImage: raw }
    });

    added++;
    console.log(`  ✓ [${s.genre.padEnd(9)}] "${s.title}"${caseId ? ' → linked' : ''}`);
  }

  console.log(`\n✅ Done! ${added} stories added, ${skipped} skipped.\n`);
}

main().catch(err => { console.error(err.message); process.exit(1); }).finally(() => prisma.$disconnect());
