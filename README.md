# Nimblesheets

A character sheet / lightweight encounter manager for [Nimble 2](https://nimblerpg.com/pages/nimble) TTRPG.

Also designed to be used as an [Owlbear Rodeo](https://owlbear.rodeo) extension.

## Roadmap

### Subclass rules support

Subclass selection at level 3+ is implemented. Full mechanical support would require:

- **Data model** — a `NimbleSubclass` type with per-level feature arrays (levels 3, 7, 11, 15), sourced from `docs/Nimble Vault/Heroes/Classes/*/Subclasses/*.md`. Run `npm run import-subclasses` to regenerate the name list from docs; extending it to parse feat content is the next step.

- **Feat parsing** — each subclass feature is a `[[Wikilink]]` to a feat file in the class's `Feats/Subclass Feats/` directory. Those files define the actual mechanical effect (damage bonuses, new actions, extra magic schools, etc.) and would need structured front-matter or a consistent parse format to be machine-readable.

- **Applying features** — once parsed, features would be applied conditionally in the character sheet based on `character.subclass` and `character.level`. Common effect types observed across subclasses:
  - Extra magic school access (e.g. Commander Spellblade gains a school, Stormshifter circles swap schools)
  - New or modified actions/reactions (most martial subclasses)
  - Passive stat or save modifiers
  - Unique resource tracks (e.g. Berserker rage stacks, Stormshifter wild shapes)
  - Triggered effects that replace or augment existing class features

- **Edge cases** — Oathbreaker (Oathsworn subclass) inverts class assumptions and would need special handling. Hexbinder exists in docs but is not yet in `allClasses`; its subclasses are included in `allSubclasses` for when it is added.
