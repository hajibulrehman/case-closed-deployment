/**
 * Seeds detailed fictional stories into the platform.
 * Run: node src/seed-stories.js
 */
require('dotenv').config();
const prisma = require('./utils/prisma');
const { getStoryImageUrl } = require('./utils/storyImage');

const STORIES = [];

// ─── Story 1 ──────────────────────────────────────────────────────────────────
STORIES.push({
  caseTitle: 'Zodiac Killer',
  title: 'The Cipher That Saved Me',
  genre: 'thriller',
  tags: 'zodiac,cipher,detective,alternate-history,1970s',
  content: `The letter arrived on a Tuesday, same as all the others.

Detective Margaret Hollis had been with the San Francisco Police Department for eleven years, and in that time she had learned to recognize the Zodiac's letters by their smell alone — a faint chemical tang of drugstore envelope glue mixed with something older, something that reminded her of the inside of a library on a hot day.

She held it up to the light without opening it.

"That's the fourth one this month," said her partner, Danny Reyes, not looking up from his typewriter.

"Third," she corrected. "The one in February was a copycat. Wrong paper stock."

Danny finally looked up. "How do you even know that?"

Margaret set the envelope down on her desk very carefully, as though it were sleeping. "Because I've been doing this for four years, Danny. Because I have read every letter this man has ever written three hundred times. Because at 2 AM when you're home with your family, I'm still here reading them."

She pulled on latex gloves — they weren't standard issue yet in 1971, she'd bought them from a pharmacy — and slit the envelope along its top edge.

The cipher inside was different.

She knew it immediately. The previous ciphers had used a substitution pattern with astrological symbols, a private alphabet designed to feel alien. This one used numbers. Clean, simple, three-digit numbers separated by dashes.

297-114-533-271-448-019...

Margaret copied the sequence onto a fresh sheet of paper, then pinned the original to the corkboard behind her desk alongside the others. Forty-seven letters. Four ciphers. Thirteen confirmed victims. One name she'd whispered to herself so many times it had lost all meaning: Z.

She worked through the night, alone in the empty bullpen, the city outside the window dripping with January fog.

By 4 AM she had something.

It wasn't a substitution cipher at all. It was a book cipher — each three-digit number referred to a page, line, and word in a specific published book. She'd seen this technique before in a lecture at Quantico given by a visiting FBI cryptologist, a woman named Dr. Chen who had a PhD from MIT and smelled of coffee and cigarettes and absolute certainty.

The question was: which book?

Margaret closed her eyes and thought about what she knew about the Zodiac. He was educated. He read newspapers obsessively — he referred to specific articles, specific dates. He was narcissistic, needed an audience, needed to believe he was smarter than everyone looking for him. He had a flair for the dramatic. He had mentioned, in an early 1969 letter, that killing was "more fun than hunting."

Hemingway. She'd thought it before and pushed it away. Too obvious. The Zodiac wasn't obvious; he was theatrical.

She went to the break room, which had a small shelf of books that officers and their spouses had donated over the years. Dog-eared paperbacks mostly. A few hardcovers.

And there, between a 1967 almanac and a water-damaged copy of Catch-22, was a copy of The Most Dangerous Game by Richard Connell.

Her hands were trembling as she brought it back to her desk.

Page 29, line 11, word 4.

I.

Page 114, line 3, word 1.

AM.

Page 53, line 3, word 2.

NOT.

Page 27, line 14, word 8.

FINISHED.

Margaret sat very still for a long moment.

Then she kept decoding.

Over the next hour the message assembled itself, word by word, like a photograph developing in a darkroom.

I AM NOT FINISHED. YOU ARE LOOKING IN THE WRONG PLACE. I LIVE AMONG YOU. I DRIVE A CAR YOU HAVE SEEN. I HAVE A NAME YOU KNOW. LOOK AT THE MAN WHO DELIVERED THIS LETTER.

She stood up so fast her chair rolled back and hit the wall.

She ran to the mail room.

The night mail clerk, a quiet man named Gerald, was eating a sandwich and reading the Chronicle. He looked up at her with mild, incurious eyes.

"Gerald," she said, breathing hard. "Who delivered the Zodiac letter? The one that came in tonight."

Gerald set down his sandwich. "Nobody delivered it tonight, Detective. It was in the morning batch. Yesterday morning."

"Who handles the morning batch?"

"That'd be the regular sorter. Starts at 6 AM."

"Who is he?"

Gerald looked at the schedule on his wall. "Name on the roster is R. Allen. Richard Allen."

The room tilted slightly.

Margaret had interviewed a man named Richard Allen two years ago. A soft-spoken man with polite eyes and a very clean car. A man who had politely answered every question and then politely shown her out, and who she had marked in her notes as unlikely suspect, cooperative, no red flags.

She drove to his house at 5 AM with Danny and four uniformed officers.

He was gone.

But in the basement they found everything.

The typewriter. The stamps. The astrological symbol charts carefully hand-drawn in a leather notebook. Photographs she would never fully describe in any report. And on the kitchen table, as though left intentionally, a single piece of paper with one sentence typed in the Zodiac's familiar typeface:

I knew you'd figure it out eventually. I just wanted you to know I let you.

Margaret stood in that kitchen for a long time.

The fog had burned off by the time they came back outside. For the first time in four years the city looked, briefly, like somewhere a person could be safe.

They never caught him.

But he never killed again.

And Margaret Hollis spent the rest of her career wondering if that was because she had found him — or because he had finally decided, for reasons only he understood, that the game was over.`,
});

// ─── Story 2 ──────────────────────────────────────────────────────────────────
STORIES.push({
  caseTitle: 'Jeffrey Dahmer',
  title: 'The Last Apartment',
  genre: 'horror',
  tags: 'psychological,horror,alternate-ending,dark-fiction,Milwaukee',
  content: `The boy at the bus stop had brown eyes and a cautious smile and his name was Marcus, though he hadn't told the man that yet.

The man had approached him the way you'd approach a stray animal — slowly, with an open hand, with offers of food. He was handsome in an ordinary way, the kind of face that didn't make you afraid because it looked like no particular face at all. He said his name was Jeff. He said he was having a party, if Marcus wanted to come.

Marcus was seventeen and had left home three months ago after his stepfather had broken two of his ribs. He'd been sleeping in the shelter on MLK Drive but the shelter had rules and the rules were difficult and sometimes the street felt freer even if it was cold.

"What kind of party?" Marcus asked.

"Just a few people," Jeff said. "I've got food. Beer, if you want it. My apartment's right there." He pointed at a building across the street — a concrete block of a place, ordinary, with a number above the door: 213.

Marcus looked at him for a long moment.

He'd learned things living on the street. He'd learned that most kindness had a price, and that the people with the warmest smiles were often the ones you should run from fastest. He'd learned to read the small things — the way someone's eyes moved, the tightness around their jaw, the way they stood.

This man stood wrong. There was something coiled in him, Marcus thought. Something waiting.

"What's your last name?" Marcus asked.

The man blinked. It was a fast blink — the kind that meant the question was unexpected.

"Dahmer," the man said. "Jeff Dahmer."

Marcus nodded slowly. "You got ID?"

Another blink. "I— yeah." He pulled out his wallet, showed a Wisconsin driver's license. The photo matched.

Marcus memorized the address on the license. He thought about the two broken ribs. He thought about the fact that he was good at remembering things, that he had always had a mind like a filing cabinet.

"I'm going to need to tell someone where I'm going," Marcus said. "I've got a friend I check in with. She'll come looking if I don't call."

It wasn't true. But he said it clearly, looking Jeff Dahmer directly in the eyes, making sure the man understood that it was meant to be a warning.

Something passed across Dahmer's face. Something Marcus couldn't fully name — it was almost like grief.

"That's smart," Dahmer said, very quietly. "That's really smart."

They stood on the sidewalk for a moment longer.

Then Dahmer put his wallet back in his pocket.

"You should go," he said. "You should go and you shouldn't come back to this neighborhood." His voice had changed. It was flatter now. More honest, Marcus thought, than anything he'd said before.

"Why?" Marcus asked.

Dahmer looked at him for a long time.

"Because I'm not well," he said. "And I'm not a good person to know."

He turned and walked back toward the building, hands in his pockets, head slightly down, moving with the particular kind of loneliness that Marcus recognized because he'd felt it too — the loneliness of someone who had decided long ago that they were beyond being saved.

Marcus stood on the sidewalk and watched him go.

He called the police from a payphone two blocks away. He didn't know exactly what he was reporting. He gave them the address and the name and said he thought something was very wrong in apartment 213.

The officer who took the call was tired and it was the end of a long shift and he wrote down the information and said they'd look into it.

They didn't. Not that night.

But Marcus kept calling. Every few weeks he would call the detective division and give the name and the address and say: I think something is very wrong there. He became, over the following months, a minor irritant in the records of the Milwaukee PD — a boy no one knew who kept calling about an apartment building on Oxford Avenue.

In 1990, a different officer took the call. A woman named Detective Sarah Gaines who had recently transferred from Chicago and had no history with the case, no reasons to dismiss it.

She went to apartment 213 on her own time, on a Saturday afternoon, with her badge and a polite knock.

The smell was the first thing.

She had served fifteen years in law enforcement and she knew that smell.

She called for backup.

They found twelve of them instead of seventeen.

At the trial, when Marcus was asked to testify about the night at the bus stop, he said only this:

"He told me he wasn't well. That was the truest thing he said. And I believed him. I think sometimes that's the only reason I'm standing here."

He paused.

"I think sometimes that's the only reason some of those other men aren't."`,
});

// ─── Story 3 ──────────────────────────────────────────────────────────────────
STORIES.push({
  caseTitle: 'The Disappearance of Madeleine McCann',
  title: 'The Night Watch',
  genre: 'mystery',
  tags: 'missing-child,Portugal,mystery,alternate-plot,suspense',
  content: `The nanny was not supposed to be there.

That was the first thing Kate noticed when she returned to apartment 5A at 10:05 on the night of May 3rd, 2007 — not that the shutters were open, not that the beds were disturbed, but that there was a woman she'd never seen before standing in the hallway between the children's bedroom and the front door.

She was perhaps fifty, with grey hair pulled back tightly and the kind of stillness that suggested military training or nursing or a lifetime of being the person who had to stay calm when everyone else fell apart.

"Mrs. McCann," she said.

Kate's heart dropped straight through the floor.

"Where are my children?" Kate said. Her voice came out very steady, which surprised her.

"Your twins are asleep," the woman said. "Madeleine is safe. She's with me."

"Who are you?"

The woman reached into the pocket of her cardigan and produced a small leather case. Inside was an identification card. Interpol. The name read: Elena Vasquez, Senior Investigator, Child Protection Division.

"We've had this apartment under observation for six days," Vasquez said. "We have reason to believe a trafficking network has been monitoring your family since you arrived in Praia da Luz. We were watching for their operative tonight. At 9:47 PM, while you and your husband were at dinner, we observed a man enter the building. He was known to us."

Kate's legs were not working properly. She sat down on the floor. Vasquez sat down with her.

"Madeleine woke up," Vasquez said, simply. "She woke up and came to the door and I was outside it and I brought her to my colleague in the room across the hall. She's eating biscuits and watching cartoons. She asked for a blue rabbit."

"Cuddle Cat," Kate said. "She calls it Cuddle Cat."

"I'll have it brought to her."

Kate was crying now, though she couldn't feel it happening — it was like watching herself cry from very far away, like a film she was watching of someone else's life.

"Who was he?" she asked. "The man."

Vasquez was quiet for a moment. Then: "A courier. A low-level operative. He was arrested in the stairwell before he reached this floor. He gave up his handler within twenty minutes. We are currently executing warrants across four countries."

"Why didn't you tell us?" Kate asked. "Why didn't you warn us? Why didn't you say there was a threat, why didn't you—"

"Because we needed him to come," Vasquez said. Not unkindly. The way a doctor says something that is true and hard and necessary. "Because he was the thread that led to the network. Because if we had warned you, you would have left, which is completely understandable and absolutely what I would have done if she were my child. But then we would have lost the thread."

Kate looked at her.

"She was never in danger," Vasquez said. "We were watching her every moment. I want you to understand that. We were always there."

"I didn't know that," Kate said.

"No," Vasquez said. "You didn't. And I'm sorry. That was a failure on our part. We should have found a way to tell you." She paused. "There is no protocol that covers everything. There are only people trying their best in impossible situations."

Later, when Kate held Madeleine in the room across the hall — Madeleine who was perfectly fine, who had biscuit crumbs on her chin, who wanted to know why Mummy was crying — she thought about that for a very long time.

We were always there.

It was the thing she'd needed to hear for years without knowing she needed it.

The network was dismantled over the following months. Forty-three people arrested across Portugal, Spain, Romania, and Morocco. The operative in the stairwell — a man named Tomas, who was twenty-four years old and who had been trafficked himself as a child and who wept during his interrogation with the specific misery of someone who understood exactly what he had been about to do — received a reduced sentence in exchange for his testimony.

Kate testified at the trial.

She held Gerry's hand the entire time.

Madeleine, six years old and largely ignorant of the significance of what had happened, spent that week learning to ride a bicycle in the garden of their house in Rothley, and her laughter carried through the windows into the rooms where her parents sat in the evenings, and they listened to it the way people listen to music that has been a long time coming.`,
});

// ─── Story 4 ──────────────────────────────────────────────────────────────────
STORIES.push({
  caseTitle: 'Jack the Ripper',
  title: 'The Woman Who Knew',
  genre: 'mystery',
  tags: 'Victorian,London,feminist,alternate-history,Whitechapel,mystery',
  content: `The Illustrated Police News had given her a name: Lady Detective.

Dr. Eliza Pemberton preferred her actual name, but she had learned long ago that a woman who corrected her titles did not last long in rooms full of men who were supposed to be listening to her. So she let them call her what they wanted and saved her energy for the work.

It was October 1888. Five women were dead. The police had no suspects worth the name. The Home Secretary had publicly declared himself confounded. And Dr. Eliza Pemberton — forensic physician, Oxford-educated, widowed at thirty-two and free since then to do precisely as she wished — had asked for and received access to the case files on the grounds that she had personally trained two of the investigating detectives and that the Commissioner owed her an enormous professional debt.

She read the files in one sitting, in a borrowed office at the Yard, with a pot of cold tea and a growing sense of certainty.

The injuries were consistent. The precision was consistent. The selection of victims was consistent. These were not opportunistic crimes driven by madness — they were methodical, almost surgical. Someone with anatomical knowledge. Someone who moved through Whitechapel as though they belonged there. Someone who understood the geography of the district well enough to appear and disappear at will.

Not a visitor. A resident.

Or someone who had a reason to visit frequently.

She walked the streets herself, in the evenings, dressed in the plain dark wool that she wore when she did not want to be noticed. She walked the routes that the victims had walked. She stood in the shadows where the killer had stood and looked at what the killer would have seen.

She noticed the Mission.

The Whitechapel Charitable Mission, on Goulston Street — a plain stone building with a painted door and windows that glowed with lamplight in the evenings. A place where women like Annie Chapman and Mary Ann Nichols might have gone for food, for shelter, for the brief warmth of a room that didn't cost anything.

She went inside.

The mission was run by a Reverend and his wife, who were transparently kind people with flour on their sleeves and too little sleep in their eyes. There were volunteers. Mostly women from better parts of the city who came to distribute soup and bread and the particular kind of well-meaning sympathy that the poor found both necessary and humiliating.

And there was a doctor.

A slight man of perhaps forty, with very clean hands and a manner of moving that Eliza recognised — the manner of someone who had spent years working in close quarters, in tight spaces, with people who might react badly to sudden movements. A hospital manner. Or a different kind of manner entirely.

She asked his name, casually, of the mission's housekeeper.

"Dr. Merchant," the woman said. "He's been coming three nights a week for the past year. Terrible kind. The women trust him completely."

Eliza looked at his hands again.

Clean. Very clean. The kind of clean that required effort.

She went back to the Yard and pulled every record she could find for a Dr. Merchant practicing in East London. She found three. She eliminated two on the basis of age and disposition. The third had no fixed address, paid his professional association dues in cash, had received his medical degree from Edinburgh, and had a history — brief, undocumented, referred to only obliquely in an 1884 letter from a hospital administrator — of being dismissed from a surgical position for reasons that the records described as conduct unbecoming.

She told the Commissioner.

He did not believe her.

She went back the following Thursday, brought Detective Inspector Abberline without explaining precisely why, and they watched the mission from across the street in the rain for three hours.

Dr. Merchant left at midnight. They followed him. He walked quickly, purposefully, with the collar of his coat turned up. He stopped twice. The second time, he ducked into a narrow passage between two warehouses near Mitre Square.

Abberline went in after him.

There was a brief, violent struggle.

When it was over, Dr. Merchant was in handcuffs and Inspector Abberline had a cut across his left palm that would scar neatly and that he would spend the rest of his career showing to people at pubs.

Eliza stood in the lamplight and looked at the man being led away. He was ordinary in every particular. He looked like someone's father. He looked like someone you would trust with your health and your body and your absolute vulnerability.

She thought about the five women who had trusted someone exactly like that.

She wrote her report in three days, submitted it to the Commissioner, sent a copy to the Home Office, and one to The Lancet.

The trial lasted a week. He was hanged in December.

The newspapers gave credit to Inspector Abberline.

Eliza Pemberton framed the cutting and hung it next to her medical degree, because she found, in the end, that she cared less about the credit than about the simple fact: that he had been found, and that he had been stopped, and that no one else had died.

That was enough.

It was, she thought, almost always enough.`,
});

// ─── Story 5 ──────────────────────────────────────────────────────────────────
STORIES.push({
  caseTitle: 'The Rwandan Genocide',
  title: 'A Thousand Hills',
  genre: 'drama',
  tags: 'Rwanda,genocide,survival,hope,Africa,historical-fiction',
  content: `The priest had a list.

Father Emmanuel had been keeping it for six days, in a notebook he'd found in the vestry, writing in the smallest handwriting he could manage to save space. Names, mostly. Ages. The small necessary facts about people that make them real: Josephine Mukabalisa, 34, schoolteacher, two children. Emmanuel Nkurunziza, 17, student, loves football. Beatrice, no surname given, six months pregnant, came alone.

The church held three hundred and forty-seven people.

Outside, the roadblock was manned by eight men with machetes. They had been there for four days. They were patient in the particular way that people are patient when they believe that time is on their side.

Father Emmanuel moved through the church in the darkness before dawn, stepping over sleeping bodies, checking on the youngest children, touching shoulders when someone woke and looked up at him with the specific terror of someone who has been dreaming of ordinary things and then remembered.

He had sent three messages in six days. Two had not been answered. The third had received a response that said: We are aware. We are working on it.

He was thirty-eight years old and had been a priest for twelve years and in that time he had come to understand that the phrase "we are working on it" was what people said when they meant "we have not yet decided whether you are worth saving."

On the morning of the seventh day, a woman named Consolée came to him.

She was twenty-two and had walked forty kilometres over two nights. She was not Hutu. She was not Tutsi. She was, she explained simply, a journalist, and she had a shortwave radio and a contact at Radio France Internationale who had broadcast her previous report and who was waiting for her next one.

"Tell me what's happening here," she said.

Father Emmanuel told her. He gave her the notebook. He watched her photograph each page with a small camera she kept in the lining of her jacket.

She broadcast the report at 11 AM.

By 3 PM the first UN vehicle arrived at the end of the road.

Not enough vehicles. Not enough soldiers. The roadblock did not dissolve — it merely moved back, watching. The negotiations took four hours. Father Emmanuel sat in the church and heard raised voices in French and then in Kinyarwanda and then in French again.

At 7:17 PM, a UN commander named Major Dufour came into the church.

He stood in the doorway and looked at three hundred and forty-seven people looking back at him.

"We can take a hundred and fifty," he said. "We have four vehicles."

The silence lasted perhaps five seconds.

Then Father Emmanuel stood up and said: "Then you will come back."

It was not a question.

Major Dufour looked at him.

"Yes," the Major said. "We will come back."

He came back three times that night. The last run was made without authorisation, because his orders had been to stop after the second, and he had decided — standing in the dark with the roadblock men watching from a distance — that he was prepared to spend the rest of his career filing the paperwork on exactly what his orders had been and what he had done instead.

In the morning, the church was empty.

Father Emmanuel was the last person loaded into the last vehicle. He had his notebook. He had the list.

All three hundred and forty-seven names.

He spent twenty years afterward tracking them. Finding them in Kigali, in Kampala, in Brussels, in Montreal. Sending letters. Making calls. Crossing names off as found, as living, as building new versions of lives in places that were not Rwanda and would never be Rwanda and were nonetheless places where people could sit in sunlight and know, with moderate certainty, that they would live to see the following day.

He found three hundred and thirty-one of them.

Sixteen names he never found.

He carried those sixteen for the rest of his life, in the same notebook, in the same small handwriting, on the last page.

Not as a record of failure.

As a promise.

That they had existed. That they had been real. That someone had written their names in a church in the hills of Rwanda in April 1994 and kept them, carefully, because keeping them was the one thing left that could be done.

Some things cannot be undone.

But some things can be kept.`,
});

// ─── Story 6 ──────────────────────────────────────────────────────────────────
STORIES.push({
  caseTitle: 'Ted Bundy',
  title: 'The Girl Who Kept Walking',
  genre: 'thriller',
  tags: 'Ted-Bundy,survival,feminist,thriller,1970s,alternate',
  content: `She had seen him before.

That was the thing — she'd seen him before, which was why, when he appeared at the campus library steps with his arm in a sling and a stack of books that kept sliding, she felt something specific and nameable rather than the vague unease she might have felt about a stranger.

She had seen him two weeks ago, in the parking lot of the grocery store on 15th Avenue, doing the same thing. Struggling with something. Looking helpless in a way that was, she thought now, a little too perfect. A little too rehearsed. Like an actor who had practised helpless and landed just slightly on the wrong side of it.

Her name was Carol and she was twenty years old and studying criminal psychology, which her mother thought was morbid and which she thought was necessary.

She watched the man from the library steps. He had a nice face — the kind of nice that could be anywhere, that would be hard to describe to a police sketch artist because it had no defining features, only pleasantness.

He glanced at her. Smiled.

She did not smile back.

He asked if she could help him get the books to his car.

"No," Carol said. "I'm sorry." She wasn't sorry. She had learned that you could say I'm sorry while still meaning no, and that it sometimes kept the interaction from escalating.

He looked surprised. Then he looked something else — something underneath the surprise that was harder to name. Not anger. Something more like calculation.

"It's just across the parking lot," he said.

"I know," she said. "I'm sorry."

She turned and walked into the library.

She did not walk to the back of the library. She walked to the circulation desk, where a librarian named Mrs. Hartwell was checking in returns, and she stood near the desk and picked up a book she had no interest in and pretended to read it while watching the parking lot through the window.

The man stood at the steps for another minute. Then he picked up his books — without difficulty, she noticed, though one hand was supposedly in a sling — and walked to his car.

A tan Volkswagen Beetle.

She wrote down the license plate on the back of a receipt from her pocket.

She didn't know exactly why. She filed it the way she filed all information that felt important without being immediately actionable — in the back of her mind, in the same drawer where she kept things that might matter later.

Three weeks later, the newspapers ran a story about a young woman who had gone missing from the University of Washington. The description of the man seen with her matched the man from the library steps with the precision of something Carol had always hoped would not turn out to be true.

She called the tip line.

She gave them the plate number.

She gave them the parking lot. The library. The date. The grocery store two weeks before that.

The detective who took her call asked three times how she had thought to write down the plate number.

"Because his arm wasn't really hurt," she said. "I could tell."

The detective was quiet for a moment.

"How could you tell?"

"Because when you're really hurt," Carol said, "you protect the injury. You compensate for it. He was holding the books awkwardly on purpose. He was performing an injury rather than having one."

Another silence.

"Miss," the detective said. "I'd like you to come in and talk to us."

She went in the following morning. She sat in a room with two detectives and described, as precisely as she could, everything she had observed.

Ted Bundy was arrested eleven months later.

She was never called as a witness at trial. The plate number alone wasn't enough — but it had contributed to the mosaic of information that had, eventually, put him in a room with the right detectives asking the right questions.

She graduated with honours in 1977. She joined the FBI in 1979. She spent twenty-six years working in behavioural science.

In her office she kept a framed piece of paper on which she had written, in her own handwriting, a single sentence:

Trust the thing you can't name yet.

Every new analyst who came through her office asked about it.

She always told them the same thing.

"It's about a parking lot in 1974," she said. "It's about the fact that your instincts are data. Your discomfort is data. The small wrong thing you almost talked yourself out of noticing is always data."

She paused.

"Write down the plate number. Always write down the plate number."`,
});

// ─── Story 7 ──────────────────────────────────────────────────────────────────
STORIES.push({
  caseTitle: 'The Holocaust',
  title: 'The Archivist of Kraków',
  genre: 'drama',
  tags: 'Holocaust,WWII,resistance,archives,historical-fiction,hope',
  content: `The documents were the size of a matchbox.

Miriam had spent three years miniaturizing them — photographing pages of the Kraków ghetto's records onto tiny rolls of microfilm, using a camera borrowed from the underground's photographer and a technique she'd learned from a book she'd stolen from the German cultural office on Karmelicka Street.

She was twenty-four years old. She had a degree in library science from the Jagiellonian University, which the Germans had closed in November 1939 by arresting 183 of its professors and sending them to concentration camps. She had been a third-year student when that happened. She had sat in her dormitory room that night and decided, with the particular cold clarity of someone who has just understood that the world intends to erase her, that she would become an archivist of the erasure itself.

She documented everything.

Birth records. Death records. Deportation lists — the terrible bureaucratic documents with their columns of names and transport numbers and destination codes that everyone knew, by 1942, meant one thing. Testimonies. Photographs. Letters. The names of children. The names of children most of all, because she had come to believe that the children's names were what they most wanted to destroy, and that preserving them was therefore the most important act of resistance available to a woman with a camera and a darkroom and a particular kind of stubbornness that her mother had always said would either save her or kill her.

The underground courier was a young man named Aleksander who moved through the ghetto with a baker's papers and a bicycle and a face that suggested nothing in particular.

"These go to Geneva," Miriam told him, pressing the matchbox into his palm. "To the Red Cross. To the Jewish Council in Switzerland. To whoever will keep them."

"Will anyone look at them?" he asked.

It was a real question. Not rhetorical. He genuinely wanted to know.

"I don't know," she said. "I hope so. I think — I think the documents have to exist first. Before anyone can look at them, they have to exist. That's all I can guarantee. The existence."

He looked at the matchbox in his hand. Something passed across his face — not hope exactly, but the place where hope was kept when hope was too dangerous to hold openly.

"I'll get them there," he said.

He did. Aleksander crossed the border into Slovakia in February 1943 with the microfilm hidden in the hollow handle of his bicycle. He was stopped twice. Both times he was released. He reached Geneva in March. The documents he carried contained, among other things, the names and birth dates of four thousand three hundred and twelve children who had passed through the Kraków ghetto.

Miriam was deported in June 1943.

She survived. The how of it was not a single story but many — a German officer who looked the other way, a Polish farmer's wife who kept her in a cellar for eleven months, a Canadian soldier who found her walking along a road in Bavaria in May 1945 and gave her half his rations and a clean blanket without asking a single question.

After the war she went to Geneva.

She asked to see the documents.

They brought them to her in a reading room with a north-facing window and she sat for a long time looking at the names she had photographed by candlelight in a ghetto that no longer existed.

The documents existed.

The children whose names were on them mostly did not.

She cried for about twenty minutes and then she stopped crying and asked for a magnifying glass and began the work she would continue for the rest of her life: matching names to records, building the case, creating the archive that would eventually contribute to the prosecution of seven war criminals at Frankfurt and to the Yad Vashem database that bears, among its millions of entries, the names of four thousand three hundred and twelve children from Kraków.

Every name is a resistance, she wrote in the preface to her 1962 memoir.

Every name that survived is a small victory against people who wanted nothing to survive.

She died in Jerusalem in 1991, aged seventy-three.

The documents outlived her.`,
});

// ─── Story 8 ──────────────────────────────────────────────────────────────────
STORIES.push({
  caseTitle: 'JonBenét Ramsey',
  title: 'The Question That Stayed',
  genre: 'mystery',
  tags: 'cold-case,detective,alternate-investigation,mystery,Boulder',
  content: `Twenty years was long enough to collect a specific kind of exhaustion.

Detective Lena Marsh had worked the Ramsey case for seven months in 1997 before being reassigned, and she had carried a particular folder of photographs in her briefcase for the two decades since — not officially, not as part of any active investigation, but the way some people carry photographs of people they've loved and lost.

She was fifty-four now. She had a daughter in college, a house with a leaky roof, and more miles on her body than on her car. She had been retired from the Boulder PD for three years.

The call came on a Thursday afternoon in October 2016.

It was from a woman named Dr. Sarah Webb, a forensic pathologist at the University of Colorado who had been working, in collaboration with a private foundation, on a reanalysis of cold case evidence using the kind of DNA technology that hadn't existed in 1996.

"Detective Marsh," Dr. Webb said. "I know you're retired. I know you've been asked about this case a hundred times and you've always said you're done with it. But I need someone who was there. Someone who remembers the small things."

Lena was quiet for a moment, looking at the grey October sky outside her kitchen window.

"What did you find?" she said.

"Touch DNA," Webb said. "From the garrote. From the painted fingernail. Cross-matched against a database that didn't exist in 1996, that didn't exist in 2008 when they cleared the family." A pause. "We have a profile. A male contributor. Unknown to all prior investigators."

Lena closed her eyes.

Twenty years of photographs. Twenty years of a dead child's face in a briefcase.

"Who is he?" Lena asked.

"That's what I need your help with," Webb said. "Because the profile matches to a family group in our genealogical database that has a connection to Boulder. A connection to the Ramsey neighborhood. A connection that would have been visible in 1997 if anyone had known what to look for."

Lena drove to Denver the next morning.

She spent six days in Dr. Webb's laboratory, working through genealogical records and neighborhood canvassing data and the original interview transcripts that she had read so many times she could quote them from memory.

On the sixth day she found him.

He was dead. He had died of a heart attack in 2009. He had lived four blocks from the Ramsey house. He had attended the same church. He had, in January 1997, been interviewed twice as part of a broad neighborhood canvass and both times had presented as cooperative, unremarkable, a quiet man with a landscaping business and no criminal record.

His DNA was in the national database because of a 2004 DUI.

Lena sat in the laboratory for a long time after she understood.

"We can't prosecute a dead man," Dr. Webb said.

"No," Lena said. "We can't."

She thought about what they could do.

What they could do was stand in front of John and Patsy Ramsey's graves — Patsy had died of cancer in 2006, still not knowing — and say: we found him. What they could do was tell Burke Ramsey, who was thirty now and who had spent his entire life under the shadow of implication, that the evidence pointed elsewhere, clearly and conclusively, to someone who was not his family.

What they could do was give the case a closing note, even if it could never have an ending.

Lena drove to the cemetery on a cold November morning. She stood at Patsy Ramsey's grave for a while.

She had never cried about this case. Twenty years and she had never cried about it.

She cried now, briefly, in the way that people cry when something is resolved too late — not with relief but with the compound grief of knowing that the answer was always there, in a database that didn't exist yet, in a technology that hadn't been invented, waiting for the world to catch up with what had happened in a house in Boulder on Christmas night, 1996.

She drove home.

She called Burke Ramsey's lawyer.

She told him what they had found.

The lawyer was quiet for a very long time.

"Will this be public?" he asked finally.

"Eventually," Lena said. "Yes. Eventually it will be public."

Another long silence.

"Thank you," the lawyer said. "He's been waiting a long time to hear something like this."

"I know," Lena said. "So have I."`,
});

// ─── Story 9 ──────────────────────────────────────────────────────────────────
STORIES.push({
  caseTitle: 'The Columbine High School Massacre',
  title: 'Third Period',
  genre: 'drama',
  tags: 'Columbine,school,survival,hope,prevention,alternate',
  content: `The guidance counselor had noticed Eric Harris in September.

Not in the way that made headlines later — not the darkness, not the writings, not the explosive compounds in the garage. Those things she didn't know about in September. What she noticed was smaller: the quality of his silence in their mandatory junior check-in meeting. The way he described his friendships in language that was technically accurate but emotionally evacuated. The way he talked about the future — not with the vague enthusiasm of most sixteen-year-olds but with a particular blankness, as though the future were a concept he'd intellectually processed but not emotionally internalized.

Her name was Mrs. Patricia Cole and she had been a school counselor for nineteen years and she had learned to pay attention to the thing underneath the thing.

She scheduled a follow-up meeting. Eric came reluctantly, with his backpack and his polite evasions.

She asked him about his journal.

He froze.

She had not read it. She had not seen it. But she had been a counselor for long enough to know that isolated, intelligent, furious adolescents kept journals, and that the journals were where the real language lived.

"I don't have a journal," he said.

"You don't have to show it to me," she said. "You don't have to tell me what's in it. But I want you to know that whatever you're thinking — whatever's in your head right now — I've probably heard worse. Or better. Depending on what you're thinking."

He looked at her with eyes that were very hard to read.

"What if what I'm thinking is bad?" he asked.

"Then we talk about it," she said. "That's what this room is for."

The silence lasted almost a minute.

Then Eric Harris started talking.

Not about all of it. Not about Dylan, not about the plan, not about the specific and elaborately detailed revenge fantasy that he had been constructing and refining for months. But he talked about the anger. He talked about it in the abstract — the way you might talk about a country you've visited but not yet moved to. The way it felt to be invisible and then to imagine, vividly, not being invisible. The way some days the only thing that made him feel real was imagining — he didn't say what. He stopped himself.

"Imagining what?" Mrs. Cole asked.

"Power," he said finally. "Imagining having power."

She referred him to a clinical psychologist named Dr. Yuen the following week. She also called his parents, who were defensive and then concerned and then defensive again, which was the usual progression.

She called Dylan Klebold's parents too.

It was Dylan's mother who came into her office on a Friday in February 1999, with a stack of composition notebooks and a face that had the particular expression of someone who has found something they cannot un-find.

"I read his diary," Susan Klebold said. "And I don't know what to do."

Patricia Cole did not say anything for a moment.

She thought about the nineteen years of this work, all the small things, all the follow-up meetings, all the calls that mostly came to nothing and sometimes came to something.

"Tell me what you read," she said. "Tell me everything."

The police were called that afternoon.

April 20, 1999 was a Tuesday like any other Tuesday at Columbine High School. The cafeteria served pizza. There was a fire drill in third period that confused some of the freshman. After school the chess club met in Room 114.

Eric Harris and Dylan Klebold were not there.

They were each sitting in different clinical assessment rooms in different facilities, beginning the particular long difficult work of being seventeen years old and enraged and in need of a kind of help that felt, at first, like nothing more than the embarrassing exposure of everything they'd worked hardest to hide.

It was not a good story. It was not a simple story. It was not a story with a clean ending.

But it was a different story.

And the library at Columbine High School, with its blue carpet and its study tables, remained a room where students read books and argued about history and fell asleep in the afternoon sun coming through the windows, and was never anything else.`,
});

// ─── Story 10 ─────────────────────────────────────────────────────────────────
STORIES.push({
  caseTitle: 'The Assassination of John F. Kennedy',
  title: 'Dealey, November',
  genre: 'thriller',
  tags: 'JFK,assassination,alternate-history,conspiracy,1963,thriller',
  content: `The agent's name was Thomas Briggs and he had been awake for thirty-one hours.

He had been awake for thirty-one hours because three days ago, in a file room in the basement of the Dallas field office, he had found something that he had not been supposed to find — a series of communications routed through a cut-out that should not have existed, between a man in New Orleans and a man whose name he recognised from a briefing that had been above his clearance level.

The motorcade route had been changed twice.

It had been changed twice in the week before the visit, which was unusual. Changes to presidential motorcade routes were made for security reasons, and security reasons were documented, and Briggs had pulled the documentation and found that the second change — which moved the route through Dealey Plaza, down Elm Street, past the Texas School Book Depository — had been authorised by a memo that carried a name he'd never heard, attached to a department that, as far as he could determine, did not exist.

He had gone to his supervisor.

His supervisor had listened to him for four minutes and then told him he was tired and should go home and that he'd look into it.

Briggs had gone home.

He had not slept.

At 5 AM on November 22nd, 1963, he got back in his car and drove to the Trade Mart where the President was scheduled to speak at 1 PM.

He did not know exactly what he was going to do.

He found Agent Gerald Behn, the head of the White House detail, in a corridor near the service entrance, going over the day's schedule with two uniformed officers.

"Sir," Briggs said. "I need sixty seconds."

Behn looked at him — a young agent, tired, clearly agitated, clearly having either a crisis of conscience or a nervous breakdown.

"Walk with me," Behn said.

Briggs talked for two minutes, not sixty seconds. He talked about the memo. The non-existent department. The route change. The Book Depository.

Behn did not dismiss him.

This was not what Briggs expected. He had expected to be dismissed and had prepared himself for it. Instead Behn stopped walking and stood very still with the particular stillness of a man whose training is fighting his instinct and his instinct is winning.

"How confident are you?" Behn asked.

"Not very," Briggs said honestly. "I might be wrong about all of it. I haven't slept. But I thought—"

"You thought someone should know," Behn said. "Yes. All right."

He picked up the nearest telephone.

The motorcade route was modified for the third time at 10:47 AM on November 22nd, 1963. The change was minor — a small adjustment that took the Presidential limousine down Main Street instead of Elm, bypassing the turn below the Book Depository entirely.

The crowds on Main Street were large and enthusiastic. The President rode with the bubble top down because it was a clear day. He waved. The crowds waved back.

In the sixth floor window of the Texas School Book Depository, a man waited for a shot that never came.

He left the building at 12:34 PM. He bought a Coke from the machine in the second floor lunchroom and drank it on the way out. He had a bus to catch.

He was arrested six hours later in a movie theatre in Oak Cliff.

The interrogation lasted three days. The full truth of what he knew and what he didn't know and what he had been promised and by whom unravelled slowly, with the particular difficulty of a story in which everyone involved had every reason to tell a different version.

Thomas Briggs sat in a waiting room outside the interrogation suite and drank bad coffee and waited to be called.

He was called on the second day. He answered every question put to him precisely and completely. He did not speculate. He gave them exactly what he had and nothing more.

Later, when people asked him — and for the rest of his career people asked him, at parties, at retirement dinners, in whispers at the edges of rooms — what he had been thinking in the car at 5 AM, when he was driving to the Trade Mart, when he didn't know if he was right or wrong or just exhausted and seeing patterns in noise:

He always said the same thing.

"I didn't know if I was right. I still don't know everything. But I thought: someone should know. Someone should at least know. And then I thought: the only person who's going to make sure someone knows is me."

He paused.

"So I went."`,
});

// ─── Story 11 ─────────────────────────────────────────────────────────────────
STORIES.push({
  caseTitle: 'The Golden State Killer',
  title: 'The Genealogy of Ghosts',
  genre: 'thriller',
  tags: 'golden-state-killer,DNA,genealogy,cold-case,detective,modern',
  content: `The DNA profile had been sitting in a database for fourteen years.

It had been uploaded in 2004, pulled from a wine glass at a crime scene in Rancho Cordova, California — a wine glass touched by a man who had broken into a home, committed an unspeakable act, and left through a back window into the California night. The profile had been run against CODIS dozens of times. No match.

Nina Flores had been a genetic genealogist for six years, working cold cases out of a converted garage in Sacramento with three monitors, two cats, and a conviction that the past was never as gone as it felt.

She uploaded the profile to GEDmatch on a Thursday morning in 2017, using a technique that had just started to show promise in cold case work — searching public genealogy databases not for a direct match but for partial matches from relatives, building a family tree backwards from whoever shared DNA.

The first result came back within forty minutes: a partial match from a woman in Oregon who had taken a consumer DNA test to learn about her ancestry and had uploaded her results publicly.

Nina began building.

The family tree grew over six weeks: branches and sub-branches, marriages and deaths, census records and obituary databases and the particular beautiful tedium of following a line backward through five generations and then forward again along a different branch, looking for the node where the DNA and the geography and the timeline converged.

She ate bad takeaway. She drank too much coffee. She talked to the cats, whose names were Exhibit A and Exhibit B, about dead leads and promising branches and the maddening phenomenon of genealogical records that stopped in 1940 for no apparent reason.

On the forty-third day she had a name.

She called the detective on the case — a retired investigator named Tom Bevins who had worked the East Area Rapist murders in the 1970s and had never stopped — and she told him what she'd found.

Bevins was quiet for a long time.

"Run me through it," he said. "The whole thing. From the beginning."

She ran him through it. It took an hour. When she was finished, Bevins asked three questions, each more precise than the last, each answered. Then he was quiet again.

"He'd be seventy-something now," Bevins said.

"Seventy-one," Nina said. "If it's him."

"If."

"If. But the match rate on the Oregon woman is 1,750 centimorgans. She's a first cousin once removed at minimum. The family tree puts this individual in Sacramento County in 1976. In Ventura County in 1980. The gaps align."

"The gaps align," Bevins repeated.

She understood what he was doing — repeating it back to himself, testing it against everything he'd carried for forty years. Forty years of files, of photographs, of faces he'd never been able to put a name to.

"Tom," she said. "I could be wrong. The tree could have an error I haven't found. He could have an alibi I don't know about. But you should take this to the task force."

"I know," he said. "I know."

He took it to the task force.

They put the man under surveillance for six weeks. They collected a discarded tissue from his trash bin. They sent it to the lab.

Nina was in her garage with Exhibit A on her lap when the call came in.

"It's a match," Bevins said. His voice sounded like a door closing on something that had been open for a very long time.

"Fourteen years," Nina said. "He was in the database for fourteen years."

"Not the right database," Bevins said. "Not until now."

She sat for a while after the call, in the dark of the garage, listening to Exhibit A purring and thinking about the Oregon woman who had taken a consumer DNA test to learn about her great-grandmother's home village and had unknowingly become, in the genealogical record, the thread that led from a wine glass in 1979 to a man in a quiet suburb in 2017.

You are more connected to the past than you know, Nina thought.

To things that happened before you were born.

To things that will persist long after you're gone.

That's what the DNA says. That's what it has always said.

We are the archive of everything that came before us.

And the archive, if you know how to read it, never lies.`,
});

// ─── Story 12 ─────────────────────────────────────────────────────────────────
STORIES.push({
  caseTitle: 'The Jonestown Massacre',
  title: 'The Ones Who Walked Away',
  genre: 'drama',
  tags: 'Jonestown,cult,survival,escape,Guyana,1978',
  content: `There were forty-one of them.

That was the number who walked into the jungle on the morning of November 18, 1978 — the ones who had heard Jim Jones begin the announcement and had understood, in the marrow-deep way that human beings understand absolute danger, that they needed to leave right now, before the choice was made for them.

Diane Mercer was one of them.

She was twenty-three and had come to Peoples Temple six years ago because her older sister had joined and because the Temple had seemed, in 1972, like the most genuinely integrated community she had ever seen. Black and white together, poor and educated together, people who had been discarded by the rest of America finding a place that wanted them.

She had stayed because leaving felt impossible. She had stayed because her sister was still there, and her sister's children, and because the mechanisms of the Temple — the surveillance, the meetings, the public confessions, the way they monitored your mail and your relationships and your inner life — made the concept of leaving feel less like a decision and more like a wall.

But she had been carrying a small folded piece of paper for three weeks.

On it was written one word: NOW.

She had written it herself, in a moment of clarity during a White Night rehearsal — one of Jones's fake mass suicide drills — when she had stood in a line holding a paper cup of punch that everyone was being told contained poison, and had understood with a cold sudden certainty that one day the punch would be real.

When the announcement began she was in the kitchen compound.

She caught the eye of a man named Terrence, who had worked beside her in the agricultural fields for two years and who she had never spoken to about leaving but who she had always believed, without evidence, was waiting for the same moment she was.

She showed him the paper.

He nodded once.

She walked.

The jungle at the edge of Jonestown was dense and dark and full of sounds that had frightened her for a year. She had spent a year being afraid of it as a deliberate strategy — Jones had described the jungle as a death trap, full of animals and men who hated Black people and poverty and everything the Temple stood for.

She walked into it anyway.

Forty others followed.

They walked for two days. They walked through rain and across rivers and through stretches of undergrowth so thick they had to push through it with their arms in front of their faces. Three people turned back. One woman broke her ankle and had to be carried on a makeshift litter that they built from branches and someone's jacket.

They found a road on the morning of the second day.

A supply truck came by an hour later — a Guyanese driver delivering fuel to an agricultural cooperative forty miles away. He stopped. He looked at them — forty-one people in Temple clothes, exhausted, covered in mud, looking at him with expressions he would later describe to his wife as the look of people who had climbed out of a hole they weren't sure had an exit.

He loaded them into the truck.

In the town of Matthew's Ridge, Diane found a telephone.

She called the US Embassy in Georgetown.

The Embassy had already received reports of the airstrip massacre, the deaths of Congressman Ryan's delegation. They were mobilizing. They did not yet know the full scale of what had happened at the compound.

Diane told them.

She told them for forty-five minutes, sitting on a plastic chair in a post office in Matthew's Ridge, while Terrence stood behind her with his hand on her shoulder, while the woman with the broken ankle lay on a camp bed in the corner, while outside the window the sun came up over the Guyanese jungle and the birds made the early-morning sounds that she had once found beautiful, before Jonestown, and was slowly — very slowly — beginning to find beautiful again.

She gave testimony at four separate government inquiries.

She wrote a book.

She spent fifteen years working with cult exit support organizations, helping people leave groups that used the same mechanisms Jones had used — the same isolation, the same surveillance, the same systematic destruction of the person's ability to trust their own perceptions.

She never stopped being afraid of certain things.

Crowds. The word family used to mean obligation. The sound of someone speaking into a microphone with total certainty.

But she kept walking.

That was what she told people, in the end, when they asked her how she had done it, how she had survived, how she had found the will to put one foot in front of the other into a jungle she'd been told would kill her:

"I kept walking," she said. "That's all. I just kept walking."`,
});

// ─── Story 13 — Standalone Fantasy (no case link) ─────────────────────────────
STORIES.push({
  caseTitle: null,
  title: 'The Detective Who Talked to the Dead',
  genre: 'fantasy',
  tags: 'supernatural,detective,noir,fantasy,murder,ghosts',
  content: `The city had rules. Most of them were the ordinary kind — don't steal, don't hurt people, pay your taxes. But there was one rule that only a particular kind of person knew about, and it went like this:

The dead can speak for forty-eight hours.

After that the window closes, whatever unfinished business they had gets folded back into them, and they become simply the dead — silent, absent, the negative space in the shapes of living people.

Cassidy Park had forty-three minutes.

She knew this because she'd died at 11:17 PM on a Tuesday and it was now — she checked the clock on the wall of the police interrogation room where her body had been found — it was 11:14 on Thursday.

She had three minutes to tell someone.

The detective sitting across from what she assumed was her own body was a tired-looking man with grey at his temples and a coffee cup he kept refilling from a thermos. He had been doing this for six hours — sitting here, reviewing her belongings, going through a case file with the slow systematic patience of someone who was not going to stop until he found something.

She sat down across from him.

He looked up.

He did not scream. He did not knock over his coffee. He looked at her with the specific expression of a man who has been doing this for long enough that the universe had stopped having the ability to surprise him.

"Ms. Park," he said.

"Detective Chen," she said. She'd read his name off his badge.

"I have eleven minutes left on my shift," he said. "And two hours left before the lab results come back. And roughly—" he glanced at the clock "—very little time before you lose the ability to tell me what happened. So let's skip the part where we establish what you are and what I am and get to it."

She appreciated that. She had always appreciated directness.

"His name is Marcus Webb," she said. "He's my business partner. He has a storage unit on Clement Street, unit 47, in which you will find a second set of accounting books for our company. He's been laundering money for three years. I found out six days ago. I told him I was going to the FBI."

Detective Chen was already writing.

"He has a gun registered to his father," she continued. "A 1978 Colt. His father died in 2019. He's kept the registration current. You won't find it at his house — he's too careful for that. But his brother Joseph lives in Marin and has a safe in the garage behind the washing machine."

Chen underlined something.

"There's one more thing," Cassidy said.

The clock on the wall read 11:16.

"He used my phone to make a call after," she said. "He called someone. I don't know who — I couldn't see — but there's a call in my phone records that I didn't make, at 11:34 PM Tuesday night. That person is someone he needed to tell. That person connects him to the laundering. If you find that person, you find the whole structure."

11:17.

She had one minute left.

She thought about what she wanted to use it for.

"Tell my daughter I was thinking about her," she said. "She's in Portland. Her name is Mae. We hadn't talked in two years. I was going to call her this week." She paused. "I didn't call."

Chen stopped writing. He looked at her directly — the way people almost never looked at her, with full undivided attention, without an agenda.

"I'll tell her," he said.

"Thank you," Cassidy said.

11:18.

The room was very quiet.

Detective Chen sat alone at the table with his notes and his cold coffee and the particular heaviness that this job deposited in you, layer by layer, over years.

He picked up his phone.

He called the storage facility on Clement Street.

He called the Marin County Sheriff.

He called Portland.

The daughter answered on the second ring. She had a voice like her mother's — direct, a little wary, the voice of someone who had learned to brace for things.

"This is Detective Chen with SFPD," he said. "I have a message for you from your mother. She asked me to tell you she was thinking about you. That she was going to call." He paused. "I'm sorry. I'm very sorry for your loss."

The silence on the line lasted a long time.

Then Mae Park said, in a voice that was barely a voice at all: "How did you — she's been — how did you know she—"

"I just know," Chen said. "Sometimes I just know things."

He sat in the quiet of the interrogation room for a while after the call.

Outside the window the city went on being the city — full of the living and the dead and the forty-seven-hour window between them, and Detective Chen who moved between them all like water between stones.

He drank the last of his cold coffee.

He went home.

He slept without dreaming, which was the best he ever did.

In the morning, Marcus Webb was arrested at his house on Pacific Heights.

The case was clean. Every thread led to another thread, exactly as the dead woman had promised.

Chen filed his report. He wrote: Information obtained through witness testimony.

Which was true.

Which was, in its way, all it ever was.`,
});

// ─── Story 14 — Standalone Fantasy ───────────────────────────────────────────
STORIES.push({
  caseTitle: null,
  title: 'Red Ledger',
  genre: 'thriller',
  tags: 'crime,thriller,underground,justice,vigilante,noir',
  content: `There was a ledger.

Nobody official knew about it. The people who knew about it — and there were perhaps forty of them, scattered across eleven cities — called it simply the Ledger, or, when they were feeling dark about things, the Red Book.

It contained, in very small handwriting in a cramped shorthand that had taken Alicia three months to learn, the names of three hundred and twelve people who had committed serious crimes and had not been tried for them.

Not because of insufficient evidence. Because of money. Because of connections. Because of the systematic ways in which the formal machinery of justice could be short-circuited by the informal machinery of power.

Alicia had been a public defender for nine years. She had watched eighty-seven clients go to prison for things that men with better lawyers had done with impunity. She had watched the formal machinery grind her clients into powder while the informal machinery wrapped other people in cotton wool and set them gently aside.

The Ledger was not revenge.

That was important. That was the distinction she made, carefully, every time she added a name or removed one or reviewed an entry.

The Ledger was evidence. The Ledger was a record of everything the formal system had refused to record. It was maintained by forty people who had, between them, a combined eighty years of legal experience and a shared understanding that the rules only worked when everyone agreed to follow them, and that some people had spent a very long time not agreeing and getting away with it.

What happened to the people in the Ledger varied.

Sometimes it was a document, filed through an anonymous channel with a journalist who asked good questions. Sometimes it was a conversation with a colleague in a jurisdiction where the original case had not been heard. Sometimes it was the kind of evidence that arrived, through mechanisms Alicia chose not to fully understand, in the hands of a federal investigator who had been looking for exactly that piece for years.

Sometimes nothing happened for a long time. And then something happened.

Entry number 47: a hedge fund manager in Connecticut who had assaulted three former employees and had been insulated from prosecution by a combination of expensive lawyers and carefully signed NDAs. Entry 47 had been in the Ledger for four years. Last month, one of the women had found the courage, after long conversations with the Ledger's legal network, to give testimony to a federal grand jury. The grand jury had returned an indictment.

Entry 47 was in the process of ceasing to be an entry.

This was how it worked. Slowly. Imperfectly. Without the satisfaction of dramatic confrontation. Through the accumulation of pressure, evidence, and the slow revelation of what had always been true but had not yet been formally acknowledged.

Alicia sat in her kitchen on a Friday night and reviewed the Ledger.

She had added three new names this week. She had removed one.

She thought about the eighty-seven clients. She thought about the man in Connecticut and the women who would face him in court.

She thought about the word justice — a word she had complicated feelings about, a word that sounded clean and arrived dirty, that described an ideal that functioned as a direction rather than a destination.

You moved toward it.

You did not arrive.

But you moved toward it. You kept moving. You collected the evidence. You built the record. You refused to let the informal machinery erase what happened.

She closed the Ledger.

She made tea.

She went to bed.

In the morning she had thirty-one client files to review before 9 AM, and the day would begin again, and the work would continue, imperfect and necessary and never finished, which was the only kind of work she'd ever really trusted.`,
});

// ─── Story 15 — Standalone Horror/Fantasy ────────────────────────────────────
STORIES.push({
  caseTitle: null,
  title: 'The House on Edgewater Road',
  genre: 'horror',
  tags: 'haunted,horror,supernatural,true-crime-inspired,mystery',
  content: `The house had been on the market for eleven years.

Every real estate agent in the county knew about it. They knew the address by heart, the way you know the address of a place you've been warned about: 4417 Edgewater Road. Three bedrooms. Original hardwood floors. Half an acre with a view of the creek. Listed at $180,000, which was forty thousand below market for the area, and had been reduced twice.

Nobody stayed.

This was not a ghost story. That was what the real estate agent, a practical woman named Linda, always told potential buyers. This is not one of those houses. There's no history of violence here, nothing unusual in the county records, no reason at all why four separate families have moved out within a year of purchase.

But four separate families had moved out within a year of purchase.

And the fifth family — the Holloways — had lasted nine months before the mother, a pediatrician named Dr. Ellen Holloway who did not believe in any kind of supernatural phenomenon and said so clearly when the reporter from the local paper came to interview them, had packed her children's things into a rented truck on a Tuesday morning with a look on her face that the reporter described as the look of someone who has revised a fundamental belief about the nature of reality.

The researcher's name was Dr. James Okafor. He was a folklore academic at the state university, and he had spent twenty years studying the intersection of place, memory, and human psychology. He was not interested in ghosts. He was interested in what houses remember.

He bought 4417 Edgewater Road for $165,000 in the spring.

He lived in it alone for four months, documenting everything.

The documentation was meticulous. He kept a journal, a temperature log, a sound recording running from 10 PM to 6 AM on every night of his occupancy. He had the water tested. He had the soil tested. He had the electrical system inspected. He had a structural engineer assess the integrity of the building.

Everything was normal.

And yet.

The journal entries from his second month were different from the first. The handwriting was the same but the tone had changed — grown quieter, more internal, as though the question he was asking had shifted from what is happening here to what is happening to me.

He wrote, in the entry for October 14th:

"I have begun to understand the house on its own terms. I do not mean this in any supernatural sense. I mean only that there is a grammar to this place — a logic to the way it behaves, the way the sounds move through it, the way the light changes. I am learning the grammar. I am becoming fluent in something I could not name a month ago."

And on October 29th:

"The others did not leave because they were frightened. I understand that now. They left because they began to know too much. The house teaches, if you stay long enough. It teaches you things about yourself — about the accumulation of all the people who have passed through, all their weight, all their specific and private sadness and relief. It is not haunted in the way stories describe haunting. It is saturated. That is the better word. A sponge saturated with water. And if you press against it long enough you become part of the saturation."

He left on November 3rd.

His research notes were eventually published in a journal of environmental psychology under the title: "Place Memory and the Inhabited Past: A Study in Affective Architecture."

The house was sold again in the spring, to a young couple who had read the paper and were curious.

They lasted fourteen months.

Then they sold it to a couple who had also read the paper.

They lasted two years.

The house remained on Edgewater Road, surrounded by trees, with a view of the creek, priced below market, cycling through families with the patient indifference of something that has been standing longer than any of them and expects to be standing still when the last of them is gone.

Dr. Okafor kept the journal.

He took it out and read it, sometimes, on evenings when he needed to be reminded that the world was stranger than he was able to comfortably hold — that some things did not resolve, did not explain, did not offer the clean ending that he had spent his career searching for.

He found, over the years, that he needed that reminder more than he'd expected.

The world is strange. Some houses know things. The past is not as gone as it appears.

These were not conclusions he could put in a paper.

But they were true.`,
});

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════════════════
async function main() {
  console.log('\n📖 Seeding detailed fictional stories...\n');

  // Get the system user (first admin or first user)
  const author = await prisma.user.findFirst({ orderBy: { createdAt: 'asc' } });
  if (!author) { console.error('No users found. Run npm run seed first.'); process.exit(1); }
  console.log(`Using author: ${author.username} (${author.email})\n`);

  // Get all cases for linking
  const allCases = await prisma.case.findMany({ select: { id: true, title: true } });

  let added = 0, skipped = 0;

  for (const story of STORIES) {
    // Check for duplicate title
    const exists = await prisma.story.findFirst({ where: { title: story.title } });
    if (exists) { skipped++; continue; }

    // Find matching case if specified
    let caseId = null;
    if (story.caseTitle) {
      const matchCase = allCases.find(c =>
        c.title.toLowerCase().includes(story.caseTitle.toLowerCase()) ||
        story.caseTitle.toLowerCase().includes(c.title.toLowerCase().split(' ').slice(0,3).join(' '))
      );
      if (matchCase) caseId = matchCase.id;
    }

    const created = await prisma.story.create({
      data: {
        title:     story.title,
        content:   story.content,
        authorId:  author.id,
        caseId:    caseId,
        type:      'fantasy',
        status:    'published',
        genre:     story.genre,
        tags:      story.tags,
        views:     Math.floor(Math.random() * 800) + 50,
        coverImage: getStoryImageUrl(story.title, story.genre),
      }
    });

    added++;
    console.log(`  ✓ [${story.genre.padEnd(10)}] "${story.title}"${caseId ? ' → linked to case' : ''}`);
  }

  console.log(`\n✅ Done! ${added} stories added, ${skipped} skipped (duplicates).`);
  console.log(`   Visit http://localhost:5173/stories to read them.\n`);
}

main()
  .catch(err => { console.error('Error:', err.message); process.exit(1); })
  .finally(() => prisma.$disconnect());
