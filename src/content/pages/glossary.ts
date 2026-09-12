/**
 * The glossary defines DocRack's own vocabulary — the terms §3 "Language rules"
 * requires the site to use — and nothing else.
 *
 * It deliberately does not define audit or regulatory terms in general. Writing
 * a definition of, say, "internal financial control" would be asserting a
 * standard we do not set, which is the same class of unverifiable claim §16
 * rules out. Every entry here describes what the word means *inside DocRack*,
 * which is a thing we can state without a source.
 *
 * Each term links to the page where it does real work, so the page is a way
 * into the site rather than a dead end — §9 forbids routes that exist only to
 * fill a navigation.
 */
export interface GlossaryTerm {
  /** Anchor id. Also used as the DefinedTerm @id fragment. */
  slug: string;
  term: string;
  definition: string;
  href?: string;
  hrefLabel?: string;
}

export const glossaryPage = {
  eyebrow: 'Glossary',
  heading: 'The words this site uses, and what each one means here.',
  sub:
    'Audit software is full of terms that shift meaning between vendors. These are the ones ' +
    'DocRack uses, defined as they behave in the product — not as a general statement about ' +
    'how audit should be done.',
  metaTitle: 'Glossary',
  metaDescription:
    'Audit Test Recipe, population, exception, finding, working paper, insufficient evidence — ' +
    'the terms DocRack uses, defined as they behave in the product.',
  path: '/glossary',
  cta: {
    heading: 'Bring one audit procedure.',
    body: 'We will configure it as a recipe against your own evidence on the call, and you can watch every term above become a real artefact.',
  },
} as const;

export const terms: GlossaryTerm[] = [
  {
    slug: 'audit-test-recipe',
    term: 'Audit Test Recipe',
    definition:
      'A configured, versioned and approved audit procedure: its objective and the risk it addresses, the population it runs against, the inputs it requires, the fields it extracts, the rules and tolerances it applies, and the outcomes it can produce. A prompt returns an answer; a recipe returns a procedure that can be re-performed and gives the same result on the same inputs.',
    href: '/product/audit-test-recipes',
    hrefLabel: 'Audit Test Recipes',
  },
  {
    slug: 'configured-tests',
    term: 'Configured tests',
    definition:
      'The specific checks a recipe performs, decided by a person before the run rather than inferred at run time. Coverage claims on this site are always scoped to configured tests: DocRack can test a complete population for the tests you have configured, which is not the same as testing everything.',
    href: '/product/audit-test-recipes',
    hrefLabel: 'Audit Test Recipes',
  },
  {
    slug: 'population',
    term: 'Population',
    definition:
      'The complete set of records a test runs against — every invoice in the quarter, every loan file in the sample frame, every journal entry above a threshold. The population is defined in the recipe and frozen by the run, so a reviewer can see exactly what was and was not tested.',
    href: '/documents',
    hrefLabel: 'Documents and evidence',
  },
  {
    slug: 'evidence',
    term: 'Evidence',
    definition:
      'A document, export or dataset that supports a conclusion. In DocRack every input is classified by the role it plays — population, evidence, source of truth, supporting source, policy or reference data — because the same file means different things in different tests.',
    href: '/documents',
    hrefLabel: 'Documents and evidence',
  },
  {
    slug: 'source-linked-result',
    term: 'Source-linked result',
    definition:
      'A result that carries the rule that produced it, the values it compared, and a link to the document page or spreadsheet cell each value came from. It is what lets a reviewer check a conclusion without reopening the source file, and what lets a working paper survive inspection months later.',
    href: '/review-and-findings',
    hrefLabel: 'Review and findings',
  },
  {
    slug: 'exception',
    term: 'Exception',
    definition:
      'A record where the test result did not match what the rule expected. An exception is an item for a person to look at, not a conclusion — it becomes a finding only after a reviewer confirms it.',
    href: '/review-and-findings',
    hrefLabel: 'Review and findings',
  },
  {
    slug: 'insufficient-evidence',
    term: 'Insufficient evidence',
    definition:
      'An outcome distinct from a failure, used when the evidence needed to test a control was missing or unreadable. DocRack does not silently convert missing evidence into a failed control: a control that could not be tested is not a control that did not work, and the distinction is carried all the way to the working paper.',
    href: '/review-and-findings',
    hrefLabel: 'Review and findings',
  },
  {
    slug: 'review',
    term: 'Review',
    definition:
      'The step where a person examines exceptions and low-confidence results against their evidence, then confirms, overrides, requests evidence, marks not applicable or escalates. The reviewer, the time and the reason are recorded against the decision.',
    href: '/review-and-findings',
    hrefLabel: 'Review and findings',
  },
  {
    slug: 'human-approval',
    term: 'Human approval',
    definition:
      'The two points where a person, not the system, decides: approving the recipe before it runs, and approving the conclusion after it does. AI extracts values and drafts recipes; deterministic logic compares them; a person owns both ends.',
    href: '/product/audit-test-recipes',
    hrefLabel: 'Audit Test Recipes',
  },
  {
    slug: 'finding',
    term: 'Finding',
    definition:
      'One or more confirmed exceptions grouped into an audit observation, written with its condition, criteria, cause, consequence and recommendation, and tracked with the management response and whether the issue is new, recurring or previously observed.',
    href: '/review-and-findings',
    hrefLabel: 'Review and findings',
  },
  {
    slug: 'working-paper',
    term: 'Working paper',
    definition:
      'The reviewable record of a procedure: scope, population, method, results, exceptions, evidence links and sign-offs, together with the recipe version, the input versions and the execution time. Generated from the run itself rather than reassembled afterwards, which is what makes it re-performable.',
    href: '/working-papers',
    hrefLabel: 'Working papers',
  },
];
