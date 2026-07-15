/**
 * SMART Protocol — Illustration Specifications
 *
 * This file is the single source of truth for every illustration used in the
 * SMART Protocol section. It maps each step letter to:
 *   • The image file path (relative to /src/assets/illustrations/)
 *   • A precise alt text for screen readers
 *   • A full creative brief that can be handed directly to an image-generation
 *     model or a professional illustrator to produce the final artwork.
 *
 * HOW TO UPDATE AN ILLUSTRATION
 * ──────────────────────────────
 * 1. Generate / commission the new artwork using the brief below.
 * 2. Export as WebP at 800×680px (4:3.4 ratio) with transparent background
 *    when possible.
 * 3. Drop the file into /src/assets/illustrations/ with the filename listed
 *    in `file`.
 * 4. No code changes required — the StepIllustration component reads this
 *    file automatically.
 */

export const illustrationSpecs = [
  {
    letter: 'S',
    file: 'step-1.webp',
    alt: 'طالب يقرأ ورقة امتحان رياضيات بعناية قبل البدء في الحل',

    brief: {
      subject: 'Student scanning a multi-part mathematics exam paper',
      composition:
        'Male student, slightly left-of-center, 45-degree overhead angle. ' +
        'The exam paper fills the right half, clearly showing multiple numbered parts. ' +
        'A pencil hovers above part III, suggesting the student is about to annotate. ' +
        'Mathematical notation (f(x), lim, integrals) is legible on the paper. ' +
        'A second page is partially visible beneath the first, hinting at breadth.',
      cameraAngle: '45-degree isometric overhead, warm desk lamp from upper-right corner.',
      educationalMessage:
        'Before solving, read the entire exercise. The last question often reveals ' +
        'the smartest approach to the first. Scanning the whole is step one.',
      colors:
        'Warm off-white (#FAFAF8) background. Midnight navy (#0F1F3D) for the student. ' +
        'Electric blue (#0066CC) for mathematical notation on the paper. ' +
        'Warm amber lamp glow. No loud colors. No gradients.',
      visualHierarchy:
        '1. Student face/posture (attention focus). 2. Exam paper with visible parts. ' +
        '3. Pencil pointing at a later section. 4. Ambient desk environment.',
      style:
        'Flat illustration with subtle depth and minimal shadows. ' +
        'IBM Plex Sans Arabic typography on in-illustration text. ' +
        'Premium educational editorial style.',
    },
  },

  {
    letter: 'M',
    file: 'step-2.webp',
    alt: 'عبارة لفظية عربية تتحول إلى معادلة رياضية عبر سهم ترجمة',

    brief: {
      subject:
        'Open notebook showing Arabic natural-language text transforming into mathematical expressions',
      composition:
        'Flat-lay, top-down. Left page: 4–5 lines of Arabic text (لغة طبيعية label at top). ' +
        'A bold right-pointing arrow spans the gutter. ' +
        'Right page: clean typeset equations — √x, f\'(x) > 0, lim_{x→∞}, D = ℝ⁺ — ' +
        'each corresponding to a line on the left. ' +
        'A sharpened pencil rests diagonally across the gutter.',
      cameraAngle: 'Pure flat-lay, top-down (90°). Slight drop shadow under notebook.',
      educationalMessage:
        'Every Arabic phrase describing a mathematical property has an exact ' +
        'mathematical counterpart. Translation is the bridge between problem and solution.',
      colors:
        'Cream notebook paper (#FEFCF3). Dark navy (#0F1F3D) for Arabic text. ' +
        'Electric blue (#0066CC) for mathematical expressions. ' +
        'Pencil in warm wood tone. White background.',
      visualHierarchy:
        '1. Bold translation arrow (central visual anchor). ' +
        '2. Mathematical expressions on the right (destination). ' +
        '3. Arabic text on the left (origin). 4. Pencil (tool).',
      style:
        'Flat editorial illustration. Clean lines. No textures except subtle paper grain.',
    },
  },

  {
    letter: 'A',
    file: 'step-3.webp',
    alt: 'هدف رياضي مع خطوط إحداثيات وسهم يصل إلى البصرة المركزية',

    brief: {
      subject:
        'Precision archery target overlaid with a mathematical coordinate system',
      composition:
        'Target centered in frame. 5 concentric rings in charcoal/white. ' +
        'Bullseye filled solid electric blue, labeled "الهدف" in white Arabic. ' +
        'X and Y coordinate axes extend beyond the target edges as fine blue lines. ' +
        'Tick marks on axes. A single arrow in flight from the left, striking the bullseye. ' +
        'No surrounding environment — pure white background.',
      cameraAngle: 'Perfect front-on (0°), the target fills ~75% of the frame.',
      educationalMessage:
        'Define the exact mathematical objective before beginning any calculation. ' +
        '"What am I trying to find?" is the most powerful question.',
      colors:
        'White (#FFFFFF) background. Charcoal (#2D2D2D) target rings. ' +
        'Electric blue (#0066CC) bullseye, crosshair axes, and arrow. ' +
        'White Arabic text in the bullseye. No gradients.',
      visualHierarchy:
        '1. Arrow (in motion, eye is drawn here first). ' +
        '2. Bullseye / Arabic label. 3. Concentric rings. 4. Axis lines.',
      style: 'Clean, geometric, minimal. Premium data-visualization aesthetic.',
    },
  },

  {
    letter: 'R',
    file: 'step-4.webp',
    alt: 'خريطة ذهنية تربط المعطيات الرياضية بالهدف عبر خطوط مفعّلة',

    brief: {
      subject:
        'Mathematical mind map showing active connections between given data and the goal',
      composition:
        'Isometric view (30° tilt). Central node labeled "المعطى الرئيسي" in large text. ' +
        '5 satellite nodes: f(x), f\'(x), lim_{x→a}, D, الهدف. ' +
        '3 connections are thick solid electric blue (active/relevant). ' +
        '2 connections are thin dashed gray (potential/unused). ' +
        'Nodes are filled dark navy circles with white text. ' +
        'The "الهدف" node is slightly larger and has a blue ring around it.',
      cameraAngle:
        'Slight isometric overhead (25–30°) as if the mind map is printed on a surface.',
      educationalMessage:
        'Not all given data is equally useful. Relate: filter which data points ' +
        'bring you 50% closer to the goal. The best clue looks most like the goal.',
      colors:
        'White (#FAFAFA) surface. Navy (#0F1F3D) filled nodes. ' +
        'Electric blue (#0066CC) active connections and goal ring. ' +
        'Light gray (#E5E5E5) inactive connections. White node labels.',
      visualHierarchy:
        '1. Central "المعطى الرئيسي" node. 2. Active blue connections. ' +
        '3. Goal node with ring. 4. Inactive dashed connections.',
      style:
        'Flat with subtle depth shadow beneath the "paper." ' +
        'Clean analytical style, no decorative elements.',
    },
  },

  {
    letter: 'T',
    file: 'step-5.webp',
    alt: 'قائمة تحقق رياضية على لوح أبيض مع شارة النجاح الذهبية',

    brief: {
      subject:
        'Premium clipboard with a mathematical verification checklist and a gold validation badge',
      composition:
        'Flat-lay with slight 10° tilt. Clipboard center-frame. ' +
        '4 checklist items in Arabic, top-to-bottom: ' +
        '"منطقية النتيجة" ✓ (blue), "جدول التغيرات" ✓ (blue), ' +
        '"الوضعية النسبية" ✓ (blue), "قيمة عددية" ☐ (gray, unchecked). ' +
        'Gold circular badge bottom-right with a large checkmark inside. ' +
        'A scientific calculator top-left. A sharpened pencil diagonal left edge.',
      cameraAngle: 'Near-top-down flat lay with very slight perspective (10–15° tilt).',
      educationalMessage:
        'Testing the result is not optional. Verify logic, sign tables, ' +
        'relative position, and substitute a numeric value before submitting.',
      colors:
        'White clipboard page. Navy (#0F1F3D) text. Electric blue (#0066CC) checkmarks. ' +
        'Light gray (#A3A3A3) for the unchecked item. Gold (#D4A017) badge. ' +
        'Natural wood clipboard board. Light neutral surface.',
      visualHierarchy:
        '1. Gold badge (completion signal). 2. Three blue checkmarks. ' +
        '3. One gray unchecked item (in-progress). 4. Calculator + pencil (context).',
      style:
        'Photorealistic-lite flat lay, with mild drop shadows. ' +
        'Premium stationery aesthetic.',
    },
  },
];
