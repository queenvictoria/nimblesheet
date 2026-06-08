const BASE = 'https://nimblenomicon.pages.dev/';
const RULES = BASE + 'core-rules/';

export function spellUrl(name: string): string {
	const slug = name
		.trim()
		.replace(/'/g, ' ')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');
	return `${BASE}spells/${slug}/`;
}

export function openRule(anchor: string): void {
	window.open(RULES + anchor, '_blank', 'noopener,noreferrer');
}

export type FieldDoc = { desc: string; url: string };

export const statDocs: Record<string, FieldDoc> = {
	Armor: {
		desc: 'Reduces damage taken. Defaults to your DEX modifier.',
		url: RULES + '#armor',
	},
	HP: {
		desc: 'Current hit points. Reaching 0 HP gives you a Wound.',
		url: RULES + '#hit-points--dying',
	},
	HD: {
		desc: 'Hit dice spent on a short rest to recover HP. Roll your hit die + STR.',
		url: RULES + '#hit-dice',
	},
	Init: {
		desc: 'Roll 1d20 + DEX at the start of combat. 1–9 = 1 action, 10–19 = 2, 20+ = 3.',
		url: RULES + '#starting-combat',
	},
	Speed: {
		desc: 'Spaces moved per Move action. Default is 6.',
		url: RULES + '#speed--range',
	},
};

export const cardDocs: Record<string, FieldDoc> = {
	Save: {
		desc: 'Roll 1d20 + stat when the world acts on you. Each class has one +1 and one −1 save bonus.',
		url: RULES + '#skill-checks--saves',
	},
	Actions: {
		desc: 'Up to 3 actions per turn, set by your initiative roll at the start of combat. Resets to 3 at end of turn.',
		url: RULES + '#heroic-actions',
	},
	Wounds: {
		desc: 'Gained each time you reach 0 HP. Accumulated wounds lead toward death.',
		url: RULES + '#wounds',
	},
};

export const manaDoc: FieldDoc = {
	desc: "Mana powers your spells. Max mana is based on your class's key stat and level.",
	url: RULES + '#cast-spell',
};

export const inventoryUrl = RULES + '#7-inventory-slots';
export const skillsUrl = RULES + '#skills';

export const skillDescs: Record<string, string> = {
	Arcana:
		'Your understanding of magical phenomena, spells, and enchantments. With Arcana, you can identify magical effects, decipher arcane symbols, and discern the properties of magical items. It also grants insights into the abilities and weaknesses of magical beings like Aberrations, Elementals, and Oozes.',
	Examination:
		'Your aptitude for thorough analysis and deduction. Use Examination to diagnose injuries, determine causes of death, uncover clues, and unravel the workings of traps or mechanical devices. It also grants insights into the abilities and weaknesses of Constructs.',
	Finesse:
		'Your ability to use your hands and feet in careful ways. Use Finesse for activities such as picking locks, disarming traps, piloting vehicles, tinkering, card tricks, stealing or planting items, climbing a mossy wall, or any other task that requires precise, careful movement.',
	Influence:
		'Your persuasiveness, charm, and ability to influence others through charisma or cunning. Use Influence to convince or deceive people, negotiate deals, build trust, win allies to your cause, or put on a captivating performance.',
	Insight:
		'Your ability to understand people and situations beyond the obvious. Use Insight to sense motives, detect lies, read hidden emotions, make sense of clues, and when faced with uncertainty—you can think ahead or just "get" what is happening.',
	Lore: 'Your understanding of the history of civilization, kingdoms, and religions. Use Lore to recall historical events and grasp the significance of cultural practices. It extends to knowledge of the abilities and behavior of Celestials, Dragons, Fey, Fiends, Giants, Humanoids, and Undead.',
	Might: 'Your ability to apply strength effectively. Use Might for lifting heavy objects, breaking through obstacles, climbing, swimming, jumping, or performing feats of strength.',
	Naturecraft:
		'Your expertise in wilderness survival, navigation, tracking, and the handling of animals. Use Naturecraft to thrive in the wild, identify flora, fauna, and track creatures with precision. It encompasses knowledge of Beasts, Monstrosities, and Plants, providing insights into their behavior, habitats, and characteristics.',
	Perception:
		"Your overall ability to notice subtle details in your surroundings. Use Perception to spot hidden objects, detect secret passages, sense subtle environmental changes, and sense when you're being followed or observed.",
	Stealth:
		'Your proficiency in staying unseen and moving quietly. Use Stealth to hide, slip past guards, evade detection, and move without drawing attention.',
};

export type RuleLink = { label: string; anchor: string };
export type RuleGroup = { label: string; links: RuleLink[] };

export const ruleGroups: RuleGroup[] = [
	{
		label: 'Basics',
		links: [
			{ label: 'How to Be a Good Player', anchor: '#how-to-be-a-good-player' },
			{ label: 'Stats', anchor: '#stats' },
			{ label: 'Skills', anchor: '#skills' },
			{ label: 'Skill Checks & Saves', anchor: '#skill-checks--saves' },
			{ label: 'Advantage & Disadvantage', anchor: '#advantage--disadvantage' },
			{ label: 'Size', anchor: '#size' },
		],
	},
	{
		label: 'Character',
		links: [
			{ label: 'The Character Sheet', anchor: '#the-character-sheet' },
			{ label: 'Leveling Up', anchor: '#leveling-up' },
			{ label: 'Hit Points & Dying', anchor: '#hit-points--dying' },
			{ label: 'Wounds', anchor: '#wounds' },
			{ label: 'Temporary HP', anchor: '#temporary-hp' },
			{ label: 'Hit Dice', anchor: '#hit-dice' },
			{ label: 'Speed & Range', anchor: '#speed--range' },
			{ label: 'Common Ancestries', anchor: '#common-ancestries' },
			{ label: 'Exotic Ancestries', anchor: '#exotic-ancestries' },
			{ label: 'Backgrounds', anchor: '#backgrounds' },
			{ label: 'Adventuring Motivation', anchor: '#adventuring-motivation' },
		],
	},
	{
		label: 'Combat',
		links: [
			{ label: 'Starting Combat', anchor: '#starting-combat' },
			{ label: 'Surprise', anchor: '#surprise' },
			{ label: 'Turn Order', anchor: '#turn-order' },
			{ label: 'Turns, Rounds & Encounters', anchor: '#turns-rounds--encounters' },
			{ label: 'Acting Over Multiple Turns', anchor: '#acting-over-multiple-turns' },
			{ label: 'Heroic Actions', anchor: '#heroic-actions' },
			{ label: '— Attack', anchor: '#attack' },
			{ label: '— Cast Spell', anchor: '#cast-spell' },
			{ label: '— Move', anchor: '#move' },
			{ label: '— Assess', anchor: '#assess' },
			{ label: '— Free Actions', anchor: '#free-actions' },
			{ label: 'Heroic Reactions', anchor: '#heroic-reactions' },
			{ label: '— Defend', anchor: '#defend' },
			{ label: '— Interpose', anchor: '#interpose' },
			{ label: '— Opportunity Attack', anchor: '#opportunity-attack' },
			{ label: '— Help', anchor: '#help' },
			{ label: 'Concentration', anchor: '#concentration' },
			{ label: 'Cover & Hiding', anchor: '#cover--hiding' },
			{ label: 'Grappling', anchor: '#grappling' },
			{ label: 'Conditions', anchor: '#conditions' },
			{ label: 'Monsters & Armor', anchor: '#monsters--armor' },
			{ label: 'Minions', anchor: '#minions' },
		],
	},
	{
		label: 'Rest & Downtime',
		links: [
			{ label: 'Field Rests', anchor: '#field-rests' },
			{ label: '— Catch Breath', anchor: '#catch-breath' },
			{ label: '— Make Camp', anchor: '#make-camp' },
			{ label: 'Safe Rest', anchor: '#safe-rest' },
			{ label: 'Downtime', anchor: '#downtime' },
		],
	},
	{
		label: 'Equipment',
		links: [
			{ label: 'Armor', anchor: '#armor' },
			{ label: 'Weapon Properties', anchor: '#weapon-properties' },
			{ label: 'Melee Weapons', anchor: '#melee-weapons' },
			{ label: 'Ranged Weapons', anchor: '#ranged-weapons' },
			{ label: 'Key Equipment', anchor: '#key-equipment' },
			{ label: 'Misc Adventuring Equipment', anchor: '#misc-adventuring-equipment' },
			{ label: 'Magical Items', anchor: '#magical-items' },
			{ label: 'Spell Scrolls & Wands', anchor: '#spell-scrolls--wands' },
		],
	},
	{
		label: 'Magic',
		links: [
			{ label: 'Cast Spell', anchor: '#cast-spell' },
			{ label: 'Upcasting Spells', anchor: '#upcasting-spells' },
			{ label: 'Fire Spells', anchor: '#fire-spells' },
			{ label: 'Ice Spells', anchor: '#ice-spells' },
			{ label: 'Lightning Spells', anchor: '#lightning-spells' },
			{ label: 'Wind Spells', anchor: '#wind-spells' },
			{ label: 'Radiant Spells', anchor: '#radiant-spells' },
			{ label: 'Necrotic Spells', anchor: '#necrotic-spells' },
			{ label: 'Utility Spells', anchor: '#utility-spells' },
		],
	},
];
